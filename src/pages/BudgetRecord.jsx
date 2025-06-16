import React, { use, useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { deleteBudget, getAllBudgets } from '../redux/slices/budgetSlice';
import EditBudgetModal from '../components/modals/EditBudgetModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { toast } from 'react-toastify';
import AddBudgetModal from '../components/modals/AddBudgetModal';




const BudgetRecords = () => {

    const dispatch = useDispatch();

    const [budgetRecordsData, setBudgetRecordsData] = useState([]);
    const [addBudgetDialogOpen, setAddBudgetDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'startDate', direction: 'desc' });
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedRecord, setExpandedRecord] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [budgetToDelete, setBudgetToDelete] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    const refreshData = React.useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        const getAllBudgetRecords = async () => {
            try {
                const response = await dispatch(getAllBudgets());
                console.log('response budget: ', response);

                setBudgetRecordsData(response.payload);
            } catch (error) {
                console.error('Failed to fetch budget records:', error);
            }
        };
        getAllBudgetRecords();
    }, [refreshTrigger]);

    const handleEdit = (budget) => {
        setSelectedBudget(budget);
        setEditOpen(true);
    };

    const handleDelete = (budget) => {
        console.log('handleDelete called with budget:', budget);
        setBudgetToDelete(budget);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await dispatch(deleteBudget(budgetToDelete._id));
            if (response.payload.success) {
                toast.success(response.payload.message);
            }
            setDeleteDialogOpen(false);
            setBudgetToDelete(null);
            refreshData();
        } catch (error) {
            toast.error(response.payload.message || "Failed to delete budget");
            console.error("Delete failed", error);
        }
    };

    return (
        <DashboardLayout
            title="Budget Records"
            description="View and manage your budget history"
        >
            {/* Header and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-start sm:items-center mb-6">

                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                    onClick={() => setAddBudgetDialogOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Budget
                </button>
            </div>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Budgets</p>
                                <p className="text-2xl font-bold">{budgetRecordsData?.length}</p>
                            </div>
                            <Wallet className="w-8 h-8 text-indigo-200" />
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Budget Records Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Budget History</CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"

                                    >
                                        <div className="flex items-center gap-1">
                                            Category
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"

                                    >
                                        <div className="flex items-center gap-1">
                                            Amount
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"

                                    >
                                        <div className="flex items-center gap-1">
                                            Month
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"

                                    >
                                        <div className="flex items-center gap-1">
                                            Created At
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {budgetRecordsData?.length > 0 ? (
                                    budgetRecordsData?.map((record) => (
                                        <React.Fragment key={record._id}>
                                            <tr
                                                className="hover:bg-gray-50 cursor-pointer"

                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-3 h-3 rounded-full mr-2"
                                                            style={{ backgroundColor: record?.categoryId?.color }}
                                                        />
                                                        <div className="font-medium text-gray-900">
                                                            {record?.categoryId?.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 font-medium">
                                                        {record?.limit}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className='px-2 py-1 text-sm font-medium rounded-full'>
                                                        {record?.month}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {new Date(record.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(record);
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(record);
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>

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

            {/* Add Budget Modal */}
            <AddBudgetModal
                dialogOpen={addBudgetDialogOpen}
                setDialogOpen={setAddBudgetDialogOpen}
                onSuccess={refreshData}
            />

            <EditBudgetModal
                dialogOpen={editOpen}
                setDialogOpen={setEditOpen}
                budgetData={selectedBudget}
                onSuccess={refreshData}
            />

            <DeleteConfirmModal
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="Delete Budget Record"
                description={`Are you sure you want to delete "${budgetToDelete?.categoryId?.name}"?`}
            />

        </DashboardLayout>
    );
};

export default BudgetRecords;