import React from "react";
import ProfileNav from "../components/ProfileNav";
import PurchaseHistory from "../components/PurchanseHistory";

// Trang để hiển thị lịch sử mua hàng của người dùng
const UserPurchaseHistoryPage = () => {
    return (
        <div className="user-profile-wrapper w-[100vw] flex justify-center my-[50px]">
            <div className="user-profile-container flex justify-around gap-5 w-[100vw] max-w-[1200px]">
                {/* Phần menu điều hướng */}
                <div className="user-profile-profile-nav flex justify-center">
                    <ProfileNav />
                </div>
                {/* Component PurchaseHistory để hiển thị lịch sử mua hàng */}
                <div className="user-purchase-history-change-profile flex-1 border-l-2">
                    <PurchaseHistory />
                </div>
            </div>
        </div>
    );
};

export default UserPurchaseHistoryPage;
