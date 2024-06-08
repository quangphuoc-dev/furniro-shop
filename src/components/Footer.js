import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function Footer() {
    return (
        <footer className="px-[10px] sm:px-[30px] md:px-[50px] lg:px-[100px] py-[10px] sm:py-[20px] md:py-[30px] lg:py-[40px] border-t-4">
            <div className="flex flex-col text-left">
                <div className="basis-1/3 my-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        <div className="">
                            <a
                                href={ROUTES.HOME_PAGE}
                                className="font-[700] text-[24px] text-[#000000] block mb-[32px]"
                            >
                                Furniro.
                            </a>
                            <p className="text-[16px] text-[#9f9f9f] text-[400]">
                                400 University Drive Suite 200 Coral <br />{" "}
                                Gables,
                                <br />
                                FL 33134 USA
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <a
                                href={ROUTES.HOME_PAGE}
                                className="font-[500] text-[16px] text-[#9f9f9f] block mb-[32px] "
                            >
                                Link
                            </a>
                            <ul className="">
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    <Link to={ROUTES.HOME_PAGE}>Home</Link>
                                </li>
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    <Link to={ROUTES.PRODUCT_PAGE}>
                                        Product
                                    </Link>
                                </li>
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    <Link to={ROUTES.BLOG_PAGE}>Blog</Link>
                                </li>
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    <Link to={ROUTES.CONTACT_PAGE}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <a
                                href={ROUTES.HOME_PAGE}
                                className="font-[500] text-[16px] text-[#9f9f9f] block mb-[32px]"
                            >
                                Help
                            </a>
                            <ul className="">
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    Payment Options
                                </li>
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    Returns
                                </li>
                                <li className="text-[16px] text-[#000000] font-[500] mb-[45px]">
                                    Privacy Policies
                                </li>
                            </ul>
                        </div>
                        <div>
                            <a
                                href={ROUTES.HOME_PAGE}
                                className="font-[500] text-[16px] text-[#9f9f9f] block mb-[32px]"
                            >
                                Newsletter
                            </a>
                            <div className="flex">
                                <input
                                    className="border-b-4 mr-[40px]"
                                    placeholder="Enter Your Email Address"
                                />
                                <p>
                                    <span className="border-b-4 uppercase">
                                        Subcribe
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-[16px] text-[#000000] font-[400] py-5 text-left border-t-4">
                    2024 furino. All rights reverved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
