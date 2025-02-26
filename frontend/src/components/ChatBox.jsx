import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftCircleIcon, 
    PaperAirplaneIcon,
    UserCircleIcon,
    ComputerDesktopIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setLoading(true);
        
        try {
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    key: 'AIzaSyDS1TH2eBVBO3vdpP2lmCow0xO_Ph4KIPo'
                }
            });

            const aiResponse = response.data.candidates[0].content.parts[0].text;
            setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { text: 'Xin lỗi, có lỗi xảy ra.', isUser: false }]);
        } finally {
            setLoading(false);
        }
    };

    const backToDashboard = () => {
        navigate("/dashboard");
    };

    return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                        <div className="flex items-center justify-between">
                            <button 
                                onClick={backToDashboard}
                                className="flex items-center space-x-2 text-white hover:bg-blue-700/50 rounded-lg px-3 py-2 transition duration-200"
                            >
                                <ArrowLeftCircleIcon className="h-6 w-6" />
                                <span className="font-medium">Back</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <SparklesIcon className="h-6 w-6 text-yellow-300 animate-pulse" />
                                <h3 className="text-xl font-bold text-white">AI Chat Box</h3>
                            </div>
                        </div>
                    </div>
    
                    {/* Chat Messages */}
                    <div className="flex-1 h-[calc(100vh-280px)] overflow-y-auto bg-gray-50 p-4">
                        <div className="space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 py-8">
                                    <SparklesIcon className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                                    <p className="text-lg font-medium">Bắt đầu cuộc trò chuyện với AI</p>
                                    <p className="text-sm">Hãy đặt câu hỏi hoặc chia sẻ điều bạn muốn</p>
                                </div>
                            )}
                            
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    {!message.isUser && (
                                        <ComputerDesktopIcon className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-1" />
                                    )}
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                            message.isUser
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                        } shadow-sm`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>
                                    {message.isUser && (
                                        <UserCircleIcon className="h-8 w-8 text-blue-600" />
                                    )}
                                </div>
                            ))}
                            
                            {loading && (
                                <div className="flex items-center space-x-2">
                                    <ComputerDesktopIcon className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-1" />
                                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
    
                    {/* Input Form */}
                    <div className="p-4 bg-white border-t">
                        <form onSubmit={sendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Nhập tin nhắn của bạn..."
                                className="flex-1 border-2 border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-blue-500 transition duration-200"
                            />
                            <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed group"
                                    >
                                        <span className="font-medium">Gửi</span>
                                        <PaperAirplaneIcon className="h-5 w-5 transform rotate-270 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
            
                            {/* Quick Prompts */}
                            <div className="p-4 bg-gray-50 border-t">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setInput("Giải thích về AI là gì?")}
                                        className="text-sm bg-white hover:bg-blue-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200 transition duration-200"
                                    >
                                        Giải thích về AI
                                    </button>
                                    <button
                                        onClick={() => setInput("Làm thế nào để học lập trình?")}
                                        className="text-sm bg-white hover:bg-blue-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200 transition duration-200"
                                    >
                                        Học lập trình
                                    </button>
                                    <button
                                        onClick={() => setInput("Cho tôi một số tips về productivity")}
                                        className="text-sm bg-white hover:bg-blue-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200 transition duration-200"
                                    >
                                        Tips productivity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }