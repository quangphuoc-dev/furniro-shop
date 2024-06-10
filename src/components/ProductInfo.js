import ProInfo1 from "../assets/images/product-info-1.png";
import ProInfo2 from "../assets/images/product-info-2.png";

function ProductInfo() {
    return (
        <div className="border-t-2 border-b-2">
            <div className="product-info-title flex justify-center gap-[52px] mb-[36px] mt-[48px]">
                <span className="text-[24px] text-[#9f9f9f] font-[400]">
                    Description
                </span>
                <span className="text-[24px] text-[#9f9f9f] font-[400]">
                    Additional Information
                </span>
                <span className="text-[24px] text-[#9f9f9f] font-[400]">
                    Reviews [5]
                </span>
            </div>
            <div className="product-info mx-[210px]">
                <p className="text-[16px] text-[#9f9f9f] font-[400]">
                    Embodying the raw, wayward spirit of rock ‘n’ roll, the
                    Kilburn portable active stereo speaker takes the
                    unmistakable look and sound of Marshall, unplugs the chords,
                    and takes the show on the road.
                </p>
                <p className="text-[16px] text-[#9f9f9f] font-[400]">
                    Weighing in under 7 pounds, the Kilburn is a lightweight
                    piece of vintage styled engineering. Setting the bar as one
                    of the loudest speakers in its class, the Kilburn is a
                    compact, stout-hearted hero with a well-balanced audio which
                    boasts a clear midrange and extended highs for a sound that
                    is both articulate and pronounced. The analogue knobs allow
                    you to fine tune the controls to your personal preferences
                    while the guitar-influenced leather strap enables easy and
                    stylish travel.
                </p>
            </div>
            <div className="product-info-img flex  justify-center items-center gap-[29px] mt-[36px] mb-[66px]">
                <img
                    src={ProInfo1}
                    className="bg-[#f9f1e7] rounded-[10px] w-[605px] h-[348px]"
                    alt=""
                />
                <img
                    src={ProInfo2}
                    className="bg-[#f9f1e7] rounded-[10px] w-[605px] h-[348px] "
                    alt=""
                />
            </div>
        </div>
    );
}

export default ProductInfo;
