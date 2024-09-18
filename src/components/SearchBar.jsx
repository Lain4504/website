import React from 'react';
import { assets } from '../assets/assets';

const SearchBar = ({ showSearch, setShowSearch }) => {

    return showSearch ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <form className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Search' 
                />
                <img src={assets.search_icon} className='w-4' alt="Search Icon" />
            </form>
            <img 
                onClick={() => setShowSearch(false)} 
                src={assets.cross_icon} 
                className='inline w-3 cursor-pointer' 
                alt='Close Icon' 
            />
        </div>
    ) : null;
}

export default SearchBar;
