import { InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
    actClearCarts,
    actDeleteProductInCarts,
    actUpdateQuantityOfProduct,
} from "../redux/features/cartSlice";
import { ROUTES } from "../constants/routes";
import { formatNumber } from "../utils/formatNumber";

// Component Cart nhận props closeDrawer
const Cart = ({ closeDrawer }) => {
    // Lấy hàm dispatch từ Redux để dispatch các action
    const dispatch = useDispatch();
    // Lấy hàm navigate từ React Router để điều hướng giữa các trang
    const navigate = useNavigate();
    // Lấy danh sách sản phẩm trong giỏ hàng từ Redux store
    const { carts } = useSelector((state) => state.cart);

    // Hàm xử lý sự kiện thay đổi số lượng sản phẩm trong giỏ hàng
    const onChangeQuantity = (id, size, quantity) => {
        // Dispatch action để cập nhật số lượng sản phẩm trong giỏ hàng
        dispatch(actUpdateQuantityOfProduct({ id, size, quantity }));

        console.log({ id, size, quantity });
    };

    // Hàm xử lý sự kiện xóa sản phẩm trong giỏ hàng
    const handleDeleteProductInCarts = (productId) => {
        // Dispatch action để xóa sản phẩm khỏi giỏ hàng
        dispatch(actDeleteProductInCarts(productId));
    };

    // Hàm xử lý sự kiện xóa toàn bộ sản phẩm trong giỏ hàng
    const handleClearCarts = () => {
        // Dispatch action để xóa toàn bộ sản phẩm khỏi giỏ hàng
        dispatch(actClearCarts());
    };

    // Hàm xử lý sự kiện điều hướng đến trang giỏ hàng
    const handleCart = () => {
        // Đóng Drawer (ngăn kéo)
        closeDrawer();
        // Điều hướng đến trang giỏ hàng
        navigate(ROUTES.CART_PAGE);
    };

    // Hàm render danh sách sản phẩm trong giỏ hàng
    const renderCartsList = (carts) => {
        console.log(carts);
        return carts.map((cart) => {
            return (
                <div>
                    <div className="my-[16px]">
                        <div className="flex gap-[20px] items-center">
                            <img
                                src={cart.imgURL}
                                className=" rounded-[10px] bg-[#F9F1E7] w-[105px] h-[105px]"
                                alt=""
                            />
                            <div className="">
                                <div className="text-[16px] text-[#000000] font-[400px]">
                                    {cart.name}
                                </div>
                                <div>Size: {cart.size}</div>
                                <div className="flex gap-4 items-center mt-[8px]">
                                    <span className="text-[16px] text-[#000000] font-[400px] block">
                                        <InputNumber
                                            className="cart-page-shop-table__quantity"
                                            min={1}
                                            max={99}
                                            value={cart.quantity}
                                            style={{
                                                width: 62,
                                                borderRadius: 0,
                                            }}
                                            onChange={(value) =>
                                                onChangeQuantity(
                                                    cart.id,
                                                    cart.size,
                                                    value
                                                )
                                            }
                                        />
                                    </span>
                                    <span>x</span>
                                    <span className=" text-[12px] text-[#b88e2f] font-[500] block">
                                        {formatNumber(cart.price)}
                                    </span>
                                </div>
                            </div>

                            <span className="">
                                <CloseCircleOutlined
                                    onClick={() =>
                                        handleDeleteProductInCarts(cart.id)
                                    }
                                />
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col h-[100%] gap-[24px] justify-between">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div>{renderCartsList(carts)}</div>
            </div>
            <div className="basis-1">
                <div className="flex gap-[10px] pt-[24px] border-t-2 justify-center">
                    <button
                        className="h-[30px] w-[87px] rounded-[50px] border-solid border-[1px] border-[#000000] text-[12px] text-[#000000] font-[400] "
                        onClick={() => handleClearCarts()}
                    >
                        Clear
                    </button>
                    <button
                        className="h-[30px] w-[118px] rounded-[50px] border-solid border-[1px] border-[#000000] text-[12px] text-[#000000] font-[400] "
                        onClick={() => handleCart()}
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
