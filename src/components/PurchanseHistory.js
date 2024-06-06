import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllCheckoutBills } from "../redux/features/checkoutSlice";
import CartPurchase from "../components/CartPurchanse";

// Component hiển thị lịch sử mua hàng của người dùng
const PurchaseHistory = () => {
    const dispatch = useDispatch();
    const { checkoutBills } = useSelector((state) => state.checkout);
    const [cartsInCheckoutBills, setCartsInCheckoutBills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.user);

    // Sao chép mảng checkoutBills để tránh thay đổi trực tiếp trên state
    const checkoutBillsClone = [...checkoutBills];

    // Mở modal hiển thị chi tiết đơn hàng khi người dùng nhấn xem chi tiết
    const showModal = (id) => {
        setIsModalOpen(true);

        // Tìm index của đơn hàng trong mảng checkoutBills
        const indexThisBills = checkoutBillsClone.findIndex((bill) => {
            return bill.id === id;
        });
        // Lấy thông tin giỏ hàng trong đơn hàng và set state
        setCartsInCheckoutBills(checkoutBills[indexThisBills].carts);
    };

    // Đóng modal
    const handleOk = () => {
        setIsModalOpen(false);
    };

    // Đóng modal khi click nút hủy
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Khi component được render, fetch danh sách đơn hàng
    useEffect(() => {
        dispatch(actFetchAllCheckoutBills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Render danh sách đơn hàng
    const renderPurchaseList = (checkoutBills) => {
        return checkoutBills.map((bill) => {
            if (userInfo && userInfo.id === bill.userId) {
                return (
                    <div>
                        <div className="flex justify-center place-items-center gap-[150px]">
                            <div className="purchase-history-table__code-purchase ">
                                <p>{bill.orderNumber}</p>
                            </div>
                            <div className="purchase-history-table__date-of-bill ">
                                <p>{bill.dateOfBill}</p>
                            </div>
                            <div className="purchase-history-table__subtotal-product ">
                                {bill.fullName}
                            </div>
                            <div className="purchase-history-table__bill cursor-pointer">
                                <p onClick={() => showModal(bill.id)}>
                                    Xem chi tiết đơn hàng
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className="purchase-history-wrapper">
            <div className="purchase-history">
                <div className="purchase-history-table">
                    <div className="purchase-history-table__table-grp">
                        <div className="purchase-history-table__shop-table mx-10 my-10">
                            <div className="flex justify-center my-5">
                                <h3 className="text-[24px] font-[500]">Purchanse History</h3>
                                
                            </div>
                            <div className="purchase-history-table__thead">
                                <div className="purchase-history-table__thead-tr flex justify-center gap-[150px]">
                                    <div className="purchase-history-table__th1">
                                        Order number
                                    </div>
                                    <div className="purchase-history-table__th3">
                                        Date
                                    </div>
                                    <div className="purchase-history-table__th4">
                                        Mr/Ms
                                    </div>
                                    <div className="purchase-history-table__th2">
                                        Product
                                    </div>
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
            </div>
        </div>
    );
};

export default PurchaseHistory;
