import React, { useState } from "react";
import OurPolicy from "../components/homepage/OurPolicy";
import ListProduct from "../components/homepage/ListProduct";
import Carousel from "../components/homepage/Carousel";
import ListPost from "../components/homepage/ListPost";
import Title from "../components/shared/Title";
import Ads from "../components/homepage/Ads";

const Home = () => {
    const [activeTab, setActiveTab] = useState("new");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div>
                <Carousel />
                <OurPolicy />
                <hr />
                <ul className="hnt-tab flex justify-center space-x-4 text-center py-4">
                    <li className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "new" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600"} hover:scale-105`}>
                        <a onClick={() => handleTabClick("new")}>SÁCH MỚI</a>
                    </li>
                    <li className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "bestseller" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600"} hover:scale-105`}>
                        <a onClick={() => handleTabClick("bestseller")}>SÁCH BÁN CHẠY</a>
                    </li>
                    <li className={`item cursor-pointer transition-transform duration-300 ease-in-out ${activeTab === "hotdeals" ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600"} hover:scale-105`}>
                        <a onClick={() => handleTabClick("hotdeals")}>HOT DEALS</a>
                    </li>
                </ul>

                {activeTab === "new" && (
                    <ListProduct query="sorted-and-paged?sortBy=Id&page=0&size=10&sortOrder=desc" />
                )}
                {activeTab === "bestseller" && (
                    <ListProduct query="sorted-and-paged?sortBy=Sold&page=0&size=10&sortOrder=desc" />
                )}
                {activeTab === "hotdeals" && (
                    <ListProduct query="sorted-and-paged?sortBy=Discount&page=0&size=10&sortOrder=desc" />
                )}
            </div>
            <h1 className='text-center text-xl'>
                <Title text1={'BÀI VIẾT'} text2={'MỚI NHẤT'} />
            </h1>
            <ListPost />
            <Ads /> {/* Render the Ads component here */}
        </>
    );
}

export default Home;
