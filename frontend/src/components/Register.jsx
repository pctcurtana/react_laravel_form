import { useState } from 'react'
import axios from 'axios'
import { Icons } from '../App'

export default function Register() {
    const [username, setuserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp')
        setLoading(false)
        return
    }

    try {
        const response = await axios.post('/api/register', {
            username,
            email,
            password
        })
        
        if (response.data.status === 'success') {
            setSuccess('Đăng ký thành công!')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
    } catch (err) {
        if (err.response?.data?.errors) {
            // Hiển thị tất cả các lỗi validation
            const errorMessages = Object.values(err.response.data.errors).flat()
            setError(errorMessages.join('\n'))
        } else {
            setError(err.response?.data?.message || 'Có lỗi xảy ra')
        }
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        Tạo tài khoản mới
                    </h2>
                    <p className="text-sm text-gray-500">
                        Vui lòng điền thông tin đăng ký
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        {/* Name field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icons.FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setuserName(e.target.value)}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                    
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Địa chỉ email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icons.MdEmail className="h-5 w-5 text-gray-400" />

                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                    
                                />
                            </div>
                        </div>

                        {/* Password fields */}
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Icons.RiLockPasswordLine className="h-5 w-5 text-gray-400" />

                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                        
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Xác nhận mật khẩu
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Icons.RiLockPasswordLine className="h-5 w-5 text-gray-400" />

                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error and Success messages */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 flex items-center">
                            <Icons.RiCloseCircleFill className="w-5 h-5 mr-2 text-red-500" />
                            <pre>{error}</pre>
                        </div>
                    )}

                    {success && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 flex items-center">
                            <Icons.RiCheckFill className="w-5 h-5 mr-2 text-green-500" />
                            <pre>{success}</pre>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                            ${loading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } transition-all duration-150 ease-in-out`}
                    >
                        {loading && (
                            <Icons.AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />

                        )}
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Đăng nhập
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}