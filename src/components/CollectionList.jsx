import React, { useState, useEffect, useRef } from 'react';
import { getCollections } from "../services/CollectionService"
import { Link } from "react-router-dom";

const CollectionList = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => {
    setIsOpen(false); // Đóng menu khi một mục được chọn
    if (closeMenu) {
      closeMenu(); // Đóng luôn menu chính (nếu có)
    }
  };

  const [collections, setCollections] = useState([]);

  const fetchData = () => {
    getCollections()
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections data: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex flex-col items-center gap-1 text-gray-900"
      >
        SẢN PHẨM
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
          <Link to={`/collections/all`} className="py-1" onClick={closeDropdown}>
            <a href="#" className="block px-4 py-2 text-sm border-b border-gray-200 text-black hover:bg-gray-100">TOÀN BỘ SẢN PHẨM</a>
          </Link>
          {collections?.map((collection) => {
            if (collection.isDisplay) {
              return (
                <Link
                  to={`/collections/${collection.id}`}
                  key={collection.id}
                  className="py-2 text-sm text-black"
                  onClick={closeDropdown} // Gọi hàm đóng menu khi chọn mục
                >
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">{collection.name}</a>
                </Link>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionList;
