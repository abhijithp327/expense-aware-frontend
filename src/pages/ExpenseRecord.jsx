import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Search, 
    Filter, 
    Calendar,
    DollarSign,
    Receipt,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Download,
    SortAsc,
    SortDesc
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// Dummy expense data
const dummyExpenses = [
    {
        id: 1,
        title: 'Grocery Shopping',
        amount: 2500,
        category: 'Food & Dining',
        categoryColor: '#10B981',
        date: '2024-06-14',
        description: 'Weekly grocery shopping at Big Bazaar',
        paymentMethod: 'Credit Card',
        receipt: true,
        tags: ['groceries', 'weekly']
    },
    {
        id: 2,
        title: 'Fuel',
        amount: 3000,
        category: 'Transportation',
        categoryColor: '#F59E0B',
        date: '2024-06-13',
        description: 'Petrol fill-up',
        paymentMethod: 'Cash',
        receipt: false,
        tags: ['fuel', 'car']
    },
    {
        id: 3,
        title: 'Movie Tickets',
        amount: 800,
        category: 'Entertainment',
        categoryColor: '#8B5CF6',
        date: '2024-06-12',
        description: 'Movie night with friends',
        paymentMethod: 'UPI',
        receipt: true,
        tags: ['movies', 'entertainment']
    },
    {
        id: 4,
        title: 'Electricity Bill',
        amount: 1500,
        category: 'Utilities',
        categoryColor: '#EF4444',
        date: '2024-06-11',
        description: 'Monthly electricity bill payment',
        paymentMethod: 'Net Banking',
        receipt: true,
        tags: ['bills', 'utilities']
    },
    {
        id: 5,
        title: 'Restaurant Dinner',
        amount: 1200,
        category: 'Food & Dining',
        categoryColor: '#10B981',
        date: '2024-06-10',
        description: 'Dinner at Italian restaurant',
        paymentMethod: 'Credit Card',
        receipt: true,
        tags: ['dining', 'restaurant']
    },
    {
        id: 6,
        title: 'Online Shopping',
        amount: 4500,
        category: 'Shopping',
        categoryColor: '#06B6D4',
        date: '2024-06-09',
        description: 'Clothes and electronics from Amazon',
        paymentMethod: 'Debit Card',
        receipt: true,
        tags: ['shopping', 'online']
    },
    {
        id: 7,
        title: 'Gym Membership',
        amount: 2000,
        category: 'Health & Fitness',
        categoryColor: '#84CC16',
        date: '2024-06-08',
        description: 'Monthly gym membership fee',
        paymentMethod: 'UPI',
        receipt: true,
        tags: ['fitness', 'subscription']
    },
    {
        id: 8,
        title: 'Medical Checkup',
        amount: 3500,
        category: 'Healthcare',
        categoryColor: '#F97316',
        date: '2024-06-07',
        description: 'Annual health checkup',
        paymentMethod: 'Cash',
        receipt: true,
        tags: ['health', 'medical']
    },
    {
        id: 9,
        title: 'Book Purchase',
        amount: 600,
        category: 'Education',
        categoryColor: '#6366F1',
        date: '2024-06-06',
        description: 'Programming books from Flipkart',
        paymentMethod: 'Credit Card',
        receipt: true,
        tags: ['books', 'education']
    },
    {
        id: 10,
        title: 'Coffee',
        amount: 150,
        category: 'Food & Dining',
        categoryColor: '#10B981',
        date: '2024-06-05',
        description: 'Morning coffee at Starbucks',
        paymentMethod: 'Cash',
        receipt: false,
        tags: ['coffee', 'morning']
    }
];

const ExpenseRecords = () => {
    const [expenses, setExpenses] = useState(dummyExpenses);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [dateRange, setDateRange] = useState('all');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshData = React.useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    // Get unique categories and payment methods
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const paymentMethods = [...new Set(expenses.map(expense => expense.paymentMethod))];

    // Filter and sort expenses
    const filteredExpenses = expenses
        .filter(expense => {
            const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                expense.category.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
            const matchesPaymentMethod = selectedPaymentMethod === 'all' || expense.paymentMethod === selectedPaymentMethod;
            
            let matchesDateRange = true;
            if (dateRange !== 'all') {
                const expenseDate = new Date(expense.date);
                const today = new Date();
                const daysDiff = Math.floor((today - expenseDate) / (1000 * 60 * 60 * 24));
                
                switch (dateRange) {
                    case 'today':
                        matchesDateRange = daysDiff === 0;
                        break;
                    case 'week':
                        matchesDateRange = daysDiff <= 7;
                        break;
                    case 'month':
                        matchesDateRange = daysDiff <= 30;
                        break;
                    default:
                        matchesDateRange = true;
                }
            }
            
            return matchesSearch && matchesCategory && matchesPaymentMethod && matchesDateRange;
        })
        .sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'amount':
                    aValue = a.amount;
                    bValue = b.amount;
                    break;
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'category':
                    aValue = a.category.toLowerCase();
                    bValue = b.category.toLowerCase();
                    break;
                default: // date
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    // Calculate statistics
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
    const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(e => e.amount)) : 0;

    const handleEdit = (expenseId) => {
        console.log('Edit expense:', expenseId);
    };

    const handleDelete = (expenseId) => {
        console.log('Delete expense:', expenseId);
    };

    const handleView = (expenseId) => {
        console.log('View expense:', expenseId);
    };

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    return (
        <DashboardLayout 
            title="Expense Records" 
            description="Track and manage all your expenses"
            showMonthFilter={true}
            onRefresh={refreshData}
        >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Expenses</p>
                                <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="text-xs text-blue-100">This period</span>
                                </div>
                            </div>
                            <DollarSign className="w-8 h-8 text-blue-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Records</p>
                                <p className="text-2xl font-bold">{filteredExpenses.length}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Receipt className="w-4 h-4" />
                                    <span className="text-xs text-green-100">Filtered results</span>
                                </div>
                            </div>
                            <Receipt className="w-8 h-8 text-green-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Average Expense</p>
                                <p className="text-2xl font-bold">₹{Math.round(averageExpense).toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs text-purple-100">Per transaction</span>
                                </div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-purple-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Highest Expense</p>
                                <p className="text-2xl font-bold">₹{highestExpense.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="text-xs text-orange-100">Single transaction</span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-8 h-8 text-orange-200" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Actions */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search expenses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            {/* Payment Method Filter */}
                            <select
                                value={selectedPaymentMethod}
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Payment Methods</option>
                                {paymentMethods.map(method => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>

                            {/* Date Range Filter */}
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Expense
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Expense Records Table */}
            <Card className="shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">Expense Records</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <button
                                            onClick={() => toggleSort('title')}
                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Expense
                                            {sortBy === 'title' && (
                                                sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        <button
                                            onClick={() => toggleSort('category')}
                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Category
                                            {sortBy === 'category' && (
                                                sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        <button
                                            onClick={() => toggleSort('amount')}
                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Amount
                                            {sortBy === 'amount' && (
                                                sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        <button
                                            onClick={() => toggleSort('date')}
                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Date
                                            {sortBy === 'date' && (
                                                sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Receipt
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredExpenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{expense.description}</div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {expense.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: expense.categoryColor }}
                                                />
                                                <span className="text-sm text-gray-900">{expense.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">
                                                {new Date(expense.date).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                {expense.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                expense.receipt 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {expense.receipt ? 'Available' : 'Not Available'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => handleView(expense.id)}
                                                    className="p-1 hover:bg-blue-100 rounded-md transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-blue-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(expense.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                                    title="Edit Expense"
                                                >
                                                    <Edit2 className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(expense.id)}
                                                    className="p-1 hover:bg-red-100 rounded-md transition-colors"
                                                    title="Delete Expense"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredExpenses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <Receipt className="w-16 h-16 mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">No Expenses Found</h3>
                            <p className="text-center mb-4">
                                {searchTerm || selectedCategory !== 'all' || selectedPaymentMethod !== 'all' || dateRange !== 'all'
                                    ? "No expenses match your current filters. Try adjusting your search criteria."
                                    : "You haven't recorded any expenses yet. Add your first expense to get started."
                                }
                            </p>
                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Expense
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default ExpenseRecords;