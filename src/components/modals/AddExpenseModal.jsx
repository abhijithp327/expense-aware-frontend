import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { createExpense } from "../../redux/slices/expenseSlice";


const AddExpenseModal = ({ dialogOpen, setDialogOpen, onSuccess }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        categoryId: "",
        amount: "",
        date: new Date(),
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.categoryId) {
            toast.error("Please select a category");
            return;
        }

        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!formData.date) {
            toast.error("Please select a date");
            return;
        }

        try {
            const expenseData = {
                categoryId: formData.categoryId,
                amount: Number(formData.amount),
                date: formData.date,
            };

            const response = await dispatch(createExpense(expenseData));
            // console.log('response of expense data: ', response.payload.result.expenseStatus);
            

            if (response.payload.success) {
                if(response.payload.result.expenseStatus === 'over') {
                    toast.error(response.payload.message);
                } else {
                    toast.success(response.payload.message);
                }
                resetForm();
                setDialogOpen(false);
                if (onSuccess) {
                    onSuccess(); 
                }
            } else {
                toast.error(response.payload.message || "Failed to add expense");
            }
        } catch (error) {
            toast.error("An error occurred while adding expense");
            console.error("Expense creation error:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            categoryId: "",
            amount: "",
            date: new Date(),
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                            Record your expense with category and date
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Category Select */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.categoryId}
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                            >
                                <SelectTrigger >
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="max-h-48 overflow-y-auto">
                                    {categories.map((category) => (
                                        <SelectItem key={category._id} value={category._id}>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Amount Input */}
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                min="0.01"
                                step="0.01"
                            />
                        </div>

                        {/* Date Picker */}
                        <div className="grid gap-2">
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(date) => setFormData({ ...formData, date })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Add Expense</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddExpenseModal;