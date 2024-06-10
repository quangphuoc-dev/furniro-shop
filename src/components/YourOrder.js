// Import các thư viện và module cần thiết
import React, { useEffect, useCallback } from "react"; // Import React để tạo component
import { useDispatch } from "react-redux"; // Import useDispatch để dispatch các action của Redux
import { actDeleteProductInCarts } from "../redux/features/cartSlice"; // Import action để xóa sản phẩm trong giỏ hàng từ Redux slice
import { Select } from "antd/es"; // Import component Select từ Ant Design
import { Controller, useWatch } from "react-hook-form"; // Import Controller từ React Hook Form để quản lý form
import { formatNumber } from "../utils/formatNumber";

// Khai báo component YourOrder nhận props từ parent component
const YourOrder = (props) => {
    // Sử dụng hook useDispatch để lấy hàm dispatch của Redux
    const dispatch = useDispatch();

    // Lấy danh sách sản phẩm trong giỏ hàng từ localStorage
    const cartsList = JSON.parse(localStorage.getItem("key_carts_list"));

    // Giải cấu trúc props nhận từ parent
    const { isCheckoutPage, setValue, control, errors } = props;

    // Hàm tính tổng tiền hóa đơn
    const getTotalMoneyInBill = useCallback(() => {
        if (!cartsList) {
            return 0;
        }
        const totalMoneyInBill = cartsList.reduce((total, cart) => {
            return total + parseFloat(cart.price) * parseFloat(cart.quantity);
        }, 0);

        return totalMoneyInBill;
    }, [cartsList]);

    // Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProductInYourOrder = (id) => {
        // Gửi action actDeleteProductInCarts với id sản phẩm cần xóa
        dispatch(actDeleteProductInCarts(id));
    };

    // useEffect(() => {
    //     // Hàm getTotalMoneyInBill trả về tổng tiền
    //     const totalMoney = getTotalMoneyInBill();
    //     // Gán giá trị của "total" bằng kết quả của getTotalMoneyInBill
    //     setValue("total", totalMoney ?? 0);
    // }, [setValue]); // useEffect sẽ chạy lại khi setValue thay đổi

    // Các hàm và logic khác của component

    // Dùng useWatch của react-hook-form để theo dõi sự thay đổi giá trị của trường "feeShip".
    const feeShip = useWatch({
        control, // Đối tượng control từ react-hook-form, được sử dụng để quản lý trạng thái của form.
        name: "feeShip", // Tên của trường cần theo dõi. Trong trường hợp này, ta đang theo dõi trường "feeShip".
    });

    // Nó nhận hai đối số: một hàm chứa tác vụ phụ, và một mảng phụ thuộc.
    useEffect(() => {
        // Tính tổng tiền của các mặt hàng trong hóa đơn.
        const totalMoney = getTotalMoneyInBill();
        // Tính tổng số tiền bao gồm cả phí vận chuyển.
        // Nếu feeShip là null hoặc undefined, nó sẽ mặc định là 0.
        const totalWithFeeShip = totalMoney + (feeShip || 0);
        // Sử dụng hàm setValue từ react-hook-form để đặt giá trị cho trường "total".
        setValue("total", totalWithFeeShip);
        // Mảng phụ thuộc xác định khi nào hiệu ứng sẽ được thực thi lại.
        // Hiệu ứng này sẽ được thực thi lại mỗi khi feeShip, setValue, hoặc getTotalMoneyInBill thay đổi.
    }, [feeShip, setValue, getTotalMoneyInBill]);

    // Hàm render các sản phẩm trong giỏ hàng
    const renderProductInYourOrder = (cartsList) => {
        if (!cartsList || cartsList.length === 0) {
            return null; // Trả về null nếu cartsList không tồn tại hoặc rỗng
        }
        return cartsList.map((product) => {
            return (
                <div>
                    <div className="flex gap-[200px] justify-between my-5">
                        <div>
                            <p className="text-[20px] text-[#000000] font-500">
                                {product.name}
                            </p>
                            <p className="text-[16px] text-[#9f9f9f] font-[400]">
                                Size: {product.size}
                            </p>
                            <p className="text-[16px] text-[#9f9f9f] font-[400]">
                                Color: {product.color}
                            </p>
                            {!!isCheckoutPage ? (
                                ""
                            ) : (
                                <p
                                    style={{
                                        color: "#b37e6b",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleDeleteProductInYourOrder(
                                            product.id
                                        )
                                    }
                                >
                                    Delete
                                </p>
                            )}
                        </div>
                        <div className="text-[20px] text-[#b88e2f] font-[700]">
                            {formatNumber(product.price * product.quantity)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    // JSX để render giao diện
    return (
        <div className="your-order-container">
            <div className="your-order my-[35px] mx-[74px] flex flex-col gap-5">
                <div
                    className={`${
                        !!isCheckoutPage
                            ? "your-order__order-detail"
                            : "your-order__your-order"
                    }`}
                >
                    {!!isCheckoutPage ? (
                        <h3 className="text-[36px] text-[#000000] font-600">
                            Order details
                        </h3>
                    ) : (
                        <h3 className="text-[36px] text-[#000000] font-600">
                            Your order
                        </h3>
                    )}
                </div>
                <div
                    className={`${
                        !!isCheckoutPage
                            ? "your-order__order-detail-table-grp"
                            : "your-order__your-order-table-grp"
                    }`}
                >
                    <div className="flex gap-60 sm:gap-80 md:gap-80 justify-center">
                        <p className="text-[24px] text-[#000000] font-500">
                            Product
                        </p>
                        <p className="text-[24px] text-[#000000] font-500">
                            Subtotal
                        </p>
                    </div>
                    <div>{renderProductInYourOrder(cartsList)}</div>
                    <div className="flex gap-[200px] justify-center">
                        <p className="text-[20px] text-[#000000] font-[500]">
                            Subtotal
                        </p>
                        <p className="text-[20px] text-[#000000] font-[500]">
                            {formatNumber(getTotalMoneyInBill())}
                        </p>
                    </div>
                    <div>
                        <div>
                            {!isCheckoutPage && (
                                <div>
                                    <div>
                                        <h3>Shipping</h3>
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="feeShip"
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        allowClear
                                                        style={{
                                                            width: 200,
                                                        }}
                                                        options={[
                                                            {
                                                                value: 0,
                                                                label: "Normal Shipping - 0đ",
                                                            },
                                                            {
                                                                value: 30000,
                                                                label: "Fast Shipping - 30.000đ",
                                                            },
                                                        ]}
                                                    />
                                                );
                                            }}
                                        />
                                        {!!errors.feeShip?.message && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    padding: "0px 10px",
                                                }}
                                            >
                                                {errors.feeShip?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {!isCheckoutPage && (
                                <div>
                                    <div>
                                        <h3>Payment</h3>
                                    </div>

                                    <div>
                                        <Controller
                                            control={control}
                                            name="payment"
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        allowClear
                                                        style={{
                                                            width: 200,
                                                        }}
                                                        options={[
                                                            {
                                                                value: "Ship COD",
                                                                label: "Ship COD",
                                                            },
                                                            {
                                                                value: "Direct Bank Transfer",
                                                                label: "Direct Bank Transfer",
                                                            },
                                                        ]}
                                                    />
                                                );
                                            }}
                                        />
                                        {!!errors.payment?.message && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    padding: "0px 10px",
                                                }}
                                            >
                                                {errors.payment?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {!!isCheckoutPage && (
                                <div>
                                    <div>
                                        <h3>Payment method</h3>
                                    </div>
                                    <div>
                                        <h3>Credit card payment</h3>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div>
                                <Controller
                                    control={control}
                                    name="total"
                                    render={({ field }) => {
                                        return (
                                            <div>
                                                <div className="flex justify-center items-center gap-5 my-5">
                                                    <h3 className="text-[24px] text-[#b88e2f] font-[700]">
                                                        Total:
                                                    </h3>
                                                    <h3 className="text-[24px] text-[#b88e2f] font-[700]">
                                                        {formatNumber(
                                                            field.value
                                                        )}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourOrder;
