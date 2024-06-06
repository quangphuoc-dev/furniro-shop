import React from "react";
import ProfileNav from "../components/ProfileNav";
import ChangePassWord from "../components/ChangePassWord";

const UserChangePassword = () => {
    return (
        <div className="user-profile-wrapper w-[100vw] flex justify-center my-[50px]">
            <div className="user-profile-container flex justify-around gap-5 w-[100vw] max-w-[1200px]">
                {/* Phần menu điều hướng */}
                <div className="user-profile-profile-nav flex justify-center">
                    <ProfileNav />
                </div>
                <div className="user-change-password-change-profile flex-1 border-l-2">
                    <ChangePassWord />
                </div>
            </div>
        </div>
    );
};

export default UserChangePassword;
