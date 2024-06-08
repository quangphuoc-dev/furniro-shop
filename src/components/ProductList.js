import React, { useEffect, useState } from "react";
import { Col, Pagination, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    actFetchAllProducts,
    filterReducer,
    setNewPage,
    deleteFilterReducer,
} from "../redux/features/productSlice";
import SpinFC from "antd/es/spin";
import { globalNavigate } from "../utils/globalHistory"; // Import globalNavigate
import { formatNumber } from "../utils/formatNumber";
import { useLocation } from "react-router-dom";

const ProductList = () => {
    const dispatch = useDispatch();
    const { isLoading, products, pagination, searchKey, filter, params } =
        useSelector((state) => state.product);
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState("Lọc theo giá:");
    const [selectedSort, setSelectedSort] = useState("Sắp xếp theo:");

    // Fetch danh sách sản phẩm khi component được render
    useEffect(() => {
        const paramsInit = new URLSearchParams(location.search);
        const brandName = paramsInit.get("brandName");

        dispatch(
            actFetchAllProducts({
                _page: pagination.currentPage ?? 1,
                _limit: pagination.limitPerPage,
                q: params.search ?? brandName,
                filter,
                ...params,
            })
        );
        // eslint-disable-next-line
    }, [location, pagination.currentPage, filter]);

    useEffect(() => {
        // Làm sạch các giá trị filter ở đây
        deleteFilterReducer();
        setSelectedValue("Lọc theo giá:");
        setSelectedSort("Sắp xếp theo:");
    }, [location.search, location.pathname]);

    // Xử lý thay đổi trang
    const handleChangePage = (newPage) => {
        dispatch(setNewPage(newPage));
    };

    // // Fetch lại danh sách sản phẩm khi thay đổi từ khóa tìm kiếm
    // useEffect(() => {
    //     dispatch(
    //         actFetchAllProducts({
    //             _page: 1,
    //             _limit: pagination.limitPerPage,
    //             q: searchKey,
    //             ...params,
    //         })
    //     );
    //     // eslint-disable-next-line
    // }, [searchKey]);

    // Xử lý thay đổi filter
    const handleFilterChange = async (valueFilter) => {
        setSelectedValue(valueFilter);
        dispatch(filterReducer(valueFilter));
        dispatch(setNewPage(1));
    };

    const handleSortChange = async (valueFilter) => {
        setSelectedSort(valueFilter);
        dispatch(filterReducer(valueFilter));
        dispatch(setNewPage(1));
    };

    // // Fetch lại danh sách sản phẩm khi thay đổi filter
    // const { filter } = useSelector((state) => state.product);
    // useEffect(() => {
    //     dispatch(
    //         actFetchAllProducts({
    //             _page: 1,
    //             _limit: pagination.limitPerPage,
    //             q: searchKey,
    //             ...params,
    //         })
    //     );
    //     // eslint-disable-next-line
    // }, [filter]);

    // Hiển thị loading khi đang fetch dữ liệu
    if (isLoading) {
        return <SpinFC />;
    }

    // Render danh sách sản phẩm
    const renderProducts = (products) => {
        return products.map((product) => {
            return (
                <div
                    className="hover:cursor-pointer hover:opacity-[0.5]"
                    onClick={() => {
                        handleProductClick(product.id);
                    }}
                    key={product.id}
                >
                    <div className="relative">
                        <img src={product.imgURL} alt="" />
                        {!product.status?.type ? null : product.status?.type ===
                          "NEW" ? (
                            <div className="text-[16px] flex items-center justify-center leading-[1.5] text-[#ffffff] font-[500] rounded-[1000px] bg-[#71e9a3] w-[48px] h-[48px] absolute top-[24px] right-[24px]">
                                New
                            </div>
                        ) : (
                            <div className="text-[16px] flex items-center justify-center leading-[1.5] text-[#ffffff] font-[500] rounded-[1000px] bg-[#e97171] w-[48px] h-[48px] absolute top-[24px] right-[24px]">
                                {product.status?.value}
                            </div>
                        )}
                    </div>
                    <div className="bg-[#f4f5f7] p-[8px] flex flex-col justify-between gap-[4px]  h-[150px]">
                        <span className="text-[20px] px-3 h-[40px] leading-[1.2] text-[#3a3a3a] font-[600] block">
                            {product.name}
                        </span>
                        <p className="text-[16px] px-3 leading-[1.5] text-[#898989] font-[500] ">
                            {product.brandsName}
                        </p>
                        <div className="px-3 flex justify-between">
                            <span className="text-[20px] leading-[1.5] text-[3a3a3a] font-[600] pr-[16px]">
                                {formatNumber(product.price)}
                            </span>
                            <span className="text-[16px] leading-[1.5] text-[#b0b0b0] font-[400] line-through">
                                {formatNumber(product.oldPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    // Xử lý khi click vào sản phẩm để chuyển đến trang detailProduct
    const handleProductClick = (productId) => {
        globalNavigate(`/products/${productId}`); // Sử dụng globalNavigate để điều hướng đến trang detailProduct
    };

    return (
        <div className="list-product">
            {/* Filter Options */}
            <div className="list-product__filter-grp h-[60px] bg-stone-300 flex items-center gap-2">
                {/* Dropdown filter giá */}
                <Select
                    value={selectedValue}
                    style={{ width: 188 }}
                    onChange={handleFilterChange}
                    options={[
                        {
                            value: "less than 1.500.000đ",
                            label: "Dưới 1.500.000đ",
                        },
                        {
                            value: "1.500.000đ - 2.500.000đ",
                            label: "1.500.000đ - 2.500.000đ",
                        },
                        {
                            value: "2.500.000đ - 3.500.000đ",
                            label: "2.500.000đ - 3.500.000đ",
                        },
                        {
                            value: "greater than 3.500.000đ",
                            label: "Trên 3.500.000đ",
                        },
                    ]}
                />

                {/* Dropdown sắp xếp */}
                <Select
                    value={selectedSort}
                    style={{ width: 150 }}
                    onChange={handleSortChange}
                    options={[
                        { value: "Name: A-Z", label: "Tên: A-Z" },
                        { value: "Name: Z-A", label: "Tên: Z-A" },
                        {
                            value: "Price: Low to High",
                            label: "Giá: Thấp đến cao",
                        },
                        {
                            value: "Price: High to Low",
                            label: "Giá: Cao đến thấp",
                        },
                    ]}
                />
            </div>

            {/* Danh sách sản phẩm */}
            <div className="product-items inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px] py-[55px] px-[100px]">
                {renderProducts(products)}
            </div>

            {/* Pagination */}
            <div className="flex flex-row justify-center items-center mb-4">
                <Pagination
                    pageSize={pagination.limitPerPage}
                    current={pagination.currentPage}
                    total={pagination.total}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
};

export default ProductList;
