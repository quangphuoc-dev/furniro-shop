import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useSelector } from "react-redux";

// Component hiển thị thanh điều hướng hồ sơ người dùng
const ProfileNav = () => {
    // Lấy thông tin người dùng từ kho Redux
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();

    return (
        <div className="profile-nav-wrapper">
            <div className="profile-nav flex flex-col gap-2">
                {/* Hiển thị ảnh đại diện của người dùng */}
                <div className="profile-nav__avatar-grp flex flex-col items-center">
                    {!!userInfo?.avatarURL ? (
                        <img
                            src={userInfo?.avatarURL}
                            alt=""
                            className="profile-nav__avatar-grp--avatar w-[50px] rounded-[50%]"
                        />
                    ) : (
                        <img
                            src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                            alt=""
                            className="profile-nav__avatar-grp--avatar w-[50px] rounded-[50%]"
                        />
                    )}

                    {/* Hiển thị tên người dùng */}
                    <div>
                        <p className="profile-nav__avatar-grp--user-name">
                            {userInfo?.user}
                        </p>
                    </div>
                </div>

                {/* Hiển thị danh sách các tùy chọn thông tin hồ sơ */}
                <div className="profile-nav__list-information-grp">
                    <div className="flex justify-center border-solid border-[#000000]">
                        <ul className="profile-nav__list-information flex flex-col px-5 rounded-[10px] bg-[#fff3e3] py-3 ">
                            {/* Tùy chọn thay đổi hồ sơ */}
                            <li
                                className="profile-nav__list-information--change-profile basis-1/3    text-[#b88e2f] py-1 px-4 cursor-pointer hover:bg-[#b88e2f] hover:text-[#ffffff] active:bg-[#b88e2f] active:text-[#ffffff] focus:bg-black"
                                onClick={() => {
                                    navigate(ROUTES.USER_PROFILE_PAGE);
                                }}
                            >
                                Thay đổi hồ sơ
                            </li>
                            {/* Tùy chọn thay đổi mật khẩu */}
                            <li
                                className="profile-nav__list-information--change-password basis-1/3   text-[#b88e2f] py-1 px-4 cursor-pointer hover:bg-[#b88e2f] hover:text-[#ffffff] active:bg-[#b88e2f] active:text-[#ffffff]"
                                onClick={() => {
                                    navigate(ROUTES.USER_PASSWORD_PAGE);
                                }}
                            >
                                Thay đổi mật khẩu
                            </li>
                            {/* Tùy chọn xem lịch sử mua hàng */}
                            <li
                                className="profile-nav__list-information--purchase-history basis-1/3  text-[#b88e2f] py-1 px-4 cursor-pointer hover:bg-[#b88e2f] hover:text-[#ffffff] active:bg-[#b88e2f] active:text-[#ffffff]"
                                onClick={() => {
                                    navigate(ROUTES.USER_PURCHASE_HISTORY_PAGE);
                                }}
                            >
                                Xem lịch sử mua hàng
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileNav;
