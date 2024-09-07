import React from "react";
import { assets } from "../assets/assets";

const SearchBar = () => {
    return (
        <div className="flex items-center rounded-full bg-white border border-gray-300 p-2">
            <input
                type="text"
                className="flex-1 outline-none bg-transparent px-2"
                placeholder="Search"
            />
            <button className="flex items-center justify-center text-gray-600 hover:text-gray-800 ">
                <img src={assets.search_icon} className='w-4' alt="" />
            </button>
        </div>
    )
}
export default SearchBar;
