import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Folder, Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteCategory, getAllCategories } from '../redux/slices/categorySlice';
import DashboardLayout from '../layouts/DashboardLayout';
import EditCategoryModal from '../components/modals/EditCategoryModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { toast } from 'react-toastify';
import AddCategoryModal from '../components/modals/AddCategoryModal';


const Categories = () => {

    const dispatch = useDispatch();

    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    const refreshData = React.useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await dispatch(getAllCategories());
                console.log('Fetched categories:', response.payload);
                setCategories(response.payload || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        }
        fetchCategories();
    }, [refreshTrigger, dispatch]);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setDialogOpen(true);
    };


    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await dispatch(deleteCategory(categoryToDelete._id));
            if (response.payload.success) {
                toast.success(response.payload.message);
            } else {
                toast.error(response.payload.message || "Failed to delete category");
            }
            setDeleteDialogOpen(false);
            setCategoryToDelete(null);
            refreshData();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };



    return (
        <DashboardLayout
            title="Categories"
            description="Manage your expense categories"
            onRefresh={refreshData}
        >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-end sm:items-center">

                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                    onClick={() => setAddCategoryDialogOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Categories</p>
                                <p className="text-2xl font-bold">{categories.length}</p>
                            </div>
                            <Folder className="w-8 h-8 text-blue-200" />
                        </div>
                    </CardContent>
                </Card>



            </div>

            {/* Categories Grid */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">All Categories</h3>
                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCategories.map((category) => (
                            <Card key={category._id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: category.color || '#6366f1' }}
                                            />
                                            <CardTitle className="text-lg font-semibold text-gray-900">
                                                {category.name}
                                            </CardTitle>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="p-1 hover:bg-red-100 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-3">


                                        {/* {category.budget && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Budget:</span>
                                                <span className="font-semibold text-gray-900">
                                                    ₹{category.budget.toLocaleString()}
                                                </span>
                                            </div>
                                        )} */}

                                        {category.createdAt && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Created:</span>
                                                <span className="text-gray-700">
                                                    {new Date(category.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <Folder className="w-16 h-16 mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No Categories Found</h3>
                        <p className="text-center mb-4">
                            {searchTerm
                                ? `No categories match "${searchTerm}". Try a different search term.`
                                : "You haven't created any categories yet. Add your first category to get started."
                            }
                        </p>
                        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Category
                        </button>
                    </div>
                )}
            </div>

            <AddCategoryModal
                dialogOpen={addCategoryDialogOpen}
                setDialogOpen={setAddCategoryDialogOpen}
                onSuccess={refreshData}
            />

            <EditCategoryModal
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                onSuccess={refreshData}
                category={selectedCategory}
            />

            <DeleteConfirmModal
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="Delete Category"
                description={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
            />


        </DashboardLayout>
    );
};

export default Categories;