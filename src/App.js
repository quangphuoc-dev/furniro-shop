import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/DefaultLayout";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserPurchaseHistoryPage from "./pages/UserPurchaseHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPasswordPage from "./pages/UserPasswordPage";
import { GlobalHistory } from "./utils/globalHistory";
import { ROUTES } from "./constants/routes";
import CheckOutPage from "./pages/CheckOutPage";
import OrderPage from "./pages/OrderPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

function App() {
    return (
        <BrowserRouter>
            <GlobalHistory />
            <Routes>
                <Route element={<Layout />}>
                    <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
                    <Route
                        path={ROUTES.PRODUCT_PAGE}
                        element={<ProductPage />}
                    />
                    <Route
                        path={ROUTES.DETAIL_PRODUCT_PAGE}
                        element={<ProductDetails />}
                    />
                    <Route path={ROUTES.CART_PAGE} element={<CartPage />} />
                    <Route
                        path={ROUTES.CHECK_OUT_PAGE}
                        element={<CheckOutPage />}
                    />
                    <Route
                        path={ROUTES.USER_PROFILE_PAGE}
                        element={<UserProfilePage />}
                    />
                    <Route
                        path={ROUTES.USER_PASSWORD_PAGE}
                        element={<UserPasswordPage />}
                    />
                    <Route
                        path={ROUTES.USER_PURCHASE_HISTORY_PAGE}
                        element={<UserPurchaseHistoryPage />}
                    />
                    <Route path={ROUTES.ORDER_PAGE} element={<OrderPage />} />
                    <Route path={ROUTES.BLOG_PAGE} element={<BlogPage />} />
                    <Route
                        path={ROUTES.CONTACT_PAGE}
                        element={<ContactPage />}
                    />
                </Route>
                <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER_PAGE} element={<RegisterPage />} />
                <Route path="/" element={<Navigate to={ROUTES.HOME_PAGE} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
