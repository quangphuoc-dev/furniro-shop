import Logo from "../assets/images/header-logo.png";
import { AutoComplete } from "antd";
import Cart from "./Cart";
import {
    CloseOutlined,
    DownOutlined,
    MenuOutlined,
    SearchOutlined,
    ShoppingOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Drawer, Space, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import {
    actFetchAllProducts,
    setNewPage,
    setSearchKey,
} from "../redux/features/productSlice";
import axios from "axios";
import { globalNavigate } from "../utils/globalHistory"; // Import globalNavigate

function Header() {
    // const carts = useSelector() lay du lieu cart tu store
    // const items: MenuProps["items"] = [
    //     {
    //         label: <a href="http://localhost:3000/login">Login</a>,
    //         key: "0",
    //     },
    //     {
    //         type: "divider",
    //     },
    //     {
    //         label: <a href="http://localhost:3000/register">Register</a>,
    //         key: "1",
    //     },
    // ];
    // Sử dụng useDispatch để tạo hàm dispatch, dùng để gửi các hành động (actions) đến Redux store
    const dispatch = useDispatch();

    // Sử dụng useNavigate để điều hướng (navigation) trong ứng dụng, thường dùng trong React Router
    const navigate = useNavigate();
    const [searchProductsResult, setSearchProductsResult] = useState([]);

    // Lấy các giá trị searchKey, pagination và params từ state.product trong Redux store
    const { searchKey, pagination, params } = useSelector(
        (state) => state.product
    );

    // Lấy các giá trị isLogin và userInfo từ state.user trong Redux store
    const { isLogin, userInfo } = useSelector((state) => state.user);

    // Lấy giá trị carts từ state.cart trong Redux store
    const { carts } = useSelector((state) => state.cart);

    // Khởi tạo state isToggle với giá trị mặc định là false và hàm setIsToggle để cập nhật giá trị của nó
    const [isToggle, setIsToggle] = useState(false);

    // Khởi tạo state isShowSubNavProductMobile với giá trị mặc định là false và hàm setIsShowSubNavProductMobile để cập nhật giá trị của nó
    const [isShowSubNavProductMobile, setIsShowSubNavProductMobile] =
        useState(false);

    // Khởi tạo state isShowSubNavGiftMobile với giá trị mặc định là false và hàm setIsShowSubNavGiftMobile để cập nhật giá trị của nó
    const [isShowSubNavGiftMobile, setIsShowSubNavGiftMobile] = useState(false);

    // Khởi tạo state isShowSubNavBlogMobile với giá trị mặc định là false và hàm setIsShowSubNavBlogMobile để cập nhật giá trị của nó
    const [isShowSubNavBlogMobile, setIsShowSubNavBlogMobile] = useState(false);

    // Mảng items chứa các đối tượng dùng để hiển thị các liên kết và chia cách trong menu cho người dùng chưa đăng nhập
    const items = [
        {
            key: "1", // Định danh duy nhất cho mục này
            label: <Link to={ROUTES.LOGIN_PAGE}>Login</Link>, // Liên kết đến trang đăng nhập
        },
        {
            type: "divider", // Dùng để thêm đường phân cách trong menu
        },
        {
            key: "2", // Định danh duy nhất cho mục này
            label: <Link to={ROUTES.REGISTER_PAGE}>Register</Link>, // Liên kết đến trang đăng ký
        },
    ];

    // Mảng itemsLoginSuccess chứa các đối tượng dùng để hiển thị các liên kết và chia cách trong menu cho người dùng đã đăng nhập
    const itemsLoginSuccess = [
        {
            key: "1", // Định danh duy nhất cho mục này
            label: <Link to={ROUTES.USER_PROFILE_PAGE}>My Profile</Link>, // Liên kết đến trang hồ sơ cá nhân của người dùng
        },
        {
            type: "divider", // Dùng để thêm đường phân cách trong menu
        },
        {
            key: "2", // Định danh duy nhất cho mục này
            label: <Link to={ROUTES.USER_PASSWORD_PAGE}>Change password</Link>, // Liên kết đến trang thay đổi mật khẩu
        },
        {
            type: "divider", // Dùng để thêm đường phân cách trong menu
        },
        {
            key: "3", // Định danh duy nhất cho mục này
            // Liên kết đến trang lịch sử mua hàng
            label: (
                <Link to={ROUTES.USER_PURCHASE_HISTORY_PAGE}>
                    Purchase History
                </Link>
            ),
        },
        {
            type: "divider", // Dùng để thêm đường phân cách trong menu
        },
        {
            key: "4", // Định danh duy nhất cho mục này
            label: (
                // Nút logout khi được nhấn sẽ gửi hành động logout đến Redux store và điều hướng người dùng về trang chủ
                <Button
                    onClick={() => {
                        dispatch(logout()); // Gửi hành động logout đến Redux store
                        navigate(ROUTES.HOME_PAGE); // Điều hướng người dùng về trang chủ
                    }}
                >
                    Logout
                </Button>
            ),
        },
    ];

    const productPageItems = [
        {
            key: "1",
            label: (
                <a
                    onClick={() => {
                        handleFilterAdidasProduct();
                    }}
                >
                    Adidas
                </a>
            ),
        },
        {
            key: "1",
            label: (
                <a
                    onClick={() => {
                        handleFilterNikeProduct();
                    }}
                >
                    Nike
                </a>
            ),
        },
        {
            key: "1",
            label: (
                <a
                    onClick={() => {
                        handleFilterMlbProduct();
                    }}
                >
                    MLB
                </a>
            ),
        },
    ];

    const menu = <Menu items={productPageItems} />;
    // Hàm xử lý sự kiện khi người dùng nhấn nút toggle để mở/đóng thanh điều hướng chính
    const handleToggleNavBar = () => {
        // Đảo ngược giá trị của isToggle để mở hoặc đóng thanh điều hướng
        setIsToggle(!isToggle);
    };

    // Hàm xử lý sự kiện khi người dùng nhấn nút toggle để mở/đóng menu con sản phẩm trên di động
    const handleToggleSubNavProductMobile = () => {
        // Đảo ngược giá trị của isShowSubNavProductMobile để mở hoặc đóng menu con sản phẩm
        setIsShowSubNavProductMobile(!isShowSubNavProductMobile);
    };

    // Hàm xử lý sự kiện khi người dùng nhấn nút toggle để mở/đóng menu con quà tặng trên di động
    const handleToggleSubNavGiftMobile = () => {
        // Đảo ngược giá trị của isShowSubNavGiftMobile để mở hoặc đóng menu con quà tặng
        setIsShowSubNavGiftMobile(!isShowSubNavGiftMobile);
    };

    // Hàm xử lý sự kiện khi người dùng nhấn nút toggle để mở/đóng menu con blog trên di động
    const handleToggleSubNavBlogMobile = () => {
        // Đảo ngược giá trị của isShowSubNavBlogMobile để mở hoặc đóng menu con blog
        setIsShowSubNavBlogMobile(!isShowSubNavBlogMobile);
    };

    // Hàm xử lý sự kiện điều hướng người dùng về trang chủ
    const handleRedirectToHomePage = () => {
        // Điều hướng người dùng đến trang chủ
        navigate(ROUTES.HOME_PAGE);
    };

    // Hàm xử lý sự kiện điều hướng người dùng về trang giỏ hàng
    const handleRedirectToCartPage = () => {
        // Điều hướng người dùng đến trang giỏ hàng
        navigate(ROUTES.PAYMENT_PAGE);
    };

    // Hàm xử lý sự kiện khi người dùng tìm kiếm sản phẩm
    const handleSearchProduct = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện (ví dụ: gửi form)
        e.stopPropagation();

        if (!searchKey) {
            setSearchProductsResult([]);
            return;
        }

        const { data } = await axios.get(
            `${process.env.REACT_APP_BE_URL}products`,
            {
                params: {
                    q: searchKey, // Sao chép các tham số truyền vào
                },
            }
        );

        if (data) {
            setSearchProductsResult(data);
        }
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại nhẫn
    const handleFilterAdidasProduct = () => {
        dispatch(setSearchKey("Adidas")); // Đặt từ khóa tìm kiếm là "Adidas"
        dispatch(
            actFetchAllProducts({
                _page: 1, // Đặt trang hiện tại về 1
                _limit: pagination.limitPerPage, // Giới hạn số lượng sản phẩm trên mỗi trang
                q: searchKey, // Từ khóa tìm kiếm (là "Adidas" trong trường hợp này)
                ...params, // Giữ lại các tham số lọc hiện tại khác
            })
        );
        navigate(ROUTES.PRODUCT_PAGE); // Điều hướng người dùng đến trang sản phẩm
        setIsToggle(!isToggle); // Đảo ngược trạng thái của thanh điều hướng (mở hoặc đóng)
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại nhẫn
    const handleFilterNikeProduct = () => {
        dispatch(setSearchKey("Nike")); // Đặt từ khóa tìm kiếm là "Nike"
        dispatch(
            actFetchAllProducts({
                _page: 1, // Đặt trang hiện tại về 1
                _limit: pagination.limitPerPage, // Giới hạn số lượng sản phẩm trên mỗi trang
                q: searchKey, // Từ khóa tìm kiếm (là "Nike" trong trường hợp này)
                ...params, // Giữ lại các tham số lọc hiện tại khác
            })
        );
        navigate(ROUTES.PRODUCT_PAGE); // Điều hướng người dùng đến trang sản phẩm
        setIsToggle(!isToggle); // Đảo ngược trạng thái của thanh điều hướng (mở hoặc đóng)
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại nhẫn
    const handleFilterMlbProduct = () => {
        dispatch(setSearchKey("MLB")); // Đặt từ khóa tìm kiếm là "MLB"
        dispatch(
            actFetchAllProducts({
                _page: 1, // Đặt trang hiện tại về 1
                _limit: pagination.limitPerPage, // Giới hạn số lượng sản phẩm trên mỗi trang
                q: searchKey, // Từ khóa tìm kiếm (là "MLB" trong trường hợp này)
                ...params, // Giữ lại các tham số lọc hiện tại khác
            })
        );
        navigate(ROUTES.PRODUCT_PAGE); // Điều hướng người dùng đến trang sản phẩm
        setIsToggle(!isToggle); // Đảo ngược trạng thái của thanh điều hướng (mở hoặc đóng)
    };

    // Hàm xử lý sự kiện khi người dùng nhập từ khóa tìm kiếm vào ô input
    const handleChangeInputSearch = (e) => {
        // Lấy giá trị từ ô input
        const value = e.target.value;
        // Gửi hành động setSearchKey với giá trị từ khóa tìm kiếm mới đến Redux store
        dispatch(setSearchKey(value));
    };

    const handleProductClick = (productId) => {
        globalNavigate(`/products/${productId}`); // Sử dụng globalNavigate để điều hướng đến trang detailProduct
    };

    const [isDrawerOpen, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const options = searchProductsResult.map((_product) => ({
        value: _product.name,
        label: (
            <div
                key={_product.id}
                onClick={() => handleProductClick(_product.id)}
                className="flex gap-2 my-1"
            >
                <img
                    className="w-[50px] h-[50px]"
                    src={_product.imgURL}
                    alt={_product.name}
                />
                <span>{_product.name}</span>
            </div>
        ),
    }));

    console.log(searchProductsResult, "searchProductsResult");

    return (
        <header className="bg-stone-300	 h-[100px] flex flex-row items-center px-10">
            <div className="header-logo basis-1/4 px-10 flex">
                <Link to={ROUTES.HOME_PAGE}>
                    <img className="m-auto" src={Logo} />
                </Link>
            </div>
            <div className="header-menu basis-2/4 px-10 text-center">
                <ul className="menu-item grid grid-cols-4">
                    <li className="cursor-pointer">
                        <Link to={ROUTES.HOME_PAGE}>Home</Link>
                    </li>
                    <li>
                        <Dropdown overlay={menu} trigger={["hover"]}>
                            <Space>
                                <Link to={ROUTES.PRODUCT_PAGE}>Product</Link>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </li>
                    <li>
                        <Link to={ROUTES.BLOG_PAGE}>Blog</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.CONTACT_PAGE}>Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="header-icon basis-1/4 px-10  text-center">
                <ul className="icon-item flex items-center gap-8">
                    <li className="flex justify-center gap-2">
                        <form
                            onSubmit={handleSearchProduct}
                            className="flex items-center"
                        >
                            <div className="flex relative items-center border border-gray-300 rounded-lg">
                                <AutoComplete
                                    style={{ width: 150 }}
                                    options={options}
                                    filterOption={false}
                                    dropdownMatchSelectWidth={252}
                                >
                                    <Input
                                        className="flex-1 p-2 outline-none"
                                        placeholder="Search product..."
                                        value={searchKey}
                                        onChange={handleChangeInputSearch}
                                        onPressEnter={handleSearchProduct}
                                    />
                                </AutoComplete>
                                <SearchOutlined
                                    className="p-2 text-gray-600 cursor-pointer"
                                    onClick={handleProductClick}
                                />
                            </div>
                        </form>
                    </li>
                    <li className="flex justify-center cursor-pointer">
                        <ShoppingCartOutlined
                            onClick={() => {
                                showDrawer();
                            }}
                        />
                        <p className="bg-[#b88e2f] w-[25px] h-[25px] translate-y-[-8px]	 rounded-[50%]">
                            {carts.length}
                        </p>
                        <>
                            <Drawer
                                title="Shopping Cart"
                                onClose={onClose}
                                open={isDrawerOpen}
                            >
                                <Cart closeDrawer={onClose} />
                            </Drawer>
                        </>
                    </li>
                    <li>
                        {!isLogin && (
                            <div className="header-left__loginRegisterGrp">
                                <div className="header-left__icon">
                                    <Dropdown
                                        menu={{ items }}
                                        placement="bottomLeft"
                                    >
                                        <UserOutlined />
                                    </Dropdown>
                                </div>
                            </div>
                        )}

                        {isLogin && (
                            <div className="header-left__user-grp flex justify-center gap-2">
                                <div className="header-left__user-avatar">
                                    <Dropdown
                                        menu={{ items: itemsLoginSuccess }}
                                        trigger={"click"}
                                        placement="bottomLeft"
                                    >
                                        {userInfo?.avatarURL ? (
                                            <div className="header-left__avatar-user">
                                                <img
                                                    className="rounded-[50%] w-[30px]"
                                                    src={userInfo?.avatarURL}
                                                    alt=""
                                                />
                                            </div>
                                        ) : (
                                            <UserOutlined />
                                        )}
                                    </Dropdown>
                                </div>
                                <div className="header-left__user-name text-[#b88e2f] font-bold">
                                    <p>{userInfo?.user}</p>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
