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
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);

    // Định nghĩa các biểu thức chính xác sử dụng Yup
    const phoneValidation = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const emailValidation =
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
    const schema = Yup.object().shape({
        fullName: Yup.string().required("Please input your full name"),
        age: Yup.string().required("Please input your age"),
        email: Yup.string()
            .required("Please input your email")
            .matches(emailValidation, "type email was wrong"),
        phoneNumber: Yup.string()
            .required("Please input your phone number")
            .matches(phoneValidation, "type phone number was wrong"),
        gender: Yup.string().required("Please input your gender"),
        dateOfBirth: Yup.string().required("Please input your date of birth"),
    });

    const methods = useForm({
        defaultValues: {
            fullName: "",
            age: "",
            email: "",
            phoneNumber: "",
            gender: "",
            dateOfBirth: "",
        },
        resolver: yupResolver(schema),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = methods;

    // Xử lý khi form hợp lệ được gửi
    const onValid = (formValue) => {
        dispatch(
            actUpdateUserById({
                id: userInfo.id,
                userUpdate: formValue,
            })
        );
    };

    useEffect(() => {
        dispatch(actFetchUserById(userInfo.id));
        reset({ ...userInfo }); // Đặt lại form về giá trị của userInfo
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
