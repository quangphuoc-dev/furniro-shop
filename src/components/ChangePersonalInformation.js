import React, { useEffect } from "react";
import { Button, DatePicker, Input, Radio } from "antd";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    actFetchUserById,
    actUpdateUserById,
} from "../redux/features/userSlice";
import dayjs from "dayjs";

// Component cho phép người dùng thay đổi thông tin cá nhân
const ChangePersonalInformation = () => {
    // Khởi tạo dispatch để gọi các hành động Redux
    const dispatch = useDispatch();
    // Lấy thông tin người dùng từ Redux store
    const { userInfo } = useSelector((state) => state.user);

    // Định nghĩa các biểu thức chính xác sử dụng Yup cho validation
    const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const emailValidation =
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

    // Định nghĩa schema validation sử dụng Yup
    const schema = Yup.object().shape({
        fullName: Yup.string().required("Please input your full name"), // Trường fullName là bắt buộc
        age: Yup.string().required("Please input your age"), // Trường age là bắt buộc
        email: Yup.string()
            .required("Please input your email") // Trường email là bắt buộc
            .matches(emailValidation, "type email was wrong"), // Kiểm tra định dạng email
        phoneNumber: Yup.string()
            .required("Please input your phone number") // Trường phoneNumber là bắt buộc
            .matches(phoneValidation, "type phone number was wrong"), // Kiểm tra định dạng số điện thoại
        gender: Yup.string().required("Please input your gender"), // Trường gender là bắt buộc
        dateOfBirth: Yup.string().required("Please input your date of birth"), // Trường dateOfBirth là bắt buộc
    });

    // Sử dụng useForm từ react-hook-form để quản lý trạng thái form
    const methods = useForm({
        defaultValues: {
            fullName: "", // Giá trị mặc định cho trường fullName
            age: "", // Giá trị mặc định cho trường age
            email: "", // Giá trị mặc định cho trường email
            phoneNumber: "", // Giá trị mặc định cho trường phoneNumber
            gender: "", // Giá trị mặc định cho trường gender
            dateOfBirth: "", // Giá trị mặc định cho trường dateOfBirth
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

    // Hàm xử lý khi form hợp lệ được gửi
    const onValid = (formValue) => {
        dispatch(
            actUpdateUserById({
                id: userInfo.id, // ID người dùng để cập nhật
                userUpdate: formValue, // Dữ liệu người dùng mới
            })
        );
    };

    // Sử dụng useEffect để gọi hành động lấy thông tin người dùng khi component được render
    useEffect(() => {
        dispatch(actFetchUserById(userInfo.id)); // Gọi hành động lấy thông tin người dùng
        reset({ ...userInfo }); // Đặt lại form về giá trị của userInfo
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Mảng phụ thuộc rỗng để useEffect chỉ chạy một lần khi component được mount

    return (
        <div className="change-pass-word-wrapper">
            <div className="change-pass-word-container mx-10 my-10">
                <div className="change-pass-word-container__title flex justify-center my-5">
                    <h3 className="text-[24px] font-[500]">My Profile</h3>
                </div>
                <form
                    className="change-pass-word-form flex flex-col"
                    onSubmit={handleSubmit(onValid)}
                >
                    <div className="change-pass-word-form__name flex">
                        <div className="w-[120px]">Full name</div>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field }) => {
                                return (
                                    <Input
                                        placeholder="Full name..."
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.fullName?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__age flex">
                        <div className="w-[120px]">Age</div>
                        <Controller
                            control={control}
                            name="age"
                            render={({ field }) => {
                                return (
                                    <Input placeholder="Age..." {...field} />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.age?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__address flex">
                        <div className="w-[120px]">Address</div>
                        <Controller
                            control={control}
                            name="address"
                            render={({ field }) => {
                                return (
                                    <Input
                                        placeholder="Address..."
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.address?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__phone-number flex">
                        <div className="w-[120px]">Phone</div>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => {
                                return (
                                    <Input
                                        placeholder="Phone number..."
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.phoneNumber?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__email flex">
                        <div className="w-[120px]">Mail</div>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <Input placeholder="Email..." {...field} />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.email?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__gender-grp flex">
                        <label className="w-[120px] block" htmlFor="">
                            Gender
                        </label>
                        <Controller
                            control={control}
                            name="gender"
                            render={({ field }) => {
                                return (
                                    <Radio.Group {...field}>
                                        <Radio value={"male"}>Male</Radio>
                                        <Radio value={"female"}>Female</Radio>
                                        <Radio value={"other"}>Other</Radio>
                                    </Radio.Group>
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.gender?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__birth-day flex">
                        <label className="w-[120px] bloxk" htmlFor="">
                            Date of birth
                        </label>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field }) => {
                                return (
                                    <DatePicker
                                        {...field}
                                        value={
                                            field.value
                                                ? dayjs(field.value)
                                                : null
                                        }
                                    />
                                );
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span style={{ color: "red" }}>
                            {errors.dateOfBirth?.message}
                        </span>
                    </div>

                    <div className="change-pass-word-form__btn-save flex justify-center">
                        <Button htmlType="submit">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePersonalInformation;
