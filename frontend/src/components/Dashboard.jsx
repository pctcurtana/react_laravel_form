import { useState, useEffect } from 'react'
import axios from 'axios'
import { CogIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/solid'
import { UserGroupIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'

export default function Dashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [editUsername, setEditUsername] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        // Lấy thông tin user từ localStorage khi component mount
        const user = localStorage.getItem('user')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users')
            setUsers(response.data)
            setLoading(false)
        } catch (err) {
            setError('Không thể tải danh sách người dùng')
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            return
        }

        setDeleteLoading(true)
        try {
            const response = await axios.delete(`/api/users/${userId}`)
            if (response.data.status === 'success') {
                // Cập nhật lại danh sách users sau khi xóa
                setUsers(users.filter(user => user.id !== userId))
                alert('Xóa người dùng thành công')
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Có lỗi xảy ra khi xóa người dùng')
        } finally {
            setDeleteLoading(false)
        }
    }
    //hàm xử lý edit
    const handleEditClick = (user) => {
        setEditingUser(user)
        setEditUsername(user.username)
    }

    const handleCancelEdit = () => {
        setEditingUser(null)
        setEditUsername('')
    }

    const handleUpdateUser = async (userId) => {
        setUpdateLoading(true)
        try {
            const response = await axios.put(`/api/users/${userId}`, {
                username: editUsername
            })
            
            if (response.data.status === 'success') {
                // Cập nhật danh sách users
                setUsers(users.map(user => 
                    user.id === userId 
                        ? { ...user, username: editUsername }
                        : user
                ))
                setEditingUser(null)
                alert('Cập nhật thông tin thành công')
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin')
        } finally {
            setUpdateLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <CogIcon className='flex items-center h-15 w-15'  />
                                Quản lý tài khoản
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4 flex items-center">
                                <UserIcon className="h-5 w-5 text-gray-400 mr-px" />
                                
                                Xin chào, {currentUser?.username || 'User'} 
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                                <UserGroupIcon className='h-10 w-10'/>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Tổng số người dùng</p>
                                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6 ">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                            Danh sách người dùng
                        </h3>
                    </div>
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tên
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày tạo
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUser?.id === user.id ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            value={editUsername}
                                                            onChange={(e) => setEditUsername(e.target.value)}
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                            placeholder="Nhập tên mới"
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateUser(user.id)}
                                                            disabled={updateLoading}
                                                            className="text-green-600 hover:text-green-900"
                                                            title="Lưu"
                                                        >
                                                            <CheckCircleIcon className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="text-red-600 hover:text-gray-900"
                                                            title="Hủy"
                                                        >
                                                            <XCircleIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.username}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {editingUser?.id !== user.id && (
                                                    <>
                                                        <button 
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                            onClick={() => handleEditClick(user)}
                                                            title="Sửa"
                                                        >
                                                            <PencilSquareIcon className="inline-block h-5 w-5" />
                                                        </button>
                                                        <button 
                                                            className="text-red-600 hover:text-red-900"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            disabled={deleteLoading}
                                                            title="Xóa"
                                                        >
                                                            <TrashIcon className="inline-block h-5 w-5" />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}