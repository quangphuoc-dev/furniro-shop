import { InputNumber, Modal } from "antd";
import React from "react";
import { formatNumber } from "../utils/formatNumber";

// Component hiển thị modal chi tiết đơn hàng
const CartPurchase = (props) => {
    const { handleOk, handleCancel, isModalOpen, cartsInCheckoutBills } = props;

    // Render danh sách sản phẩm trong modal
    const renderCartsModal = (cartsInCheckoutBills) => {
        return cartsInCheckoutBills.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td className="px-4 py-2">
                        <div className="aspect-w-1 aspect-h-1">
                            <img
                                src={cart.imgURL}
                                alt="img product"
                                className="object-cover"
                            />
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <p className="text-sm font-medium">{cart.name}</p>
                        <p className="text-xs">Size: {cart.size}</p>
                        <p className="text-xs">Color: {cart.color}</p>
                    </td>
                    <td className="px-4 py-2">{formatNumber(cart.price)}</td>
                    <td className="px-4 py-2">
                        <InputNumber
                            className="w-12"
                            value={cart.quantity}
                            readOnly
                        />
                    </td>
                    <td className="px-4 py-2">
                        {formatNumber(cart.price * cart.quantity)}
                    </td>
                </tr>
            );
        });
    };

    return (
        <div>
            {/* Modal hiển thị thông tin chi tiết đơn hàng */}
            <Modal
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="modal-title">
                    <p>Detail Purchase</p>
                </div>
                {/* Bảng hiển thị thông tin sản phẩm trong đơn hàng */}
                <table className="w-full">
                    <thead>
                        <tr className="gap-x-4">
                            <th className="gap-y-2">Img</th>
                            <th className="gap-y-2">Product</th>
                            <th className="gap-y-2">Price</th>
                            <th className="gap-y-2">Quantity</th>
                            <th className="gap-y-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render danh sách sản phẩm */}
                        {renderCartsModal(cartsInCheckoutBills)}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
};

export default CartPurchase;
