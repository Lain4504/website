import React, { useState, useEffect, useRef } from 'react';
import { getCollections } from "../services/CollectionService"
import { Link } from "react-router-dom";

const CollectionList = ({ closeMenu }) => {
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
          <Link to={`/collections/all`} className="py-1" onClick={closeMenu}>
            <a href="#" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">Toàn bộ danh mục</a>
          </Link>
          {collections?.map((collection) => {
            if (collection.isDisplay) {
              return (
                <Link
                  to={`/collections/${collection.id}`}
                  key={collection.id}
                  className="py-2 text-sm text-black"
                  onClick={closeMenu} // Thêm sự kiện đóng menu chính
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
