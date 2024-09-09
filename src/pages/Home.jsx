import React, { useState } from "react";
import OurPolicy from "../components/OurPolicy";
import Slider from "../components/Slider";
import ListProduct from "../components/ListProduct";

const Home = () => {
    const [activeTab, setActiveTab] = useState("new"); // Default tab: "new"

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Update current tab state
    };

    return (
        <>
            <div>
                <Slider />
                <OurPolicy />
                {/* Tab Menu */}
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

                {/* Content base current tab*/}
                {activeTab === "new" && (
                    <ListProduct title="SÁCH MỚI" query="sorted-and-paged?sortBy=id&page=1&size=10&sortOrder=desc" /> // remove title
                )}
                {activeTab === "bestseller" && (
                    <ListProduct title="SÁCH BÁN CHẠY" query="sorted-and-paged?sortBy=sold&page=0&size=10&sortOrder=desc" /> 
                )}
                {activeTab === "hotdeals" && (
                    <ListProduct title="HOT DEALS" query="sorted-and-paged?sortBy=discount&page=0&size=10&sortOrder=desc" />
                )}
            </div>
        </>
    );
}

export default Home;
