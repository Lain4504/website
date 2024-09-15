// SearchPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BooksBySearch from './BookBySearch';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    useEffect(() => {
        // Synchronize search query with URL parameter
        setSearchParams({ q: searchQuery });
    }, [searchQuery, setSearchParams]);

    return (
        <div>
            <SearchBar 
                search={searchQuery} 
                setSearch={setSearchQuery} 
                showSearch={true} 
                setShowSearch={() => {}}
            />
            <BooksBySearch searchQuery={searchQuery} />
        </div>
    );
}

export default SearchPage;
