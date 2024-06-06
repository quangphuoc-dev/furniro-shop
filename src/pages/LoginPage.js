// Import các thành phần cần thiết từ các thư viện
import { Button, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actLogin } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import Logo from "../assets/images/header-logo.png";
import Footer from "../components/Footer";

// Định nghĩa schema validation cho form đăng nhập sử dụng Yup
const loginSchema = Yup.object().shape({
    user: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
    // Khởi tạo dispatch để gọi các hành động Redux
    const dispatch = useDispatch();
    // Khởi tạo navigate để điều hướng giữa các trang
    const navigate = useNavigate();

    // Sử dụng useForm từ react-hook-form để quản lý trạng thái form
    const methods = useForm({
        defaultValues: {
            user: "",
            password: "",
        },
        resolver: yupResolver(loginSchema), // Sử dụng yupResolver để tích hợp Yup với react-hook-form
    });

    // Destructure các phương thức và trạng thái từ useForm
    const {
        control,
        handleSubmit,
        formState: { errors: errorsValidate },
    } = methods;

    // Hàm xử lý khi form hợp lệ
    const onValid = (formValue) => {
        dispatch(actLogin(formValue));
    };

    // Hàm chuyển hướng đến trang đăng ký
    const handleRedirectToRegisterPage = () => {
        navigate(ROUTES.REGISTER_PAGE);
    };

    return (
        <div>
            <div className="flex justify-center items-center h-[100px] px-10">
                <Link to={ROUTES.HOME_PAGE}>
                    <img className="m-auto" src={Logo} />
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mb-10">
                <div className="border-solid border-2 border-[#000000] rounded-[10px] p-5 bg-[#faf3ea]">
                    <div>
                        <span className="text-[36px] text-[#000000] font-[600] text-center block">
                            Đăng nhập
                        </span>
                    </div>
                    {/* Form đăng nhập */}
                    <form onSubmit={handleSubmit(onValid)}>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="user"
                                render={({ field }) => (
                                    <Input
                                        size="large"
                                        type="text"
                                        placeholder="User Name"
                                        {...field}
                                    />
                                )}
                            />
                            {errorsValidate.user && (
                                <span style={{ color: "red" }}>
                                    {errorsValidate.user?.message}
                                </span>
                            )}
                        </div>
                        <div className="block bg-[#ffffff] w-[528px] border-solid border-[#9f9f9f] border-2 rounded-[10px] text-[16px] my-5">
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (
                                    <Input.Password
                                        size="large"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="on"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errorsValidate.password && (
                                <span style={{ color: "red" }}>
                                    {errorsValidate.password?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Button
                                className="bg-[#b88e2f] text-[#ffffff] h-[55px] w-[237px] border-solid border-[#b88e2f] border-2 rounded-[10px] my-3"
                                // onClick={handleSubmit(onValid)} // Chỉnh sửa: sử dụng handleSubmit để xử lý sự kiện onClick
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </div>
                    </form>

                    <div className="flex gap-3 justify-end">
                        <p>Bạn chưa có tài khoản?</p>
                        <span
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={handleRedirectToRegisterPage}
                        >
                            Đăng kí
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

export default LoginPage;
