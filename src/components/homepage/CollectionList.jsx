import React, { useState, useEffect, useRef } from 'react';
import { getCollections } from "../../services/CollectionService";
import { Link } from "react-router-dom";

const CollectionList = ({ onSelectCollection, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closeDropdown = (collectionId) => {
    setIsOpen(false);
    if (onSelectCollection) {
      onSelectCollection(collectionId);
    }
    if (closeMenu) {
      closeMenu(); // Gọi hàm đóng Navbar từ component cha
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1 text-gray-900 nav-link"
      >
        SẢN PHẨM
      </button>
      <div className={`absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-20 font-light ${isOpen ? 'block' : 'hidden'}`}>
        <Link to={`/collections/all`} className="block px-4 py-2 text-sm text-black hover:bg-gray-100" onClick={() => closeDropdown('all')}>
          TOÀN BỘ SẢN PHẨM
        </Link>
        {collections?.map((collection) => (
          collection.isDisplay && (
            <Link
              to={`/collections/${collection.id}`}
              key={collection.id}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
              onClick={() => closeDropdown(collection.id)}
            >
              {collection.name}
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
