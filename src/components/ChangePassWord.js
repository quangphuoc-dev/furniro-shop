import { Button, Form, Input } from "antd";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actUpdatePasswordById } from "../redux/features/userSlice";

// Component để thay đổi mật khẩu người dùng
const ChangePassWord = () => {
    // Khởi tạo dispatch để gọi các hành động Redux
    const dispatch = useDispatch();
    // Lấy thông tin người dùng từ Redux store
    const { userInfo } = useSelector((state) => state.user);

    // Schema để xác thực dữ liệu nhập vào sử dụng Yup
    const schema = Yup.object().shape({
        newPassword: Yup.string()
            .required("Please input your password") // Trường newPassword là bắt buộc
            .min(6, "Password length should be at least 6 characters") // Độ dài mật khẩu tối thiểu là 6 ký tự
            .max(12, "Password cannot exceed more than 12 characters"), // Độ dài mật khẩu tối đa là 12 ký tự
        confirmPassword: Yup.string()
            .required("Please input confirm password") // Trường confirmPassword là bắt buộc
            .oneOf([Yup.ref("newPassword")], "Password do not match"), // Giá trị của confirmPassword phải trùng khớp với newPassword
    });

    // Sử dụng useForm từ react-hook-form để quản lý trạng thái form
    const methods = useForm({
        defaultValues: {
            currentPassword: "", // Giá trị mặc định cho trường currentPassword
            newPassword: "", // Giá trị mặc định cho trường newPassword
            confirmPassword: "", // Giá trị mặc định cho trường confirmPassword
        },
        resolver: yupResolver(schema), // Sử dụng yupResolver để tích hợp Yup với react-hook-form
    });

    // Destructure các phương thức và trạng thái từ useForm
    const {
        handleSubmit, // Hàm dùng để xử lý sự kiện submit form
        control, // Đối tượng để điều khiển các field của form
        formState: { errors }, // Trạng thái của form, bao gồm các lỗi validation
        reset, // Hàm để đặt lại các giá trị trong form
    } = methods;

    // Hàm xử lý khi form được submit
    const onValid = (formValueChangePassword) => {
        // Kiểm tra mật khẩu hiện tại có đúng không
        if (
            userInfo && // Kiểm tra xem userInfo có tồn tại không
            userInfo.password !== formValueChangePassword.currentPassword // So sánh mật khẩu hiện tại
        ) {
            return alert("Current password is incorrect!"); // Thông báo lỗi nếu mật khẩu hiện tại không đúng
        } else if (userInfo) {
            // Nếu đúng thì dispatch action để cập nhật mật khẩu mới
            const formValuePasswordUpdate = {
                password: formValueChangePassword.newPassword, // Mật khẩu mới
                confirmPassword: formValueChangePassword.confirmPassword, // Xác nhận mật khẩu mới
            };
            dispatch(
                actUpdatePasswordById({
                    id: userInfo.id, // ID người dùng để cập nhật
                    userUpdate: formValuePasswordUpdate, // Dữ liệu mật khẩu mới
                })
            );
        }
        // Reset form sau khi submit thành công hoặc không thành công
        reset("");
    };

    return (
        <div className="change-pass-word-wrapper">
            <div className="change-pass-word-container mx-10 my-10">
                <div className="change-pass-word-container__title flex justify-center my-5">
                    <h3 className="text-[24px] font-[500]">
                        Change your password
                    </h3>
                </div>
                {/* Form nhập liệu để thay đổi mật khẩu */}
                <Form
                    className="change-pass-word-form flex flex-col gap-5"
                    onSubmitCapture={handleSubmit(onValid)}
                >
                    {/* Input để nhập mật khẩu hiện tại */}
                    <div className="change-pass-word-form__current-password flex">
                        <label className="w-[200px]" htmlFor="">
                            Current password
                        </label>
                        <Controller
                            control={control}
                            name="currentPassword"
                            render={({ field }) => {
                                return <Input {...field} />;
                            }}
                        />
                    </div>

                    {/* Input để nhập mật khẩu mới */}
                    <div className="change-pass-word-form__new-password flex">
                        <label className="w-[200px]" htmlFor="">
                            New password
                        </label>
                        <Controller
                            control={control}
                            name="newPassword"
                            render={({ field }) => {
                                return <Input {...field} />;
                            }}
                        />
                        {!!errors.newPassword?.message && (
                            <i style={{ color: "red", padding: "0px 10px" }}>
                                {errors.newPassword?.message}
                            </i>
                        )}
                    </div>

                    {/* Input để xác nhận mật khẩu mới */}
                    <div className="change-pass-word-form__confirm-password flex">
                        <label className="w-[200px]" htmlFor="">
                            Confirm password
                        </label>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field }) => {
                                return <Input {...field} />;
                            }}
                        />
                        {!!errors.confirmPassword?.message && (
                            <i style={{ color: "red", padding: "0px 10px" }}>
                                {errors.confirmPassword?.message}
                            </i>
                        )}
                    </div>

                    {/* Button để lưu thay đổi */}
                    <div className="change-pass-word-form__btn-save flex justify-center">
                        <Button htmlType="submit">Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassWord;
