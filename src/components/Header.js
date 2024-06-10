import Logo from "../assets/images/header-logo.png";
import { AutoComplete } from "antd";
import Cart from "./Cart";
import {
    DownOutlined,
    MenuOutlined,
    SearchOutlined,
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
    setSearchKey,
    deleteFilterReducer,
} from "../redux/features/productSlice";
import axios from "axios";

function Header() {
    // Sử dụng useDispatch để tạo hàm dispatch, dùng để gửi các hành động (actions) đến Redux store
    const dispatch = useDispatch();

    // Sử dụng useNavigate để điều hướng (navigation) trong ứng dụng, thường dùng trong React Router
    const navigate = useNavigate();
    const [searchProductsResult, setSearchProductsResult] = useState([]);

    // Lấy các giá trị searchKey, pagination và params từ state.product trong Redux store
    const { searchKey } = useSelector((state) => state.product);

    // Lấy các giá trị isLogin và userInfo từ state.user trong Redux store
    const { isLogin, userInfo } = useSelector((state) => state.user);

    // Lấy giá trị carts từ state.cart trong Redux store
    const { carts } = useSelector((state) => state.cart);

    // Khởi tạo state isToggle với giá trị mặc định là false và hàm setIsToggle để cập nhật giá trị của nó
    const [isToggle, setIsToggle] = useState(false);

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
                <p
                    onClick={() => {
                        handleFilterAdidasProduct();
                    }}
                >
                    Adidas
                </p>
            ),
        },
        {
            key: "1",
            label: (
                <p
                    onClick={() => {
                        handleFilterNikeProduct();
                    }}
                >
                    Nike
                </p>
            ),
        },
        {
            key: "1",
            label: (
                <p
                    onClick={() => {
                        handleFilterMlbProduct();
                    }}
                >
                    MLB
                </p>
            ),
        },
    ];

    const menu = <Menu items={productPageItems} />;

    // Hàm xử lý sự kiện khi người dùng tìm kiếm sản phẩm
    const handleSearchProduct = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện (ví dụ: gửi form)
        e.stopPropagation();

        setSearchProductsResult([]);

        if (!searchKey) {
            options = [];
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
            options = [];
            setSearchProductsResult([]);
            setSearchProductsResult(data);
            console.log(searchProductsResult);
        }
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại giày
    const handleFilterAdidasProduct = () => {
        dispatch(setSearchKey("Adidas")); // Đặt từ khóa tìm kiếm là "Adidas"
        dispatch(deleteFilterReducer());
        navigate(`${ROUTES.PRODUCT_PAGE}?brandName=Adidas`); // Điều hướng người dùng đến trang sản phẩm
        setIsToggle(!isToggle); // Đảo ngược trạng thái của thanh điều hướng (mở hoặc đóng)
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại giày
    const handleFilterNikeProduct = () => {
        dispatch(setSearchKey("Nike")); // Đặt từ khóa tìm kiếm là "Nike"
        dispatch(deleteFilterReducer());
        navigate(`${ROUTES.PRODUCT_PAGE}?brandName=Nike`);
        setIsToggle(!isToggle); // Đảo ngược trạng thái của thanh điều hướng (mở hoặc đóng)
    };

    // Hàm xử lý sự kiện khi người dùng lọc sản phẩm theo loại giày
    const handleFilterMlbProduct = () => {
        dispatch(setSearchKey("MLB")); // Đặt từ khóa tìm kiếm là "MLB"
        dispatch(deleteFilterReducer());
        navigate(`${ROUTES.PRODUCT_PAGE}?brandName=MLB`);
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
        options = [];
        navigate(`${ROUTES.PRODUCT_PAGE}/${productId}`);
    };

    const [isDrawerOpen, setOpen] = useState(false);
    const [openDrawerCategory, setOpenDrawerCategory] = useState(false);

    const showDrawerCategory = () => {
        setOpenDrawerCategory(true);
    };
    const onCloseDrawerCategory = () => {
        setOpenDrawerCategory(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    let options = searchProductsResult.map((_product) => ({
        value: _product.name,
        label: (
            <div
                key={_product}
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

    // console.log(searchProductsResult, "searchProductsResult");

    return (
        <header className="bg-[#faf3ea] h-[100px] flex flex-row justify-between items-center px-1 sm:px-3 md:px-5 lg:px-10 sm:gap-5 md:gap-5">
            <div className="lg:hidden header-btn-show-navBar p-3">
                <MenuOutlined onClick={showDrawerCategory} />
            </div>
            <Drawer
                className="lg:hidden"
                placement="left"
                title="Menu"
                onClose={onCloseDrawerCategory}
                open={openDrawerCategory}
            >
                <ul className="menu-item grid grid-col-4 justify-center items-center gap-[50px]">
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
                <div>
                    <form onSubmit={handleSearchProduct} className="">
                        <div className="flex justify-center gap-5 my-10 rounded-lg">
                            <AutoComplete
                                style={{ width: 150 }}
                                options={options}
                                filterOption={false}
                                dropdownMatchSelectWidth={252}
                            >
                                <Input
                                    className=""
                                    placeholder="Search product..."
                                    value={searchKey}
                                    onChange={handleChangeInputSearch}
                                    onPressEnter={handleSearchProduct}
                                />
                            </AutoComplete>
                            <SearchOutlined
                                className=" text-gray-600 cursor-pointer"
                                onClick={handleProductClick}
                            />
                        </div>
                    </form>
                </div>
            </Drawer>
            <div className="header-logo lg:px-10 flex">
                <Link to={ROUTES.HOME_PAGE}>
                    <img className="m-auto" src={Logo} alt="logo" />
                </Link>
            </div>
            <div className="header-menu hidden lg:inline-block px-1 sm:px-3 md:px-5 lg:px-10 text-center">
                <ul className="menu-item grid grid-cols-4 gap-[50px]">
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
            <div className="header-icon px-1 sm:px-3 md:px-5 lg:px-10  text-center">
                <ul className="icon-item flex items-center gap-8">
                    <li className=" hidden md:flex lg:flex justify-center gap-2">
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
                                <div className="header-left__user-name text-[#b88e2f] font-bold hidden sm:block md:block">
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
