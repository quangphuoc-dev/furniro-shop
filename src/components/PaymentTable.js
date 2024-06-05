// Import các thư viện và module cần thiết
import { Input, InputNumber } from "antd"; // Thư viện Ant Design để tạo các thành phần giao diện
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons"; // Icon đóng từ thư viện Ant Design
import { useDispatch, useSelector } from "react-redux"; // Hook để sử dụng Redux trong React
import React from "react"; // Thư viện React
import { formatNumber } from "../utils/formatNumber";
import {
    actClearCarts,
    actDeleteProductInCarts,
    actUpdateQuantityOfProduct,
} from "../redux/features/cartSlice"; // Các action từ Redux slice cho giỏ hàng

const PaymentTable = () => {
    // Sử dụng hook useDispatch để gửi các action tới Redux store
    const dispatch = useDispatch();
    // Lấy trạng thái giỏ hàng từ Redux store
    const { carts } = useSelector((state) => state.cart);

    // Hàm định dạng số theo dạng có dấu chấm ngăn cách hàng nghìn

    // Hàm xử lý khi thay đổi số lượng sản phẩm
    const onChangeQuantity = (id, quantity) => {
        // Gửi action cập nhật số lượng sản phẩm tới Redux store
        dispatch(actUpdateQuantityOfProduct({ id: id, quantity: quantity }));
    };

    // Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProductInCarts = (productId) => {
        // Gửi action xóa sản phẩm khỏi giỏ hàng tới Redux store
        dispatch(actDeleteProductInCarts(productId));
    };

    // Hàm xử lý khi xóa toàn bộ giỏ hàng
    const handleClearCarts = () => {
        // Gửi action xóa toàn bộ giỏ hàng tới Redux store
        dispatch(actClearCarts());
    };

    // Hàm render danh sách các sản phẩm trong giỏ hàng
    const renderCartsList = (carts) => {
        return carts.map((cart) => {
            return (
                <div className="flex justify-center items-center gap-6 my-3">
                    <div>
                        <img
                            src={cart.imgURL}
                            className="w-[80px] h-[80px] rounded-[10px]"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col">
                        <span>{`${cart.name} - Size: ${cart.size}`}</span>
                        <span>{`Color: ${cart.color}`}</span>
                    </div>
                    <div>{`${formatNumber(cart.price)}`}</div>
                    <div>
                        <InputNumber
                            className="cart-page-shop-table__quantity"
                            min={1}
                            max={99}
                            value={cart.quantity}
                            style={{ width: 62, borderRadius: 0 }}
                            onChange={(value) =>
                                onChangeQuantity(cart.id, value)
                            }
                        />
                    </div>
                    <div>{formatNumber(cart.quantity * cart.price)}</div>
                    <div>
                        <CloseCircleOutlined
                            onClick={() => handleDeleteProductInCarts(cart.id)}
                        />
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <div>{renderCartsList(carts)}</div>
            <div>
                <div className="flex justify-center gap-4">
                    {/* Nút xóa toàn bộ giỏ hàng */}
                    <button
                        className="bg-[#b88e2f] p-2 rounded-[20px] text-white hover:bg-[#ffffff] hover:text-[#b88e2f] hover:border-[#b88e2f] hover:border-[1px]"
                        onClick={() => handleClearCarts()}
                    >
                        Clear
                    </button>
                    <button className="bg-[#b88e2f] p-2 rounded-[20px] text-white hover:bg-[#ffffff] hover:text-[#b88e2f] hover:border-[#b88e2f] hover:border-[1px]">
                        Update Cart
                    </button>
                </div>
            </div>
        </div>

        // <table className="cart-page-shop-table__shop-table">
        //     <thead className="cart-page-shop-table__thead">
        //         <tr className="cart-page-shop-table__thead-tr">
        //             <th className="cart-page-shop-table__th2"></th>
        //             <th className="cart-page-shop-table__th3">Product</th>
        //             <th className="cart-page-shop-table__th4">Price</th>
        //             <th className="cart-page-shop-table__th5">Quantity</th>
        //             <th className="cart-page-shop-table__th6">Subtotal</th>
        //             <th className="cart-page-shop-table__th1"></th>
        //         </tr>
        //     </thead>

        //     <tbody className="cart-page-shop-table__tbody">

        //     </tbody>

        //     <tfoot>
        //         <tr>
        //             <td colSpan={6}>
        //                 <div className="cart-page-shop-table__tfoot-grp">
        //                     <div className="cart-page-shop-table__tfoot-grp-left">
        //                         {/* Ô nhập mã giảm giá */}
        //                         <Input placeholder="Coupon code " />
        //                         <button className="cart-page-shop-table__btn-apply-coupon">
        //                             <span>Apply Coupon</span>
        //                         </button>
        //                     </div>

        //                 </div>
        //             </td>
        //         </tr>
        //     </tfoot>
        // </table>
    );
};

export default PaymentTable;
