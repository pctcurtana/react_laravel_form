import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine, RiDeleteBinLine, RiCloseCircleFill, RiCheckFill, RiAccountBox2Line } from 'react-icons/ri'
import { BiErrorCircle } from 'react-icons/bi'
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

// Tạo object Icons trước khi export
const Icons = {
    MdEmail,
    RiLockPasswordLine,RiCloseCircleFill, RiCheckFill,RiAccountBox2Line,
    BiErrorCircle,
    AiOutlineCheckCircle,
    AiOutlineLoading3Quarters,
    FaUser,
    HiUsers,
    FiEdit,
    RiDeleteBinLine
}
export { Icons }

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'))

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    )
}

export default App