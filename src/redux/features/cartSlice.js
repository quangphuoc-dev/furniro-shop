import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// Khóa dùng để lưu trữ giỏ hàng trong localStorage
const KEY_CARTS_LIST = "key_carts_list";

// Khởi tạo trạng thái ban đầu cho slice giỏ hàng
const initialState = {
    carts: JSON.parse(localStorage.getItem(KEY_CARTS_LIST)) || [], // Lấy giỏ hàng từ localStorage hoặc đặt giá trị mặc định là mảng rỗng
};

// Tạo slice cho giỏ hàng
const cartSlice = createSlice({
    name: "carts", // Tên của slice
    initialState: initialState, // Trạng thái ban đầu của slice
    reducers: {
        // Hành động để thêm sản phẩm vào giỏ hàng
        actAddProductToCarts: (state, action) => {
            const product = action.payload;
            console.log(product, "add cart ne");
            // const { id, name, imgURL, price, quantity } = product;
            const existedItemIndex = state.carts.find(
                (cart) => cart.id === product.id && cart.size === product.size
            );

            // nếu trùng id => + quantity
            if (existedItemIndex) {
                // Nếu sản phẩm đã tồn tại trong giỏ hàng với cùng một ID và cùng một size, cập nhật số lượng
                existedItemIndex.quantity += product.quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại trong giỏ hàng hoặc có cùng ID nhưng khác size, thêm sản phẩm mới
                state.carts.push({ ...product });
            }
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
            message.success("Add product to carts success!");
        },

        // Hành động để xóa sản phẩm khỏi giỏ hàng
        actDeleteProductInCarts: (state, action) => {
            // Lọc giỏ hàng để xóa sản phẩm có id khớp với payload
            state.carts = state.carts.filter(
                (cart) => cart.id !== action.payload
            );
            // Cập nhật giỏ hàng trong localStorage
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
            // Hiển thị thông báo thành công
            message.success("Delete product in carts success!");
        },

        // Hành động để xóa toàn bộ giỏ hàng
        actClearCarts: (state, action) => {
            state.carts = []; // Đặt giỏ hàng về mảng rỗng
            // Cập nhật giỏ hàng trong localStorage
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
            // Hiển thị thông báo thành công
            message.success("Clear carts success!");
        },

        // Hành động để cập nhật số lượng sản phẩm trong giỏ hàng
        actUpdateQuantityOfProduct: (state, action) => {
            const { id, size, quantity } = action.payload;
            const existedItemIndex = state.carts.findIndex(
                (item) => item.id === id && item.size === size
            );
            state.carts[existedItemIndex].quantity = quantity;
            localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
        },
    },
});

// Xuất các actions và reducer từ slice giỏ hàng
export const {
    actAddProductToCarts,
    actDeleteProductInCarts,
    actClearCarts,
    actUpdateQuantityOfProduct,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
