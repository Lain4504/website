import React from 'react';

const SelectAddress = ({ label, options = null, name, setValue, initialValue }) => {
    return (
        <div>
            <label>{label}</label>
            <select 
                name={name} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={initialValue} // Sử dụng value thay vì defaultValue để cập nhật theo state
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">--{label}--</option>
                {options?.map(option => (
                    <option key={option.code} value={option.code}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectAddress;
