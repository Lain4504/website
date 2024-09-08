import React, { useState, useEffect, useRef } from 'react';

const CollectionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex flex-col items-center gap-1 text-gray-900'
      >
        SẢN PHẨM
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div className='absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg'>
          <div className='py-1'>
            <a href="#" className='block px-4 py-2 text-sm text-black hover:bg-gray-100'>Toàn bộ danh mục</a>
          </div>
          <ul className='py-2 text-sm text-black'>
            <li>
              <a href="#" className='block px-4 py-2 hover:bg-gray-100'>Dashboard</a>
            </li>
            <li>
              <a href="#" className='block px-4 py-2 hover:bg-gray-100'>Settings</a>
            </li>
            <li>
              <a href="#" className='block px-4 py-2 hover:bg-gray-100'>Earnings</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollectionList;
