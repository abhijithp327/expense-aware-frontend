import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, LabelList, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import {
    TrendingUp,
    DollarSign,
    Wallet,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Filter,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/slices/categorySlice';
import { getAllMonthlyReports } from '../redux/slices/reportSlice';
import DashboardLayout from '../layouts/DashboardLayout';

const monthlyTrend = [
    { month: 'Jan', spent: 3200, budget: 4000 },
    { month: 'Feb', spent: 2800, budget: 4000 },
    { month: 'Mar', spent: 3600, budget: 4000 },
    { month: 'Apr', spent: 4200, budget: 4000 },
    { month: 'May', spent: 3870, budget: 4500 },
];

const Dashboard = () => {
    const dispatch = useDispatch();

    const [month, setMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [categories, setCategories] = useState([]);
    const [report, setReport] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const chartConfig = React.useMemo(() => {
        const config = {};
        report.forEach(item => {
            config[item.name] = {
                label: item.name,
                color: item.color
            };
        });
        return config;
    }, [report]);

    const refreshDashboardData = React.useCallback((selectedMonth = month) => {
        setRefreshTrigger(prev => prev + 1);
        if (selectedMonth !== month) {
            setMonth(selectedMonth);
        }
    }, [month]);

    useEffect(() => {
        const fetchMonthlyReports = async () => {
            try {
                const response = await dispatch(getAllMonthlyReports(month));
                console.log('response reports dashboard: ', response);
                setReport(response.payload);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
                setReport([]);
            }
        }
        fetchMonthlyReports();
    }, [month, refreshTrigger, dispatch]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await dispatch(getAllCategories());
                console.log('Fetched result:', response.payload);
                setCategories(response.payload);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        }
        fetchCategories();
    }, [refreshTrigger, dispatch]);

    const totalSpent = report.reduce((sum, cat) => sum + cat.spent, 0);
    const totalBudget = report.reduce((sum, cat) => sum + cat.limit, 0);
    const totalRemaining = totalBudget - totalSpent;
    const budgetUtilization = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0;

    // Filter out categories with 0 spending for pie chart
    const pieChartData = report.filter(item => item.spent > 0);

    return (
        <DashboardLayout 
            title="Dashboard" 
            description="Manage your finances smartly"
            showMonthFilter={true}
            onRefresh={refreshDashboardData}
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Spent</p>
                                <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="text-xs text-indigo-100">+8.2% from last month</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Budget</p>
                                <p className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Target className="w-4 h-4" />
                                    <span className="text-xs text-green-100">{budgetUtilization}% utilized</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                <Wallet className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-cyan-100 text-sm font-medium">Remaining</p>
                                <p className="text-2xl font-bold">₹{totalRemaining.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <ArrowDownRight className="w-4 h-4" />
                                    <span className="text-xs text-cyan-100">Available to spend</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Categories</p>
                                <p className="text-2xl font-bold">{report.length}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-xs text-orange-100">Active budgets</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                <Target className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-gray-900">Spending Distribution</CardTitle>
                        <CardDescription className="text-gray-600">
                            Monthly breakdown by category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                        {pieChartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                    <Pie
                                        data={pieChartData}
                                        dataKey="spent"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            dataKey="name"
                                            className="fill-background"
                                            stroke="none"
                                            fontSize={12}
                                            formatter={(value) => value}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-gray-500">
                                <div className="text-center">
                                    <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>No spending data for this month</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm pt-2">
                        <div className="flex items-center gap-2 font-medium text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            Budget utilization: {budgetUtilization}%
                        </div>
                        <div className="text-gray-600 text-center">
                            {month} spending summary
                        </div>
                    </CardFooter>
                </Card>

                {/* Bar Chart */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-gray-900">Monthly Trends</CardTitle>
                        <CardDescription className="text-gray-600">
                            Spending vs Budget over time
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyTrend}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip />
                                    <Bar dataKey="spent" fill="#6366f1" name="Spent" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="budget" fill="#e5e7eb" name="Budget" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm pt-2">
                        <div className="flex items-center gap-2 font-medium text-indigo-600">
                            <TrendingUp className="h-4 w-4" />
                            Spending trending upward
                        </div>
                        <div className="text-gray-600 text-center">
                            Last 5 months comparison
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Category Cards */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Reports Breakdown</h3>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {report.map((cat) => {
                        const over = cat.isOverspent;
                        const percentage = cat.limit > 0 ? ((cat.spent / cat.limit) * 100).toFixed(1) : 0;

                        return (
                            <Card key={cat.categoryId} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: cat.color }}
                                                />
                                                <h4 className="font-semibold text-gray-900">{cat.name}</h4>
                                            </div>
                                            {over && (
                                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                                    OVER
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Spent</span>
                                                <span className="font-semibold">₹{cat.spent}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Budget</span>
                                                <span className="font-semibold">₹{cat.limit}</span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-500">{percentage}% used</span>
                                                    <span className={over ? 'text-red-600' : 'text-green-600'}>
                                                        ₹{Math.max(cat.remaining, 0)} left
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-300 ${
                                                            over ? 'bg-red-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                        }`}
                                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;