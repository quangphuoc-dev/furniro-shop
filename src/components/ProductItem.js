import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Input,
    InputNumber,
    Pagination,
    Rate,
    Row,
    Select,
} from "antd";
import { CarOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
    actFetchAllImgsProducts,
    actFetchAllProducts,
    actFetchProductById,
} from "../redux/features/productSlice";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actAddProductToCarts } from "../redux/features/cartSlice";
import { makeRandomId } from "../utils/makeRandomId";
import {
    actAddComment,
    actFetchAllComments,
    actFetchAllCommentsCalcuStarAverage,
    setNewPage,
} from "../redux/features/commentSlice";
import { actFetchUserById } from "../redux/features/userSlice";
import dayjs from "dayjs";
import { ROUTES } from "../constants/routes";
import { formatNumber } from "../utils/formatNumber";

const schema = Yup.object().shape({
    size: Yup.string().required("Please choose size"),
    color: Yup.string().required("Please choose color"),
});
const schemaBoxReview = Yup.object().shape({
    star: Yup.string().required("Please choose start"),
});

const ProductItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { productInfo } = useSelector((state) => state.product);
    const { imgURL, size, color, name, brands, id } = productInfo;
    const { imgsProducts } = useSelector((state) => state.product);
    const { userInfo } = useSelector((state) => state.user);
    const { fullName, user, phoneNumber, email, avatarURL } = userInfo;
    const { comments } = useSelector((state) => state.comment);
    const { commentsCalcuStarAverage } = useSelector((state) => state.comment);
    const { pagination } = useSelector((state) => state.comment);
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const { products } = useSelector((state) => state.product);

    const [quantityProduct, setQuantityProduct] = useState(1);
    const [isShowBoxReview, setIsShowBoxReview] = useState(false);

    const methods = useForm({
        defaultValues: {
            size: "",
            color: "",
        },
        resolver: yupResolver(schema),
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = methods;

    const {
        handleSubmit: handleSubmitBoxReview,
        control: controlBoxReview,
        formState: { errors: errorsBoxReview },
    } = useForm({
        defaultValues: {
            star: "",
            comment: "",
        },
        resolver: yupResolver(schemaBoxReview),
    });

    const imgsProduct = imgsProducts.find((item) => item.id === productInfo.id);
    const [largeImg, setLargeImg] = useState(imgsProduct?.imgProduct1);
    const handleChangeImg = (imgPath) => {
        setLargeImg(imgPath);
    };

    useEffect(() => {
        setLargeImg(imgsProduct?.imgProduct1);
    }, [imgsProduct]);

    useEffect(() => {
        dispatch(actFetchAllImgsProducts());
        dispatch(actFetchProductById(params.productId));
        dispatch(actFetchUserById(userInfo.id));
        dispatch(
            actFetchAllComments({
                _page: 1,
                _limit: pagination.limitPerPage,
                idProduct: params.productId,
                ...params,
            })
        );
        // dispatch(
        //   actFetchCommentById({
        //     id: params.productId,
        //   })
        // );
        // dispatch(actFetchAllCommentsCalcuStarAverage(params));
        // eslint-disable-next-line
    }, []);

    useEffect(
        () => {
            dispatch(
                actFetchAllProducts({
                    ...params,
                    _sort: "star",
                    _order: "asc",
                    brands: productInfo.brands,
                })
            );
        },
        // eslint-disable-next-line
        /*..*/
        [productInfo.brands]
    );
    // const productsListRelated = products; //viết như này sẽ lỗi, phải clone ra
    const productsClone = [...products];
    const indexThisProduct = productsClone.findIndex((product) => {
        return parseFloat(params.productId) === product.id;
    });
    productsClone.splice(indexThisProduct, 1);
    const relatedProductList = productsClone.slice(0, 4);

    const onValid = (formValueOrder) => {
        dispatch(
            actAddProductToCarts({
                ...productInfo,
                ...formValueOrder,
                quantity: quantityProduct,
                idProduct: productInfo.id,
                // id: makeRandomId(),
            })
        );
    };

    const onValidBoxReview = (formValueBoxReview) => {
        const valueCommentBox = {
            ...formValueBoxReview,
            nameProduct: name,
            idProduct: id,
            brands,
            fullName,
            userName: user,
            phoneNumber,
            email,
            avatarURL,
            dateComment: dayjs(new Date()).format("DD/MM/YYYY"),
        };
        // console.log(productInfo, "productInfo");

        if (isLogin) {
            console.log(valueCommentBox, "valueCommentBox");
            dispatch(actAddComment(valueCommentBox));
        } else {
            alert("You must be logged in to comment! ");
            navigate(ROUTES.LOGIN_PAGE);
        }
        setIsShowBoxReview(!isShowBoxReview);
    };

    // để gọi ra comments đúng với sp đc comments
    // chú ý truyền vô params cái id là id của sp => fil ra
    //   useEffect(() => {
    // dispatch(
    //   actFetchCommentById({
    //     // ...params,
    //     // _page: 1,
    //     // _limit: pagination.limitPerPage,
    //     idProduct: params.productId,
    //   })
    // );
    // dispatch(
    //   actFetchAllCommentsCalcuStarAverage({
    //     ...params,
    //     idProduct: params.productId,
    //   })
    // );
    // eslint-disable-next-line
    //   }, [params.productId]);

    let sumStar = 0;
    let result = 0;

    // Kiểm tra commentsCalcuStarAverage có tồn tại và là một mảng không
    if (
        Array.isArray(commentsCalcuStarAverage) &&
        commentsCalcuStarAverage.length > 0
    ) {
        commentsCalcuStarAverage.forEach((comment) => {
            sumStar += parseFloat(comment?.star);
        });

        // Tính trung bình và làm tròn kết quả
        result = Math.round(sumStar / commentsCalcuStarAverage.length);
    } else {
        // Xử lý trường hợp khi commentsCalcuStarAverage không tồn tại hoặc là một mảng rỗng
        console.log("Không có bình luận hoặc dữ liệu bình luận không hợp lệ.");
    }

    // useEffect(() => {
    //   const productUpdate = {
    //     ...productInfo,
    //     star: result,
    //   };
    //   dispatch(actUpdateProductById({ id: params.productId, productUpdate }));
    //   // eslint-disable-next-line
    // }, [result]);

    const onChangeQuantityProduct = (value) => {
        setQuantityProduct(value);
    };

    const handleToggleBoxReview = () => {
        setIsShowBoxReview(!isShowBoxReview);
    };

    const handleChangePage = (newPage) => {
        dispatch(setNewPage(newPage));
        // dispatch(
        //   actFetchAllComments({
        //     _page: newPage,
        //     _limit: pagination.limitPerPage,
        //     idProduct: params.productId,
        //     ...params,
        //   })
        // );
    };

    // };

    const renderComments = (comments) => {
        console.log(comments);
        return comments.map((comment) => {
            return (
                <div
                    key={comment.id}
                    className="detail-product-card-comment__review--item"
                >
                    <div className="detail-product-card-comment__review--avatar-user">
                        <img
                            className="w-[30px] h-[30px]"
                            src={comment?.avatarURL}
                            alt=""
                        />
                    </div>
                    <div className="detail-product-card-comment__review--grp-right">
                        <div className="detail-product-card-comment__review--user-name">
                            <p>{comment?.fullName}</p>
                        </div>
                        <div className="detail-product-card-comment__review--star">
                            <Rate value={comment?.star} />
                        </div>
                        <div className="detail-product-card-comment__review--comment">
                            <p>{comment?.comment}</p>
                        </div>
                        <div className="detail-product-card-comment__review--date-comment">
                            <p>Ngày: {comment?.dateComment}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderRelatedProductList = (relatedProductList) => {
        return relatedProductList.map((product) => {
            return (
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg m-2 transition-transform transform hover:-translate-y-1 hover:shadow-md"
                >
                    <img
                        className="w-full h-auto max-w-xs mb-3 rounded-lg"
                        src={product.imgURL}
                        alt=""
                    />
                    <div className="text-center mb-2">
                        <p className="text-lg font-bold text-gray-800">
                            {product?.name}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-red-600 text-base">
                            {formatNumber(product?.price)}
                        </p>
                    </div>
                </Col>
            );
        });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-full max-w-sm rounded-lg"
                            src={largeImg || imgURL}
                            alt=""
                        />
                        <div className="flex space-x-2 mt-2">
                            {imgsProduct?.imgProduct1 && (
                                <img
                                    className="w-16 h-16 rounded-lg cursor-pointer"
                                    src={imgsProduct.imgProduct1}
                                    alt=""
                                    onClick={() =>
                                        handleChangeImg(imgsProduct.imgProduct1)
                                    }
                                />
                            )}
                            {imgsProduct?.imgProduct2 && (
                                <img
                                    className="w-16 h-16 rounded-lg cursor-pointer"
                                    src={imgsProduct.imgProduct2}
                                    alt=""
                                    onClick={() =>
                                        handleChangeImg(imgsProduct.imgProduct2)
                                    }
                                />
                            )}
                            {imgsProduct?.imgProduct3 && (
                                <img
                                    className="w-16 h-16 rounded-lg cursor-pointer"
                                    src={imgsProduct.imgProduct3}
                                    alt=""
                                    onClick={() =>
                                        handleChangeImg(imgsProduct.imgProduct3)
                                    }
                                />
                            )}
                            {imgsProduct?.imgProduct4 && (
                                <img
                                    className="w-16 h-16 rounded-lg cursor-pointer"
                                    src={imgsProduct.imgProduct4}
                                    alt=""
                                    onClick={() =>
                                        handleChangeImg(imgsProduct.imgProduct4)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <form
                            onSubmit={handleSubmit(onValid)}
                            className="w-full flex flex-col items-center justify-center space-y-4"
                        >
                            <h3 className="text-2xl font-bold">
                                {productInfo.name}
                            </h3>
                            <h3 className="text-xl text-gray-700">
                                {formatNumber(productInfo.price)}
                            </h3>
                            <div className="w-full">
                                <h5 className="text-lg font-medium">Size:</h5>
                                <Controller
                                    control={control}
                                    name="size"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className="w-full mt-2"
                                            placeholder="Choose a size..."
                                            options={
                                                size
                                                    ? Object.values(size).map(
                                                          (value) => ({
                                                              value: value,
                                                              label: value,
                                                          })
                                                      )
                                                    : []
                                            }
                                        />
                                    )}
                                />
                                {errors.size?.message && (
                                    <i className="text-red-500 px-2">
                                        {errors.size.message}
                                    </i>
                                )}
                            </div>
                            <div className="w-full">
                                <h5 className="text-lg font-medium">Color:</h5>
                                <Controller
                                    control={control}
                                    name="color"
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className="w-full mt-2"
                                            placeholder="Choose a color..."
                                            allowClear
                                            options={[
                                                {
                                                    value: `${color}`,
                                                    label: `${color}`,
                                                },
                                            ]}
                                        />
                                    )}
                                />
                                {errors.color?.message && (
                                    <i className="text-red-500 px-2">
                                        {errors.color.message}
                                    </i>
                                )}
                            </div>
                            <div className="w-full">
                                <h5 className="text-lg font-medium">
                                    Quantity:
                                </h5>
                                <div className="flex items-center space-x-4">
                                    <Controller
                                        control={control}
                                        name="quantity"
                                        render={({ field }) => (
                                            <InputNumber
                                                {...field}
                                                className="w-16"
                                                min={1}
                                                max={99}
                                                defaultValue={1}
                                                value={quantityProduct}
                                                onChange={
                                                    onChangeQuantityProduct
                                                }
                                            />
                                        )}
                                    />
                                    {errors.quantity?.message && (
                                        <p className="text-red-500">
                                            {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                htmlType="submit"
                                className="w-full bg-[#b88e2f] text-white font-[600] h-[40px] text-center rounded-lg mt-4"
                            >
                                ADD TO CART
                            </Button>
                        </form>
                        <div className="w-full flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <CarOutlined className="text-xl" />
                                <p>Free Shipping</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SafetyCertificateOutlined className="text-xl" />
                                <p>Warranty & Return</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                        Reviews product: {productInfo.name}
                    </h3>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <p>Star average:</p>
                            <Rate value={result} />
                            <p>{commentsCalcuStarAverage?.length} reviews</p>
                        </div>
                        <div className="mt-4">
                            <p>Have you used this product yet?</p>
                            <Button
                                onClick={handleToggleBoxReview}
                                className="mt-2"
                            >
                                Send your review
                            </Button>
                        </div>
                    </div>
                    <div
                        className={`mt-4 ${
                            isShowBoxReview ? "block" : "hidden"
                        }`}
                    >
                        <form
                            className="flex flex-col items-center space-y-4"
                            onSubmit={handleSubmitBoxReview(onValidBoxReview)}
                        >
                            <img
                                className="w-16 h-16 rounded-lg"
                                src={largeImg || imgURL}
                                alt=""
                            />
                            <p>{productInfo.name}</p>
                            <div className="w-full">
                                <Controller
                                    control={controlBoxReview}
                                    name="star"
                                    render={({ field }) => (
                                        <Rate
                                            {...field}
                                            className="flex justify-center"
                                        />
                                    )}
                                />
                                {errorsBoxReview.star?.message && (
                                    <p className="text-red-500">
                                        {errorsBoxReview.star.message}
                                    </p>
                                )}
                            </div>
                            <Controller
                                control={controlBoxReview}
                                name="comment"
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                        placeholder="Please enter your review about this product..."
                                        {...field}
                                    />
                                )}
                            />
                            <Button
                                htmlType="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Done
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-bold">Filter reviews by:</h3>
                    <div className="flex space-x-2 mt-2">
                        <div className="cursor-pointer">5 stars</div>
                        <div className="cursor-pointer">4 stars</div>
                        <div className="cursor-pointer">3 stars</div>
                        <div className="cursor-pointer">2 stars</div>
                        <div className="cursor-pointer">1 star</div>
                    </div>
                </div>
                <div className="mt-8">{renderComments(comments)}</div>
                {/* <div className="mt-8 flex justify-center">
          <Pagination
            pageSize={pagination.limitPerPage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          />
        </div> */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 flex justify-center text-[30px]">
                        Related products
                    </h3>
                    <div className="gap-4 flex justify-center">
                        {renderRelatedProductList(relatedProductList)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
