import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApis } from "../../apis/productApis";

// Trạng thái ban đầu của slice products
const initialState = {
    isLoading: false, // Trạng thái đang tải
    products: [], // Danh sách các sản phẩm
    productInfo: {}, // Thông tin của sản phẩm cụ thể
    imgsProducts: [], // Danh sách hình ảnh của sản phẩm
    errors: {}, // Lỗi (nếu có)
    pagination: {
        currentPage: 1, // Trang hiện tại
        limitPerPage: 8, // Số lượng sản phẩm mỗi trang
        total: 8, // Tổng số sản phẩm
    },
    searchKey: "", // Khóa tìm kiếm
    params: {
        _sort: null,
        _order: null,
        price_lte: null,
        price_gte: null,
    }, // Các tham số tìm kiếm và bộ lọc
    filter: "", // Bộ lọc hiện tại
};

// Hành động để lấy tất cả các sản phẩm từ server
export const actFetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (params) => {
        const response = await productApis.getAllProducts({
            ...params,
        });
        return {
            data: response.data,
            total: response.headers.get("X-Total-Count"),
        };
    }
);

// Hành động để lấy thông tin của một sản phẩm dựa trên ID
export const actFetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (productId) => {
        const product = await productApis.getProductsById(productId);
        return product;
    }
);

// Hành động để lấy tất cả các hình ảnh của sản phẩm
export const actFetchAllImgsProducts = createAsyncThunk(
    "products/fetchAllImgsProducts",
    async () => {
        const data = await productApis.getAllImgsProduct();
        return data;
    }
);

// Hành động để cập nhật thông tin của một sản phẩm dựa trên ID
export const actUpdateProductById = createAsyncThunk(
    "products/updateProductById",
    async ({ id, productUpdate }, thunkAPI) => {
        await productApis.updateProductById(id, productUpdate);
        return productUpdate;
    }
);

// Slice của products
const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        // Đặt trạng thái isLoading
        actSetLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // Đặt trang hiện tại cho phân trang
        setNewPage: (state, action) => {
            state.pagination = {
                ...state.pagination,
                currentPage: action.payload,
            };
        },
        // Đặt khóa tìm kiếm
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
        },
        // Xử lý bộ lọc
        filterReducer: (state, action) => {
            state.filter = action.payload;

            switch (action.payload) {
                case "Name: A-Z":
                    state.params._sort = "name";
                    state.params._order = "asc";
                    break;
                case "Name: Z-A":
                    state.params._sort = "name";
                    state.params._order = "desc";
                    break;
                case "Price: Low to High":
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "Price: High to Low":
                    state.params._sort = "price";
                    state.params._order = "desc";
                    break;
                case "less than 1.500.000đ":
                    state.params.price_gte = 0;
                    state.params.price_lte = 1499999;
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "1.500.000đ - 2.500.000đ":
                    state.params.price_gte = 1500000;
                    state.params.price_lte = 2500000;
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "2.500.000đ - 3.500.000đ":
                    state.params.price_gte = 2500000;
                    state.params.price_lte = 35000000;
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                case "greater than 3.500.000đ":
                    state.params.price_gte = 35000000;
                    state.params.price_lte = 9000000000000000;
                    state.params._sort = "price";
                    state.params._order = "asc";
                    break;
                default:
                    state.params._sort = "brands";
                    state.params._order = "asc";
                    break;
            }

            if (action.payload === "color") {
                state.params.color_like = action.payload.value;
            }
        },
        // Xóa bộ lọc
        deleteFilterReducer: (state) => {
            state.params = {
                _sort: null,
                _order: null,
                price_lte: null,
                price_gte: null,
            };
        },
    },
    extraReducers: (builder) => {
        // Xử lý khi hành động lấy tất cả các sản phẩm thành công
        builder.addCase(actFetchAllProducts.pending, (state, action) => {
            state.isLoading = true; // Đánh dấu là đang tải
        });
        builder.addCase(actFetchAllProducts.rejected, (state, action) => {
            state.errors = {}; // Xóa lỗi
            state.isLoading = false; // Đánh dấu là không còn đang tải
        });
        builder.addCase(actFetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.data; // Cập nhật danh sách sản phẩm từ payload của action
            state.pagination.total = action.payload.total; // Cập nhật tổng số sản phẩm
            state.isLoading = false; // Đánh dấu là không còn đang tải
        });

        // Xử lý khi hành động lấy thông tin của một sản phẩm dựa trên ID thành công
        builder.addCase(actFetchProductById.fulfilled, (state, action) => {
            state.productInfo = action.payload; // Cập nhật thông tin sản phẩm
        });

        // Xử lý khi hành động lấy tất cả các hình ảnh của sản phẩm thành công
        builder.addCase(actFetchAllImgsProducts.fulfilled, (state, action) => {
            state.imgsProducts = action.payload; // Cập nhật danh sách hình ảnh sản phẩm
        });

        // Xử lý khi hành động cập nhật thông tin của một sản phẩm dựa trên ID thành công
        builder.addCase(actUpdateProductById.fulfilled, (state, action) => {
            state.productInfo = action.payload; // Cập nhật thông tin sản phẩm
        });
    },
});

// Export các hành động và reducer của slice products
export const {
    actSetLoading,
    setNewPage,
    setSearchKey,
    filterReducer,
    deleteFilterReducer,
    setParams,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
