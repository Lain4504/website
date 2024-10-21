import React, { useState, useEffect, useRef } from 'react';
import { getCollections } from "../services/CollectionService";
import { Link } from "react-router-dom";

const CollectionList = ({ closeMenu }) => {
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

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false); // Reset dropdown on resize
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false); // Close dropdown when an item is selected
    if (closeMenu) {
      closeMenu(); // Also close main menu if it exists
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1 text-gray-900 nav-link" // Add the nav-link class here
      >
        SẢN PHẨM
      </button>
      <div className={`absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg font-light z-20 dropdown-content ${isOpen ? 'open' : ''}`}>
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
                onClick={closeDropdown} // Close dropdown when an item is selected
              >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">{collection.name}</a>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default CollectionList;
