// Import các thư viện và module cần thiết
import { Input } from "antd"; // Import component Input từ Ant Design
import React, { useEffect, useState } from "react"; // Import các hook React
import { Controller } from "react-hook-form"; // Import component Controller từ React Hook Form
import { useDispatch, useSelector } from "react-redux"; // Import các hook của Redux
import { actFetchUserById } from "../redux/features/userSlice"; // Import action để fetch user từ Redux

// Component BillingDetails nhận props từ parent component
const BillingDetails = (props) => {
    const dispatch = useDispatch(); // Sử dụng hook useDispatch để lấy hàm dispatch của Redux
    const [isToggle, setIsToggle] = useState(false); // Khai báo state để quản lý việc hiển thị form địa chỉ khác
    const { userInfo } = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
    const { control, errors, reset } = props; // Giải cấu trúc props nhận từ parent

    // useEffect để fetch thông tin user khi component được mount
    useEffect(() => {
        dispatch(actFetchUserById(userInfo.id)); // Dispatch action để fetch thông tin user
        const userInfoClone = { ...userInfo }; // Tạo một bản sao của userInfo
        delete userInfoClone.id; // Xóa trường id khỏi userInfoClone
        reset({ ...userInfoClone }); // Reset form với thông tin user
        // eslint-disable-next-line
    }, []);

    // Hàm xử lý khi người dùng toggle form địa chỉ khác
    const handleToggleDifferentAddress = () => {
        setIsToggle(!isToggle); // Thay đổi trạng thái của isToggle
    };

    // JSX để render giao diện
    return (
        <div className="billing-detail-container">
            <div className="billing-detail">
                <div className="flex flex-col gap-5 my-[35px] mx-[74px]">
                    <div className="billing-detail__title">
                        <h3 className="text-[36px] text-[#000000] font-600">
                            Billing Details
                        </h3>{" "}
                        {/* Tiêu đề của phần chi tiết thanh toán */}
                    </div>
                    <div className="billing-detail__form-grp flex flex-col gap-3">
                        <div className="billing-detail__form-grp--full-name">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Full name:
                            </label>{" "}
                            {/* Nhãn cho trường tên đầy đủ */}
                            <Controller
                                control={control}
                                name="fullName"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho tên đầy đủ
                                }}
                            />
                            {!!errors.fullName?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.fullName?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                        <div className="billing-detail__form-grp--country">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Country / Region:
                            </label>{" "}
                            {/* Nhãn cho trường quốc gia */}
                            <Controller
                                control={control}
                                name="country"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return (
                                        <Input
                                            defaultValue={"Vietnam"}
                                            disabled
                                        />
                                    ); // Input cho quốc gia, mặc định là Vietnam
                                }}
                            />
                        </div>
                        <div className="billing-detail__form-grp--town-city">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Town / City:
                            </label>{" "}
                            {/* Nhãn cho trường thành phố */}
                            <Controller
                                control={control}
                                name="townOrCity"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho thành phố
                                }}
                            />
                            {!!errors.townOrCity?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.townOrCity?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                        <div className="billing-detail__form-grp--district">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                District:
                            </label>{" "}
                            {/* Nhãn cho trường quận */}
                            <Controller
                                control={control}
                                name="district"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho quận
                                }}
                            />
                            {!!errors.district?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.district?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                        <div className="billing-detail__form-grp--ward">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Ward:
                            </label>{" "}
                            {/* Nhãn cho trường phường */}
                            <Controller
                                control={control}
                                name="ward"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho phường
                                }}
                            />
                            {!!errors.ward?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.ward?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>

                        <div className="billing-detail__form-grp--street-address">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Street address:
                            </label>{" "}
                            {/* Nhãn cho trường địa chỉ đường */}
                            <Controller
                                control={control}
                                name="streetAddress"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho địa chỉ đường
                                }}
                            />
                            {!!errors.streetAddress?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.streetAddress?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                        <div className="billing-detail__form-grp--phone">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Phone:
                            </label>{" "}
                            {/* Nhãn cho trường số điện thoại */}
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho số điện thoại
                                }}
                            />
                            {!!errors.phoneNumber?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.phoneNumber?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                        <div className="billing-detail__form-grp--email-address">
                            <label className="text-[16px] text-[#000000] font-500 my-[12px]">
                                Email address:
                            </label>{" "}
                            {/* Nhãn cho trường địa chỉ email */}
                            <Controller
                                control={control}
                                name="email"
                                className="border-[1px] border-solid border-[#9f9f9f] rounded-[10px] w-[453px] h-[45px]"
                                render={({ field }) => {
                                    return <Input {...field} />; // Input cho email
                                }}
                            />
                            {!!errors.email?.message && (
                                <i
                                    style={{
                                        color: "red",
                                        padding: "0px 10px",
                                    }}
                                >
                                    {errors.email?.message}{" "}
                                    {/* Hiển thị lỗi nếu có */}
                                </i>
                            )}
                        </div>
                    </div>

                    <div className="billing-detail__form-grp--ship-to-different-address">
                        <input
                            type="checkbox"
                            name="different-address"
                            onClick={handleToggleDifferentAddress} // Hàm xử lý khi checkbox được chọn
                        />
                        <label
                            className="text-[16px] text-[#000000] font-500 my-[12px]"
                            htmlFor="different-address"
                        >
                            {" "}
                            Ship to a different address?{" "}
                            {/* Nhãn cho checkbox */}
                        </label>
                    </div>

                    <div className="billing-detail__order-notes">
                        <label>Order Notes (optional): </label>{" "}
                        {/* Nhãn cho trường ghi chú đơn hàng */}
                        <Controller
                            control={control}
                            name="orderNotes"
                            render={({ field }) => {
                                return (
                                    <Input
                                        placeholder="Note: Special ring size, Stone color, Delivery time,... "
                                        {...field} // Input cho ghi chú đơn hàng
                                    />
                                );
                            }}
                        />
                        {!!errors.orderNotes?.message && (
                            <i style={{ color: "red", padding: "0px 10px" }}>
                                {errors.orderNotes?.message}{" "}
                                {/* Hiển thị lỗi nếu có */}
                            </i>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingDetails;
