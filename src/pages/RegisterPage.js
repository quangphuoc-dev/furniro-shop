// Import các thành phần cần thiết từ các thư viện
import { Button, Input, Radio } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { actCreateNewUser } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import Logo from "../assets/images/header-logo.png";
import Footer from "../components/Footer";

const RegisterPage = () => {
    // Khởi tạo dispatch để gọi các hành động Redux
    const dispatch = useDispatch();
    // Khởi tạo navigate để điều hướng giữa các trang
    const navigate = useNavigate();

    // Biểu thức chính quy để kiểm tra số điện thoại
    const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    // Biểu thức chính quy để kiểm tra định dạng email
    const emailValidation =
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

    // Định nghĩa schema validation sử dụng Yup
    const schema = Yup.object().shape({
        // Yêu cầu tên đầy đủ
        fullName: Yup.string().required("Please input your full name"),
        // Yêu cầu tuổi, phải là số nguyên dương
        age: Yup.number()
            .positive()
            .integer()
            .required("Please input your age"),
        // Yêu cầu giới tính
        gender: Yup.string().required("Please input your gender"),
        // Yêu cầu tên người dùng
        user: Yup.string().required("Please input your user"),
        // Yêu cầu mật khẩu, tối thiểu 6 ký tự và tối đa 12 ký tự
        password: Yup.string()
            .required("Please input your password")
            .min(6, "Password length should be at least 6 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
        // Yêu cầu xác nhận mật khẩu, phải khớp với mật khẩu đã nhập
        confirmPassword: Yup.string()
            .required("Please input confirm password")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        // Yêu cầu địa chỉ
        address: Yup.string().required("Please input your address"),
        // Yêu cầu số điện thoại, kiểm tra theo biểu thức chính quy
        phoneNumber: Yup.string()
            .required("Please input your phone number")
            .matches(phoneValidation, "Invalid phone number"),
        // Yêu cầu email, kiểm tra theo biểu thức chính quy
        email: Yup.string()
            .required("Please input your email")
            .matches(emailValidation, "Invalid email format"),
    });

    // Sử dụng useForm từ react-hook-form để quản lý trạng thái form
    const methods = useForm({
        defaultValues: {
            fullName: "", // Giá trị mặc định cho tên đầy đủ
            age: "", // Giá trị mặc định cho tuổi
            gender: "", // Giá trị mặc định cho giới tính
            user: "", // Giá trị mặc định cho tên người dùng
            password: "", // Giá trị mặc định cho mật khẩu
            confirmPassword: "", // Giá trị mặc định cho xác nhận mật khẩu
            address: "", // Giá trị mặc định cho địa chỉ
            phoneNumber: "", // Giá trị mặc định cho số điện thoại
            email: "", // Giá trị mặc định cho email
        },
        resolver: yupResolver(schema), // Sử dụng yupResolver để tích hợp Yup với react-hook-form
    });

    // Destructure các phương thức và trạng thái từ useForm
    const {
        handleSubmit, // Hàm để xử lý submit form
        control, // Đối tượng để kiểm soát các trường trong form
        formState: { errors }, // Trạng thái của form, bao gồm các lỗi
        reset, // Hàm để reset form về giá trị mặc định
    } = methods;

    // Hàm xử lý khi form hợp lệ
    const onValid = (formValue) => {
        // Dispatch hành động để tạo người dùng mới với giá trị từ form
        dispatch(actCreateNewUser(formValue));
        // Reset form sau khi gửi thành công
        reset();
    };

    // Hàm chuyển hướng đến trang đăng nhập
    const handleRedirectToLoginPage = () => {
        // Sử dụng navigate để điều hướng tới trang đăng nhập
        navigate(ROUTES.LOGIN_PAGE);
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[100px] px-10">
                <Link to={ROUTES.HOME_PAGE}>
                    <img className="m-auto" src={Logo} alt="" />
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <div className="border-solid border-2 border-[#000000] rounded-[10px] p-5 bg-[#faf3ea] mb-5">
                    <div>
                        <span className="text-[36px] text-[#000000] font-[600] text-center block">
                            Đăng ký
                        </span>
                    </div>
                    {/* Form đăng ký */}
                    <form onSubmit={handleSubmit(onValid)}>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="fullName"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="text"
                                        placeholder="Full Name"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.fullName && (
                                <span style={{ color: "red" }}>
                                    {errors.fullName.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="age"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="number"
                                        placeholder="Age"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.age && (
                                <span style={{ color: "red" }}>
                                    {errors.age.message}
                                </span>
                            )}
                        </div>
                        <div className="block w-[528px] my-5">
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <Radio.Group className="flex" {...field}>
                                        <Radio
                                            className="block text-[16px]"
                                            value="male"
                                        >
                                            Male
                                        </Radio>
                                        <Radio
                                            className="block text-[16px]"
                                            value="female"
                                        >
                                            Female
                                        </Radio>
                                    </Radio.Group>
                                )}
                            />
                            {errors.gender && (
                                <span style={{ color: "red" }}>
                                    {errors.gender.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="user"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="text"
                                        placeholder="User"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.user && (
                                <span style={{ color: "red" }}>
                                    {errors.user.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <Input.Password
                                        size="large"
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && (
                                <span style={{ color: "red" }}>
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <Input.Password
                                        size="large"
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <span style={{ color: "red" }}>
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="address"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="text"
                                        placeholder="Address"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.address && (
                                <span style={{ color: "red" }}>
                                    {errors.address.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="text"
                                        placeholder="Phone Number"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.phoneNumber && (
                                <span style={{ color: "red" }}>
                                    {errors.phoneNumber.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="email"
                                        placeholder="Email"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && (
                                <span style={{ color: "red" }}>
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Button
                                className="bg-[#b88e2f] text-[#ffffff] h-[55px] w-[237px] border-solid border-[#b88e2f] border-2 rounded-[10px] my-3"
                                htmlType="submit"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                    <div className="flex gap-3 justify-end">
                        <p>Already have an account?</p>
                        <span
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={handleRedirectToLoginPage}
                        >
                            Login
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default RegisterPage;
