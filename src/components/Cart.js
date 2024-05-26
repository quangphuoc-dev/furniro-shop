import { Input, InputNumber, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
    actClearCarts,
    actDeleteProductInCarts,
    actUpdateQuantityOfProduct,
} from "../redux/features/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { carts } = useSelector((state) => state.cart);

    // Hàm định dạng số thành chuỗi với dấu ngăn cách hàng nghìn
    const formatNumber = (num) => {
        let numString = "";
        while (num > 0) {
            let div = num % 1000;
            num = Math.floor(num / 1000);
            if (num !== 0) {
                if (div < 10) {
                    div = "00" + div;
                } else if (div < 100) {
                    div = "0" + div;
                }
                numString = "." + div + numString;
            } else {
                numString = div + numString;
            }
        }
        return numString;
    };

    // Hàm xử lý sự kiện thay đổi số lượng sản phẩm trong giỏ hàng
    const onChangeQuantity = (id, quantity) => {
        dispatch(actUpdateQuantityOfProduct({ id: id, quantity: quantity }));
    };

    // Hàm xử lý sự kiện xóa sản phẩm trong giỏ hàng
    const handleDeleteProductInCarts = (productId) => {
        dispatch(actDeleteProductInCarts(productId));
    };

    // Hàm xử lý sự kiện xóa toàn bộ sản phẩm trong giỏ hàng
    const handleClearCarts = () => {
        dispatch(actClearCarts());
    };

    const handlePayment = () => {
        navigate('/payment');
    };

    // Hàm render danh sách sản phẩm trong giỏ hàng
    const renderCartsList = (carts) => {
        return carts.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td className="cart-page-shop-table__img-product">
                        <img src={cart.imgURL} alt="" />
                    </td>
                    <td className="cart-page-shop-table__name-product">
                        <p className="name">{`${cart.name} - ${cart.size}`}</p>
                        <p className="color">{`Color: ${cart.color}`}</p>
                    </td>
                    <td className="cart-page-shop-table__price-product">{`${formatNumber(
                        cart.price
                    )}`}</td>
                    <td className="cart-page-shop-table__quantity-product">
                        <div className="cart-page-shop-table__quantity-grp">
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
                    </td>
                    <td className="cart-page-shop-table__subtotal-product">
                        {formatNumber(cart.quantity * cart.price)}
                    </td>
                    <td className="cart-page-shop-table__cancel-btn">
                        <CloseOutlined
                            onClick={() => handleDeleteProductInCarts(cart.id)}
                        />
                    </td>
                </tr>
            );
        });
    };

    return (
        <table className="cart-page-shop-table__shop-table">
            <thead className="cart-page-shop-table__thead">
                <tr className="cart-page-shop-table__thead-tr">
                    <th className="cart-page-shop-table__th2"></th>
                    <th className="cart-page-shop-table__th3">Product</th>
                    <th className="cart-page-shop-table__th4">Price</th>
                    <th className="cart-page-shop-table__th5">Quantity</th>
                    <th className="cart-page-shop-table__th6">Subtotal</th>
                    <th className="cart-page-shop-table__th1"></th>
                </tr>
            </thead>

            <tbody className="cart-page-shop-table__tbody">
                {renderCartsList(carts)}
            </tbody>

            <tfoot>
                <tr>
                    <td colSpan={6}>
                        <div className="cart-page-shop-table__tfoot-grp">
                            <div className="cart-page-shop-table__tfoot-grp-left">
                                <Input placeholder="Coupon code " />
                                <button className="cart-page-shop-table__btn-apply-coupon">
                                    <span>Apply Coupon</span>
                                </button>
                            </div>
                            <div style={{ display: "flex", gap: 40 }}>
                                <p
                                    className="cart-page-shop-table__clear-cart"
                                    onClick={() => handleClearCarts()}
                                >
                                    clear
                                </p>
                                <button 
                                className="cart-page-shop-table__btn-update-cart"
                                onClick={handlePayment}>
                                    <span>Update Cart</span>
                                    
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default Cart;
