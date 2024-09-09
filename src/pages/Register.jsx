import React, { useState } from 'react';
import { createAccount } from '../services/UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Register = ({ setCookies }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }

        if (!data.email || !data.password) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        let account = { email: data.email, password: data.password };
        createAccount(account)
            .then(res => {
                toast.success('Đăng ký thành công! Kiểm tra email để xác nhận tài khoản.');
                window.location.href = '/check-email';
            })
            .catch(err => {
                toast.error('Tài khoản đã tồn tại hoặc có lỗi xảy ra.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        ĐĂNG KÝ
                    </h2>
                </div>
                <hr className="my-4 w-1/2 mx-auto border-t-2 border-gray-300" />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Địa chỉ email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mật khẩu
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Xác nhận mật khẩu
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Đã có tài khoản?
                        <Link to='/login'>
                            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                Đăng nhập tại đây
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
