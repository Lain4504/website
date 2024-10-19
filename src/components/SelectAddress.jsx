import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectAddress = ({ label, options = null, name, setValue, setName }) => {
    const handleSelectChange = (value, option) => {
        setName(option.props['data-name']);
        setValue(value);
    };

    return (
        <div>
            <Select 
                name={name} 
                placeholder={`--${label}--`} 
                onChange={handleSelectChange} 
                className="w-full" // Optional: Tailwind CSS for width
            >
                {options?.map(option => (
                    <Option key={option?.codename} data-name={option.name} value={option.code}>
                        {option?.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SelectAddress;
