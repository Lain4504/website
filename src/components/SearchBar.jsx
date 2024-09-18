import React, { useState, useEffect } from 'react'
import { getBooksBySearchValue } from '../services/BookService'

const SearchBar = ({ setResult }) => {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
        fetchData(e.target.value)
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchData(input);
        }, 300); 

        return () => {
            clearTimeout(delay);
        };
    }, [input]);

    const fetchData = (value) => {
        if (value === '') {
            setResult({})
            return
        }
        getBooksBySearchValue(value).then(res => {
            setResult(res.data)
        })
    }

    const redirectSearch = () => {
        if (input.trim()) {
            window.location.href = `/search/${input.trim()}`
        }
    }

    return (
        <div className="relative flex items-center">
            <input 
                type="text" 
                onChange={handleChange} 
                value={input} 
                className="form-input py-2 px-4 rounded-l-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"
                aria-label="Search" 
                aria-describedby="search-addon" 
            />
            <button 
                onClick={redirectSearch} 
                className="absolute right-0 rounded-r-md bg-blue-500 text-white p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <i className="fas fa-search"></i>
            </button>
        </div>
    )
}

export default SearchBar
