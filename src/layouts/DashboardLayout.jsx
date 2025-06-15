import React, { useState } from 'react';
import {
    DollarSign,
    LogOut,
    Wallet,
    Plus,
    Settings,
    Bell,
    User,
    Menu,
    X,
    Target,
    Calendar,
    Folder,
    FileText,
    PiggyBank,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import AddBudgetModal from '../components/modals/AddBudgetModal';
import AddExpenseModal from '../components/modals/AddExpenseModal';

const DashboardLayout = ({ children, title, description, showMonthFilter = false, onRefresh }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const [month, setMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
    const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("User Logged Out Successfully");
    };

    const handleRefresh = () => {
        if (onRefresh) {
            onRefresh();
        }
    };

    const sidebarItems = [
        { 
            icon: Wallet, 
            label: 'Dashboard', 
            path: '/',
            onClick: () => navigate('/')
        },
        { 
            icon: Plus, 
            label: 'Add Budget', 
            onClick: () => setBudgetDialogOpen(true) 
        },
        { 
            icon: Target, 
            label: 'Add Expense', 
            onClick: () => setExpenseDialogOpen(true) 
        },
        { 
            icon: Folder, 
            label: 'Categories', 
            path: '/categories',
            onClick: () => navigate('/categories') 
        },
        { 
            icon: FileText, 
            label: 'Budget Records',
            path: '/budget-records',
            onClick: () => navigate('/budget-records')
        },
        { 
            icon: PiggyBank, 
            label: 'Expense Records',
            path: '/expense-records',
            onClick: () => navigate('/expense-records')
        },
        { 
            icon: LogOut, 
            label: 'Logout', 
            onClick: handleLogout 
        }
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-50 w-64 h-screen bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">BudgetTracker</h1>
                            <p className="text-xs text-indigo-100">Smart Financial Management</p>
                        </div>
                    </div>
                    <button
                        className="md:hidden absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600/5 to-purple-600/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item, index) => {
                        const isActive = item.path && location.pathname === item.path;
                        return (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
                                }`}
                                onClick={item.onClick || (() => {})}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-hidden">
                {/* Top Header */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        {title}
                                    </h2>
                                    {description && (
                                        <p className="text-sm text-gray-600">{description}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {showMonthFilter && (
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <input
                                            type="month"
                                            value={month}
                                            onChange={(e) => {
                                                setMonth(e.target.value);
                                                // Trigger refresh if callback provided
                                                if (onRefresh) {
                                                    setTimeout(() => onRefresh(e.target.value), 100);
                                                }
                                            }}
                                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                    <Bell className="w-5 h-5 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                    {children}
                </div>
            </main>

            {/* Modals */}
            <AddCategoryModal
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                onSuccess={handleRefresh}
            />

            <AddBudgetModal
                dialogOpen={budgetDialogOpen}
                setDialogOpen={setBudgetDialogOpen}
                onSuccess={handleRefresh}
            />

            <AddExpenseModal
                dialogOpen={expenseDialogOpen}
                setDialogOpen={setExpenseDialogOpen}
                onSuccess={handleRefresh}
            />
        </div>
    );
};

export default DashboardLayout;