import React, { useState } from 'react'
import Breadcrumb from './Breadcrumb'
import { useParams } from 'react-router-dom'
// import { activateAccount } from '../services/UserService'
import { Button, message } from 'antd'

const Activate = () => {
    const token = useParams()
    const [error, setError] = useState(false)
    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Active' }
    ]

    const activate = () => {
        activateAccount(token)
            .then(() => {
                message.success('Tài khoản đã được kích hoạt thành công!')
                window.location.href = '/login'
            })
            .catch(() => {
                setError(true)
                message.error('Kích hoạt tài khoản thất bại!')
            })
    }

    return (
        <div>
            <Breadcrumb items={breadcrumbs} />
            <div className='flex justify-center items-center'>
                <div className='md:w-1/2 lg:w-1/3 text-center'>
                    <Button
                        type='primary'
                        className='mt-5 mb-5'
                        onClick={activate}
                    >
                        Kích hoạt
                    </Button>
                    {error && (
                        <p className='text-red-500 text-center'>
                            Kích hoạt tài khoản thất bại!
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Activate
