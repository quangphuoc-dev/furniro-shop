import ProductItem from "../components/ProductItem";
import ProductInfo from "../components/ProductInfo";
import { useEffect } from "react";

function ProductDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <ProductItem />
            {/* <ProductInfo /> */}
        </div>
    );
}

export default ProductDetails;
