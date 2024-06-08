import React from "react";
import ChangePersonalInformation from "../components/ChangePersonalInformation";
import ProfileNav from "../components/ProfileNav";

// Trang cá nhân người dùng, cho phép thay đổi thông tin cá nhân và hiển thị menu điều hướng
const UserProfilePage = () => {
    return (
        <div className="user-profile-wrapper w-[100vw] flex justify-center my-[50px]">
            <div className="user-profile-container flex lg:flex-row md:flex-row flex-col justify-around gap-5 w-[100vw] max-w-[1200px]">
                {/* Phần menu điều hướng */}
                <div className="user-profile-profile-nav flex justify-center">
                    <ProfileNav />
                </div>
                {/* Phần thay đổi thông tin cá nhân */}
                <div className="user-profile-change-profile flex-1 border-l-2">
                    <ChangePersonalInformation />
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
