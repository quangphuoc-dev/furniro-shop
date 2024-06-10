// Import các thư viện và module cần thiết
import React from "react";
import BillingDetails from "../components/BillingDetails"; // Import component chi tiết thanh toán
import YourOrder from "../components/YourOrder"; // Import component thông tin đơn hàng
import { Col, Row } from "antd"; // Import các component lưới từ Ant Design
import * as Yup from "yup"; // Import thư viện Yup để xác thực form
import { Button } from "antd"; // Import component Button từ Ant Design
import { yupResolver } from "@hookform/resolvers/yup"; // Import resolver của Yup cho React Hook Form
// import { useForm } from "react-hook-form"; // Import hook useForm từ React Hook Form
import { actAddOrder, clearOrder } from "../redux/features/orderSlice"; // Import các action từ orderSlice
import dayjs from "dayjs"; // Import thư viện dayjs để làm việc với ngày tháng
import { makeOrderNumber } from "../utils/makeOrderNumber"; // Import hàm tạo số đơn hàng
import { useDispatch, useSelector } from "react-redux"; // Import các hook của Redux
import { useNavigate } from "react-router-dom"; // Import hook điều hướng của React Router
import { ROUTES } from "../constants/routes"; // Import các hằng số định tuyến
import { actAddBill } from "../redux/features/checkoutSlice"; // Import action từ checkoutSlice
import { actClearCarts } from "../redux/features/cartSlice";
import { useForm, FormProvider } from "react-hook-form";
import QualityDefault from "../components/QualityDefault";
import BannerShop from "../assets/images/banner-shop.png";
import { RightOutlined } from "@ant-design/icons";

// Định nghĩa các biểu thức kiểm tra hợp lệ cho số điện thoại và email
// const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
// const emailValidation =
//     /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

const phoneValidation = /^(84|0[3|5|7|8|9])([0-9]{8})$/;
const emailValidation =
    /^[a-z][a-z0-9_.]{5,31}@[a-z0-9]{2,}(\.[a-z]{2,4}){1,2}$/;

// Định nghĩa schema của form bằng Yup
const schema = Yup.object().shape({
    fullName: Yup.string().required("Please input your full name"),
    streetAddress: Yup.string().required("Please input street address"),
    ward: Yup.string().required("Please input ward"),
    district: Yup.string().required("Please input district"),
    townOrCity: Yup.string().required("Please input town or city"),
    phoneNumber: Yup.string()
        .required("Please input your phone number")
        .matches(phoneValidation, "type phone number was wrong"),
    email: Yup.string()
        .required("Please input your email")
        .matches(emailValidation, "type email was wrong"),
    feeShip: Yup.string().required("Please choose method shipping"),
    payment: Yup.string().required("Please choose method shipping"),
});

// Component chính OrderPage
const OrderPage = () => {
    const dispatch = useDispatch(); // Sử dụng hook useDispatch để lấy hàm dispatch của Redux
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng
    const { userInfo } = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
    const { carts } = useSelector((state) => state.cart); // Lấy thông tin giỏ hàng từ Redux store

    // Khởi tạo form với các giá trị mặc định và schema xác thực
    const methods = useForm({
        defaultValues: {
            fullName: "",
            country: "",
            streetAddress: "",
            ward: "",
            district: "",
            townOrCity: "",
            phoneNumber: "",
            email: "",
            orderNotes: "",
            feeShip: "",
            payment: "",
        },
        resolver: yupResolver(schema), // Sử dụng Yup để xác thực form
    });

    // Giải cấu trúc các phương thức và trạng thái của form
    const {
        handleSubmit, // Hàm để xử lý khi form được submit
        control, // Điều khiển các input của form
        formState: { errors }, // Trạng thái lỗi của form
        reset, // Hàm để reset form
    } = methods;

    // Hàm xử lý khi form hợp lệ
    const onValid = (formValue) => {
        console.log(formValue, "form value billing details order page");

        // Tạo dữ liệu đơn hàng từ giá trị form và thông tin thêm
        const orderData = {
            ...formValue,
            userId: userInfo.id, // Thêm ID người dùng vào dữ liệu đơn hàng
            carts: carts, // Thêm giỏ hàng vào dữ liệu đơn hàng
            dateOfBill: dayjs(new Date()).format("DD/MM/YYYY"), // Định dạng ngày tạo đơn hàng
            createAt: new Date().getTime(), // Thêm thời gian tạo đơn hàng
            orderNumber: makeOrderNumber(), // Tạo số đơn hàng
        };

        console.log(orderData, "orderData");

        // Gửi các action để thêm đơn hàng và hóa đơn
        dispatch(actAddOrder(orderData)); // Dispatch action để thêm đơn hàng
        dispatch(actAddBill(orderData)); // Dispatch action để thêm hóa đơn
        dispatch(clearOrder()); // Dispatch action để xóa đơn hàng
        dispatch(actClearCarts()); // Dispatch action để xóa giỏ hàng
        navigate(ROUTES.CHECK_OUT_PAGE); // Điều hướng tới trang checkout
    };

    // JSX để render giao diện
    return (
        <div>
            <div
                style={{ backgroundImage: `url(${BannerShop})` }}
                className="banner-shop w-full h-[316px] bg-cover bg-bottom flex"
            >
                <div className="text-center m-auto">
                    <span className="text-[48px] text-[#000000] font-[500] ">
                        Products
                    </span>
                    <p className="text-[16px] text-[#000000] font-[500]">
                        Home
                        <span>
                            <RightOutlined />
                        </span>
                        Order
                    </p>
                </div>
            </div>
            <form
                className="order-page-container"
                onSubmit={handleSubmit(onValid)}
            >
                <Row className="order-page">
                    <Col
                        className="order-page__billing-details"
                        xs={24}
                        sm={24}
                        md={12}
                        lg={14}
                    >
                        {/* Component chi tiết thanh toán */}
                        <BillingDetails
                            control={control}
                            errors={errors}
                            reset={reset}
                        />
                    </Col>
                    <Col
                        className="order-page__your-order"
                        xs={24}
                        sm={24}
                        md={12}
                        lg={10}
                    >
                        {/* Component thông tin đơn hàng */}
                        <FormProvider {...methods}>
                            <YourOrder
                                control={control}
                                setValue={methods.setValue}
                                errors={errors}
                            />
                        </FormProvider>
                        {/* <YourOrder control={control} errors={errors} /> */}
                        <div className="billing-detail__submit-btn flex justify-center mb-12">
                            {/* Nút đặt hàng */}
                            <Button htmlType="submit">Place order</Button>
                        </div>
                    </Col>
                </Row>
            </form>
            <QualityDefault />
        </div>
    );
};

export default OrderPage;
