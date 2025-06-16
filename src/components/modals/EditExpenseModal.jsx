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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { updateExpense } from "../../redux/slices/expenseSlice";


const EditExpenseModal = ({ dialogOpen, setDialogOpen, expenseData, onSuccess }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        categoryId: "",
        amount: "",
        date: new Date(),
    });

    useEffect(() => {
        if (expenseData) {
            setFormData({
                categoryId: expenseData.categoryId?._id || "",
                amount: expenseData.amount?.toString() || "",
                date: new Date(expenseData.date),
            });
        }
    }, [expenseData]);

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
            const updatedData = {
                categoryId: formData.categoryId,
                amount: Number(formData.amount),
                date: formData.date,
            };

            const response = await dispatch(updateExpense({ id: expenseData._id, data: updatedData }));

            if (response.payload.success) {
                toast.success(response.payload.message || "Expense updated successfully");
                setDialogOpen(false);
                if (onSuccess) {
                    onSuccess(); // trigger parent refresh
                }
            } else {
                toast.error(response.payload.message || "Failed to update expense");
            }
        } catch (error) {
            toast.error("An error occurred while updating expense");
            console.error("Expense update error:", error);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Expense</DialogTitle>
                        <DialogDescription>
                            Modify your expense record details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Category Select */}
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Select
                                value={formData.categoryId}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, categoryId: value })
                                }
                            >
                                <SelectTrigger>
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
                            <Label>Amount (₹)</Label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount: e.target.value })
                                }
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
                                        {formData.date
                                            ? format(formData.date, "PPP")
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(date) =>
                                            setFormData({ ...formData, date })
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Update Expense</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditExpenseModal;
