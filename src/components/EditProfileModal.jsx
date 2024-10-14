
import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const EditProfileModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    return (
        <Modal
            title="Chỉnh sửa thông tin"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                layout="vertical"
                onFinish={onSubmit}
                initialValues={initialValues}
            >
                <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                    <Select placeholder="Chọn giới tính">
                        <Select.Option value="Male">Nam</Select.Option>
                        <Select.Option value="Female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                    <Button onClick={onCancel} className="ml-2">
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;
