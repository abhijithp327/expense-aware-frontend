import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Plus,
    Edit2,
    Trash2,
    Filter,
    Search,
    ChevronDown,
    ChevronUp,
    ArrowUpDown,
    Calendar,
    Wallet,
    TrendingUp,
    TrendingDown,
    Circle
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

// Dummy data for budget records
const budgetRecords = [
    {
        id: 1,
        category: 'Groceries',
        amount: 5000,
        type: 'Monthly',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        status: 'Active',
        color: '#4f46e5',
        spent: 4200,
        remaining: 800
    },
    {
        id: 2,
        category: 'Entertainment',
        amount: 2000,
        type: 'Weekly',
        startDate: '2023-01-01',
        endDate: '2023-01-07',
        status: 'Completed',
        color: '#10b981',
        spent: 2100,
        remaining: -100
    },
    {
        id: 3,
        category: 'Transportation',
        amount: 3000,
        type: 'Monthly',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        status: 'Active',
        color: '#f59e0b',
        spent: 1800,
        remaining: 1200
    },
    {
        id: 4,
        category: 'Dining Out',
        amount: 1500,
        type: 'Weekly',
        startDate: '2023-01-08',
        endDate: '2023-01-14',
        status: 'Upcoming',
        color: '#ef4444',
        spent: 0,
        remaining: 1500
    },
    {
        id: 5,
        category: 'Utilities',
        amount: 3500,
        type: 'Monthly',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        status: 'Active',
        color: '#8b5cf6',
        spent: 3200,
        remaining: 300
    },
    {
        id: 6,
        category: 'Shopping',
        amount: 2500,
        type: 'Monthly',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        status: 'Active',
        color: '#ec4899',
        spent: 3100,
        remaining: -600
    },
];

const BudgetRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'startDate', direction: 'desc' });
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedRecord, setExpandedRecord] = useState(null);

    const statusFilters = ['All', 'Active', 'Completed', 'Upcoming', 'Over Budget'];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedRecords = [...budgetRecords].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredRecords = sortedRecords.filter(record => {
        const matchesSearch = record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.type.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = activeFilter === 'All' || 
            (activeFilter === 'Active' && record.status === 'Active') ||
            (activeFilter === 'Completed' && record.status === 'Completed') ||
            (activeFilter === 'Upcoming' && record.status === 'Upcoming') ||
            (activeFilter === 'Over Budget' && record.remaining < 0);
        
        return matchesSearch && matchesFilter;
    });

    const toggleExpandRecord = (id) => {
        setExpandedRecord(expandedRecord === id ? null : id);
    };

    const handleEdit = (id) => {
        console.log('Edit budget record:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete budget record:', id);
    };

    return (
        <DashboardLayout 
            title="Budget Records" 
            description="View and manage your budget history"
        >
            {/* Header and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search budgets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Budget
                </button>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {statusFilters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all ${
                            activeFilter === filter
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {filter}
                        {filter === 'Over Budget' && (
                            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
                                {budgetRecords.filter(r => r.remaining < 0).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Budgets</p>
                                <p className="text-2xl font-bold">{budgetRecords.length}</p>
                            </div>
                            <Wallet className="w-8 h-8 text-indigo-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Active Budgets</p>
                                <p className="text-2xl font-bold">
                                    {budgetRecords.filter(r => r.status === 'Active').length}
                                </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Allocated</p>
                                <p className="text-2xl font-bold">
                                    ₹{budgetRecords.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                                </p>
                            </div>
                            <Circle className="w-8 h-8 text-blue-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-600 to-orange-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-amber-100 text-sm font-medium">Over Budget</p>
                                <p className="text-2xl font-bold">
                                    {budgetRecords.filter(r => r.remaining < 0).length}
                                </p>
                            </div>
                            <TrendingDown className="w-8 h-8 text-amber-200" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Records Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Budget History</CardTitle>
                    <CardDescription>
                        {filteredRecords.length} records found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('category')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Category
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('amount')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Amount
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('type')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Type
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('startDate')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Period
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Status
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((record) => (
                                        <React.Fragment key={record.id}>
                                            <tr 
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => toggleExpandRecord(record.id)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div 
                                                            className="w-3 h-3 rounded-full mr-2"
                                                            style={{ backgroundColor: record.color }}
                                                        />
                                                        <div className="font-medium text-gray-900">
                                                            {record.category}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 font-medium">
                                                        ₹{record.amount.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        record.type === 'Monthly' 
                                                            ? 'bg-indigo-100 text-indigo-800' 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {record.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        record.status === 'Active' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : record.status === 'Completed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(record.id);
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(record.id);
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleExpandRecord(record.id);
                                                            }}
                                                            className="text-gray-600 hover:text-gray-900"
                                                        >
                                                            {expandedRecord === record.id ? (
                                                                <ChevronUp className="w-4 h-4" />
                                                            ) : (
                                                                <ChevronDown className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedRecord === record.id && (
                                                <tr className="bg-gray-50">
                                                    <td colSpan="6" className="px-6 py-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Budget Progress</h4>
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                    <div 
                                                                        className={`h-2.5 rounded-full ${
                                                                            (record.spent / record.amount) > 1 
                                                                                ? 'bg-red-500' 
                                                                                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                                        }`}
                                                                        style={{ 
                                                                            width: `${Math.min((record.spent / record.amount) * 100, 100)}%` 
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="flex justify-between text-sm mt-1">
                                                                    <span className="text-gray-600">
                                                                        Spent: ₹{record.spent.toLocaleString()}
                                                                    </span>
                                                                    <span className={`font-medium ${
                                                                        record.remaining < 0 
                                                                            ? 'text-red-600' 
                                                                            : 'text-green-600'
                                                                    }`}>
                                                                        {record.remaining < 0 ? 'Over by ' : 'Remaining '}
                                                                        ₹{Math.abs(record.remaining).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Utilization</h4>
                                                                <div className="text-2xl font-bold">
                                                                    {Math.round((record.spent / record.amount) * 100)}%
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    {record.spent.toLocaleString()} of {record.amount.toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Time Remaining</h4>
                                                                <div className="text-2xl font-bold">
                                                                    {Math.ceil((new Date(record.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    Ends on {new Date(record.endDate).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Wallet className="w-12 h-12 mb-4 opacity-50" />
                                                <h3 className="text-lg font-semibold mb-2">No Budget Records Found</h3>
                                                <p className="mb-4">
                                                    {searchTerm 
                                                        ? `No records match "${searchTerm}". Try a different search term.`
                                                        : "You haven't created any budget records yet."
                                                    }
                                                </p>
                                                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                                                    <Plus className="w-4 h-4" />
                                                    Add Budget Record
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default BudgetRecords;