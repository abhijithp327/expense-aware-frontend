import React, { use, useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { getAllExpenses } from '../redux/slices/expenseSlice';
import EditExpenseModal from '../components/modals/EditExpenseModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';



const ExpenseRecords = () => {

    const dispatch = useDispatch();

    const [expenses, setExpenses] = useState([]);
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshData = React.useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);



    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                console.log('Fetching expenses for month:', month);
                const response = await dispatch(getAllExpenses(month));
                console.log('response of getAllExpenses: ', response);
                setExpenses(response.payload);
            } catch (error) {
                console.log('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, [refreshTrigger]);



    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setDialogOpen(true);
    };


    const handleDelete = (expense) => {
        setExpenseToDelete(expense);
        setDeleteDialogOpen(true);
    };

const confirmDelete = async () => {
        // try {
        //     const response = await dispatch(deleteCategory(categoryToDelete._id));
        //     if (response.payload.success) {
        //         toast.success(response.payload.message);
        //     } else {
        //         toast.error(response.payload.message || "Failed to delete category");
        //     }
        //     setDeleteDialogOpen(false);
        //     setCategoryToDelete(null);
        //     refreshData();
        // } catch (error) {
        //     console.error("Delete failed", error);
        // }
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


                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Records</p>
                                <p className="text-2xl font-bold">{expenses.length}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Receipt className="w-4 h-4" />
                                    <span className="text-xs text-green-100">Filtered results</span>
                                </div>
                            </div>
                            <Receipt className="w-8 h-8 text-green-200" />
                        </div>
                    </CardContent>
                </Card>




            </div>

            <div className="flex gap-2 justify-end">

                {/* <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Expense
                </button> */}
            </div>



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

                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Category

                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        <button

                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Amount

                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        <button

                                            className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                        >
                                            Date

                                        </button>
                                    </th>


                                    {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {expenses?.map((expense) => (
                                    <tr key={expense._id} className="hover:bg-gray-50 transition-colors">

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: expense?.categoryId?.color || '#ccc' }}
                                                />
                                                <span className="text-sm text-gray-900">{expense?.categoryId?.name}</span>
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


                                        {/* <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1">

                                                <button
                                                    onClick={() => handleEdit(expense)}
                                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                                    title="Edit Expense"
                                                >
                                                    <Edit2 className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(expense)}
                                                    className="p-1 hover:bg-red-100 rounded-md transition-colors"
                                                    title="Delete Expense"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {expenses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <Receipt className="w-16 h-16 mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">No Expenses Found</h3>
                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Expense
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* <EditExpenseModal
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                expenseData={selectedExpense}
                onSuccess={refreshData}
            />

             <DeleteConfirmModal
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="Delete Expense"
                description={`Are you sure you want to delete "${expenseToDelete?.categoryId?.name}"?`}
            /> */}

        </DashboardLayout>
    );
};

export default ExpenseRecords;