import React, { useEffect, useState } from "react";
import { Button, Col, InputNumber, Rate, Select } from "antd";
import {
    CarOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from "@ant-design/icons";
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
import {
    actAddComment,
    actFetchAllComments,
    // setNewPage,
} from "../redux/features/commentSlice";
import { actFetchUserById } from "../redux/features/userSlice";
import dayjs from "dayjs";
import { ROUTES } from "../constants/routes";
import { formatNumber } from "../utils/formatNumber";

const schema = Yup.object().shape({
    size: Yup.string().required("Please choose size"), // Kiểm tra trường size, yêu cầu phải có
    color: Yup.string().required("Please choose color"), // Kiểm tra trường color, yêu cầu phải có
});

const schemaBoxReview = Yup.object().shape({
    star: Yup.string().required("Please choose start"), // Kiểm tra trường star, yêu cầu phải có
});

const ProductItem = () => {
    // Khởi tạo các hooks cần thiết
    const dispatch = useDispatch(); // Hook để dispatch các action tới store Redux
    const navigate = useNavigate(); // Hook để điều hướng (navigation) giữa các route
    const params = useParams(); // Hook để lấy các tham số từ URL (vd: productId)

    // Lấy thông tin sản phẩm từ state Redux
    const { productInfo } = useSelector((state) => state.product);
    const { imgURL, size, color, name, brands, id } = productInfo; // Trích xuất các thuộc tính từ productInfo

    // Lấy thông tin ảnh sản phẩm từ state Redux
    const { imgsProducts } = useSelector((state) => state.product);

    // Lấy thông tin người dùng từ state Redux
    const { userInfo } = useSelector((state) => state.user);
    const { fullName, user, phoneNumber, email, avatarURL } = userInfo; // Trích xuất các thuộc tính từ userInfo

    // Lấy các bình luận từ state Redux
    const { comments } = useSelector((state) => state.comment);
    const { commentsCalcuStarAverage } = useSelector((state) => state.comment); // Lấy thông tin đánh giá sao từ state
    const { pagination } = useSelector((state) => state.comment); // Lấy thông tin phân trang từ state

    // Kiểm tra trạng thái đăng nhập từ localStorage
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));

    // Lấy danh sách sản phẩm từ state Redux
    const { products } = useSelector((state) => state.product);

    // Khởi tạo state để quản lý số lượng sản phẩm và hiển thị box review
    const [quantityProduct, setQuantityProduct] = useState(1); // State để quản lý số lượng sản phẩm
    const [isShowBoxReview, setIsShowBoxReview] = useState(false); // State để quản lý hiển thị box review

    // Khởi tạo form với react-hook-form và yupResolver để kiểm tra dữ liệu nhập vào
    const methods = useForm({
        defaultValues: {
            size: "", // Giá trị mặc định cho size
            color: "", // Giá trị mặc định cho color
        },
        resolver: yupResolver(schema), // Sử dụng yupResolver với schema đã định nghĩa
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = methods; // Trích xuất các phương thức từ react-hook-form

    const {
        handleSubmit: handleSubmitBoxReview,
        control: controlBoxReview,
        formState: { errors: errorsBoxReview },
    } = useForm({
        defaultValues: {
            star: "", // Giá trị mặc định cho star
            comment: "", // Giá trị mặc định cho comment
        },
        resolver: yupResolver(schemaBoxReview), // Sử dụng yupResolver với schemaBoxReview
    });

    // Tìm ảnh sản phẩm phù hợp từ danh sách imgsProducts
    const imgsProduct = imgsProducts.find((item) => item.id === productInfo.id);
    const [largeImg, setLargeImg] = useState(imgsProduct?.imgProduct1); // Khởi tạo state để quản lý ảnh lớn

    // Hàm thay đổi ảnh lớn khi người dùng chọn ảnh khác
    const handleChangeImg = (imgPath) => {
        setLargeImg(imgPath); // Cập nhật ảnh lớn
    };

    // useEffect để cập nhật ảnh lớn khi imgsProduct thay đổi
    useEffect(() => {
        setLargeImg(imgsProduct?.imgProduct1); // Cập nhật ảnh lớn khi imgsProduct thay đổi
    }, [imgsProduct]);

    // useEffect để lấy dữ liệu khi component mount
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn trang lên đầu
        dispatch(actFetchAllImgsProducts()); // Dispatch action để lấy tất cả ảnh sản phẩm
        dispatch(actFetchProductById(params.productId)); // Dispatch action để lấy thông tin sản phẩm theo id
        dispatch(actFetchUserById(userInfo.id)); // Dispatch action để lấy thông tin người dùng theo id
        dispatch(
            actFetchAllComments({
                _page: 1,
                _limit: pagination.limitPerPage,
                idProduct: params.productId,
                ...params,
            })
        ); // Dispatch action để lấy tất cả bình luận cho sản phẩm hiện tại
    }, [navigate, dispatch, pagination.limitPerPage, params, userInfo.id]);

    // useEffect để lấy danh sách sản phẩm theo thương hiệu khi productInfo.brands thay đổi
    useEffect(() => {
        dispatch(
            actFetchAllProducts({
                ...params,
                _sort: "star", // Sắp xếp theo sao
                _order: "asc", // Thứ tự tăng dần
                brands: productInfo.brands, // Theo thương hiệu của sản phẩm hiện tại
            })
        );
    }, [params, dispatch, productInfo.brands]);

    // const productsListRelated = products; //viết như này sẽ lỗi, phải clone ra
    // Clone mảng products để tránh thay đổi trực tiếp
    const productsClone = [...products];
    const indexThisProduct = productsClone.findIndex((product) => {
        return parseFloat(params.productId) === product.id;
    });
    productsClone.splice(indexThisProduct, 1); // Loại bỏ sản phẩm hiện tại khỏi mảng clone

    // Hàm shuffle mảng để đổi chỗ các phần tử trong mảng
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ các phần tử
        }
        return array;
    };

    // Lấy ngẫu nhiên 4 sản phẩm từ mảng productsClone
    const getRandomProducts = (productsClone, count) => {
        const shuffledProducts = shuffleArray([...productsClone]); // Shuffle mảng clone
        return shuffledProducts.slice(0, count); // Lấy 4 sản phẩm ngẫu nhiên
    };

    // Sử dụng hàm để lấy ngẫu nhiên 4 sản phẩm
    const relatedProductList = getRandomProducts(productsClone, 4);

    // Hàm xử lý khi người dùng click vào sản phẩm
    const handleProductClick = (productId) => {
        console.log("Clicked on product with ID:", productId);
        navigate(`${ROUTES.PRODUCT_PAGE}/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    // Hàm xử lý khi form order hợp lệ
    const onValid = (formValueOrder) => {
        dispatch(
            actAddProductToCarts({
                ...productInfo, //Lấy lại thông tin sản phẩm đó
                ...formValueOrder, // Thêm thônng tin từ form order: size và color
                quantity: quantityProduct, // Thêm số lượng sản phẩm
                idProduct: productInfo.id,
            })
        );
    };

    // Hàm xử lý khi form review hợp lệ
    const onValidBoxReview = (formValueBoxReview) => {
        const valueCommentBox = {
            ...formValueBoxReview,
            nameProduct: name, // Thêm tên sản phẩm
            idProduct: id, // Thêm id sản phẩm
            brands, // Thêm thương hiệu sản phẩm
            fullName, // Thêm tên đầy đủ của người dùng
            userName: user, // Thêm tên người dùng
            phoneNumber, // Thêm số điện thoại người dùng
            email, // Thêm email người dùng
            avatarURL, // Thêm URL avatar của người dùng
            dateComment: dayjs(new Date()).format("DD/MM/YYYY"), // Thêm ngày bình luận
        };

        // Kiểm tra trạng thái đăng nhập
        if (isLogin) {
            // console.log(valueCommentBox, "valueCommentBox");
            dispatch(actAddComment(valueCommentBox)); // Dispatch action để thêm bình luận
        } else {
            alert("You must be logged in to comment! "); // Hiển thị thông báo yêu cầu đăng nhập
            navigate(ROUTES.LOGIN_PAGE); // Điều hướng đến trang đăng nhập
        }
        setIsShowBoxReview(!isShowBoxReview); // Đóng box review sau khi gửi bình luận
    };

    let sumStar = 0;
    let result = 0;

    // Kiểm tra commentsCalcuStarAverage có tồn tại và là một mảng không
    if (
        Array.isArray(commentsCalcuStarAverage) &&
        commentsCalcuStarAverage.length > 0
    ) {
        commentsCalcuStarAverage.forEach((comment) => {
            sumStar += parseFloat(comment?.star); // Cộng dồn các sao từ từng bình luận
        });

        // Tính trung bình và làm tròn kết quả
        result = Math.round(sumStar / commentsCalcuStarAverage.length);
    } else {
        // Xử lý trường hợp khi commentsCalcuStarAverage không tồn tại hoặc là một mảng rỗng
        console.log("Không có bình luận hoặc dữ liệu bình luận không hợp lệ.");
    }

    // Hàm thay đổi số lượng sản phẩm
    const onChangeQuantityProduct = (value) => {
        setQuantityProduct(value); // Cập nhật số lượng sản phẩm
    };

    // Hàm đóng/mở box review
    const handleToggleBoxReview = () => {
        setIsShowBoxReview(!isShowBoxReview); // Đổi trạng thái hiển thị box review
    };

    // const handleChangePage = (newPage) => {
    //     dispatch(setNewPage(newPage));
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
                        {comment?.avatarURL ? (
                            <img
                                className="w-[30px] h-[30px]"
                                src={comment.avatarURL}
                                alt="avatar"
                            />
                        ) : (
                            <UserOutlined className="w-[30px] h-[30px]" />
                        )}
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
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg m-2 transition-transform transform hover:-translate-y-1 hover:shadow-md"
                    onClick={() => {
                        handleProductClick(product.id);
                    }}
                    key={product.id}
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

                <div className="mt-8 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 flex justify-center text-[30px]">
                        Related products
                    </h3>
                    <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {renderRelatedProductList(relatedProductList)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
