// Import các thư viện và module cần thiết
import React from "react"; // Thư viện React
import { Button } from "antd"; // Thư viện Ant Design để tạo các thành phần giao diện
import { useSelector } from "react-redux"; // Hook để sử dụng Redux trong React
import { useNavigate } from "react-router-dom"; // Hook để điều hướng trong React Router
import { ROUTES } from "../constants/routes"; // Các hằng số định tuyến của ứng dụng
import PaymentTable from "../components/PaymentTable"; // Import component CardTable

const CartPage = () => {
  // Sử dụng hook useNavigate để điều hướng trang
  const navigate = useNavigate();
  // Lấy trạng thái giỏ hàng từ Redux store
  const { carts } = useSelector((state) => state.cart);
  // Lấy trạng thái đăng nhập từ Redux store
  const { isLogin } = useSelector((state) => state.user);

  // Hàm định dạng số theo dạng có dấu chấm ngăn cách hàng nghìn
  const formatNumber = (num) => {
    let numString = "";
    while (num > 0) {
      let div = num % 1000;
      num = Math.floor(num / 1000);
      if (num !== 0) {
        if (div < 10) {
          div = "00" + div;
        } else if (div < 100) {
          div = "0" + div;
        }
        numString = "." + div + numString;
      } else {
        numString = div + numString;
      }
    }
    return numString;
  };

  // Hàm tính tổng tiền trong hóa đơn
  const getTotalMoneyInBill = () => {
    // Sử dụng reduce để tính tổng tiền từ danh sách giỏ hàng
    const totalMoneyInBill = carts.reduce((total, cart) => {
      return total + parseFloat(cart.price) * cart.quantity;
    }, 0);
    return formatNumber(totalMoneyInBill); // Định dạng số và trả về
  };

  // Hàm xử lý khi người dùng nhấn nút "Proceed to checkout"
  const handleRedirectToCheckOut = () => {
    if (isLogin) {
      // Nếu người dùng đã đăng nhập
      navigate(ROUTES.ORDER_PAGE); // Điều hướng tới trang đặt hàng
    } else {
      navigate(ROUTES.LOGIN_PAGE); // Điều hướng tới trang đăng nhập
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page">
        <div className="cart-page-shop-table">
          <div className="cart-page-shop-table__shop-table-grp">
            {/* Hiển thị bảng giỏ hàng */}
            <PaymentTable />
          </div>

          <div className="cart-page-cart-totals">
            <div className="cart-page-cart-totals__cart-totals">
              <div className="cart-page-cart-totals__title">
                <h3>Cart totals</h3>
              </div>
              <table className="cart-page-cart-totals__car-totals-table">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>{getTotalMoneyInBill()}</td>
                  </tr>

                  <tr>
                    <td>Shipping</td>
                    <td>
                      <p>Shipping options will be updated during checkout.</p>
                    </td>
                  </tr>

                  <tr>
                    <td>Total</td>
                    <td>{getTotalMoneyInBill()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="cart-page-cart-totals__btn-proceed-to-checkout">
                <Button onClick={handleRedirectToCheckOut}>
                  Proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
