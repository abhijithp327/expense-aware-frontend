import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import { loginUser, signupUser } from '../redux/services/auth';
import { toast } from 'react-toastify';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    Wallet,
    TrendingUp,
    Shield,
    ArrowRight,
    CheckCircle,
    DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggle = () => setIsLogin(!isLogin);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = isLogin
                ? await loginUser({ email, password })
                : await signupUser({ email, password });

            if (res.status === 201 || res.status === 200) {
                dispatch(setAuth({
                    token: res.data.token,
                    user: res.data.user, 
                }));
                toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
                navigate('/');
            } else {
                toast.error(res);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        { icon: Wallet, text: "Smart Budget Management" },
        { icon: TrendingUp, text: "Expense Analytics" },
        { icon: Shield, text: "Secure & Private" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex">
            {/* Left Side - Features & Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan-300 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-300 rounded-full blur-lg"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">BudgetTracker</h1>
                            <p className="text-indigo-100 text-sm">Smart Financial Management</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Take Control of Your
                            <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                                Financial Future
                            </span>
                        </h2>
                        <p className="text-xl text-indigo-100 leading-relaxed">
                            Track expenses, set budgets, and achieve your financial goals with our intelligent expense tracking platform.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 space-y-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="p-2 bg-white/20 rounded-lg">
                                <feature.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-medium">{feature.text}</span>
                            <CheckCircle className="w-5 h-5 text-cyan-300 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                                <DollarSign className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                BudgetTracker
                            </h1>
                        </div>
                        <p className="text-gray-600">Smart Financial Management</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin
                                    ? 'Sign in to continue managing your finances'
                                    : 'Start your financial journey today'
                                }
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer group"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Toggle Auth Mode */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                                <button
                                    onClick={toggle}
                                    className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-all duration-200"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Shield className="w-4 h-4" />
                            <span>Your data is encrypted and secure</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;