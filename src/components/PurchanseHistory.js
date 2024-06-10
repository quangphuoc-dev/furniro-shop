import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllCheckoutBills } from "../redux/features/checkoutSlice";
import CartPurchase from "../components/CartPurchanse";

// Component hiển thị lịch sử mua hàng của người dùng
const PurchaseHistory = () => {
    // Khởi tạo dispatch để gọi các hành động Redux
    const dispatch = useDispatch();

    // Lấy thông tin các đơn hàng từ Redux store
    const { checkoutBills } = useSelector((state) => state.checkout);

    // State để lưu thông tin giỏ hàng trong đơn hàng khi hiển thị modal
    const [cartsInCheckoutBills, setCartsInCheckoutBills] = useState([]);

    // State để kiểm soát trạng thái mở/đóng của modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lấy thông tin người dùng từ Redux store
    const { userInfo } = useSelector((state) => state.user);

    // Sao chép mảng checkoutBills để tránh thay đổi trực tiếp trên state
    const checkoutBillsClone = [...checkoutBills];

    // Hàm mở modal hiển thị chi tiết đơn hàng khi người dùng nhấn xem chi tiết
    const showModal = (id) => {
        setIsModalOpen(true); // Đặt trạng thái mở modal

        // Tìm index của đơn hàng trong mảng checkoutBills
        const indexThisBills = checkoutBillsClone.findIndex((bill) => {
            return bill.id === id; // So sánh id của đơn hàng với id được truyền vào
        });

        // Lấy thông tin giỏ hàng trong đơn hàng và đặt vào state cartsInCheckoutBills
        setCartsInCheckoutBills(checkoutBills[indexThisBills].carts);
    };

    // Hàm đóng modal khi người dùng nhấn nút OK
    const handleOk = () => {
        setIsModalOpen(false); // Đặt trạng thái đóng modal
    };

    // Hàm đóng modal khi người dùng nhấn nút hủy
    const handleCancel = () => {
        setIsModalOpen(false); // Đặt trạng thái đóng modal
    };

    // useEffect để fetch danh sách đơn hàng khi component được render lần đầu
    useEffect(() => {
        dispatch(actFetchAllCheckoutBills()); // Gọi hành động fetch tất cả các đơn hàng
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Render danh sách đơn hàng
    const renderPurchaseList = (checkoutBills) => {
        return checkoutBills.map((bill) => {
            if (userInfo && userInfo.id === bill.userId) {
                return (
                    <div
                        key={bill.id}
                        className="grid grid-cols-4 gap-4 p-4 border-b"
                    >
                        <div className="purchase-history-table__code-purchase text-center">
                            <p>{bill.orderNumber}</p>
                        </div>
                        <div className="purchase-history-table__date-of-bill text-center">
                            <p>{bill.dateOfBill}</p>
                        </div>
                        <div className="purchase-history-table__subtotal-product text-center">
                            {bill.fullName}
                        </div>
                        <div className="purchase-history-table__bill cursor-pointer text-center text-[#3942df]">
                            <p onClick={() => showModal(bill.id)}>
                                Xem chi tiết đơn hàng
                            </p>
                        </div>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="purchase-history-wrapper">
            <div className="purchase-history">
                <div className="purchase-history-table mx-10 my-10">
                    <div className="flex justify-center my-5">
                        <h3 className="text-2xl font-medium">
                            Purchase History
                        </h3>
                    </div>
                    <div className="purchase-history-table__thead grid grid-cols-4 gap-4 border-b pb-2 mb-2">
                        <div className="purchase-history-table__th1 text-center">
                            Order number
                        </div>
                        <div className="purchase-history-table__th3 text-center">
                            Date
                        </div>
                        <div className="purchase-history-table__th4 text-center">
                            Mr/Ms
                        </div>
                        <div className="purchase-history-table__th2 text-center">
                            Product
                        </div>
                    </div>
                    <div className="purchase-history-table__tbody">
                        {/* Render danh sách đơn hàng */}
                        {renderPurchaseList(checkoutBills)}
                        {/* Hiển thị component CartPurchase để hiển thị thông tin chi tiết đơn hàng */}
                        <CartPurchase
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                            isModalOpen={isModalOpen}
                            cartsInCheckoutBills={cartsInCheckoutBills}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
