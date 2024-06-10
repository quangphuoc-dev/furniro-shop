import ProductItem from "../components/ProductItem";
import { useEffect } from "react";
import QualityDefault from "../components/QualityDefault";

function ProductDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <ProductItem />
            <QualityDefault />
        </div>
    );
}

export default ProductDetails;
