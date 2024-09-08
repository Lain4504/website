import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('ĐĂNG NHẬP');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Xử lý đăng nhập/đăng ký tại đây
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {currentState}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mật khẩu
                </label>
                {currentState === 'ĐĂNG NHẬP' && (
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Quên mật khẩu?
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {currentState === 'ĐĂNG KÝ' && (
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {currentState === 'ĐĂNG NHẬP' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {currentState === 'ĐĂNG NHẬP' ? (
              <>
                Chưa có tài khoản?{' '}
                <span
                  onClick={() => setCurrentState('ĐĂNG KÝ')}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Đăng ký ngay
                </span>
              </>
            ) : (
              <>
                Đã có tài khoản?{' '}
                <span
                  onClick={() => setCurrentState('ĐĂNG NHẬP')}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Đăng nhập tại đây
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
