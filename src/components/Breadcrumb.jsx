import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <AntdBreadcrumb className="ml-4 mb-4">
            {items.map((item, index) => (
                <AntdBreadcrumb.Item key={index} className="breadcrumb-item">
                    {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
                </AntdBreadcrumb.Item>
            ))}
        </AntdBreadcrumb>
    );
};

export default Breadcrumb;
