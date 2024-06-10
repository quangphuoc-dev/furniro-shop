import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Result } from "antd";

const CheckoutPage = () => {
    // Lấy thông tin đơn hàng từ state của Redux store
    const { order } = useSelector((state) => state.order);

    console.log(order, "order");

    // Kiểm tra xem có đơn hàng hay không
    if (!order?.id) {
        // Nếu không có đơn hàng (order.id không tồn tại hoặc là null), điều hướng người dùng về trang chủ

        // Lưu ý: Việc gọi hành động xóa giỏ hàng (clear carts) có thể cần thiết tại đây nếu muốn làm trống giỏ hàng
        // dispatch(actClearCarts()); // Uncomment dòng này nếu cần xóa giỏ hàng tại đây

        // Điều hướng người dùng tới trang chủ
        return <Navigate to={ROUTES.HOME_PAGE} />;
    }

    return (
        <div className="check-out-container">
            <div className="check-out my-5">
                <div>
                    <Result
                        status="success"
                        title="Cảm ơn bạn! Đơn hàng của bạn đã được nhận"
                    />
                </div>
                {/* Thông tin đơn hàng */}
                <div className="check-out__infor-bill flex justify-center gap-10 py-2">
                    <div className="flex flex-col">
                        <span>MÃ ĐƠN HÀNG</span>
                        <span>NGÀY</span>
                        <span>TỔNG CỘNG</span>
                        <span>PHƯƠNG THỨC THANH TOÁN</span>
                    </div>
                    <div className="flex flex-col">
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                    </div>
                    <div className="flex flex-col">
                        <span>{order?.orderNumber}</span>
                        <span>{order?.dateOfBill}</span>
                        <span>{order?.total}</span>
                        <span>{order?.payment}</span>
                    </div>
                </div>
                {/* Thông báo thanh toán */}
                <div className="check-out__payment-link-noti flex justify-center py-2">
                    <p>
                        Nhân viên của Furniro sẽ gửi liên kết thanh toán qua
                        email trong vòng 24 giờ tới. Vui lòng làm theo hướng dẫn
                        để thanh toán.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
