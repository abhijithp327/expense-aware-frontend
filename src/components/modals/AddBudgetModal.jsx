import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import { getAllCategories } from "../../redux/slices/categorySlice"
import { createBudget } from "../../redux/slices/budgetSlice"


const AddBudgetModal = ({ dialogOpen, setDialogOpen, onSuccess }) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const [formData, setFormData] = useState({
        categoryId: "",
        limit: "",
        month: format(new Date(), 'yyyy-MM')
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await dispatch(getAllCategories());
                setCategories(response.payload);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.categoryId) {
            toast.error("Please select a category");
            return;
        }

        if (!formData.limit || isNaN(formData.limit) || Number(formData.limit) <= 0) {
            toast.error("Please enter a valid budget amount");
            return;
        }

        try {
            const response = await dispatch(createBudget({
                categoryId: formData.categoryId,
                limit: Number(formData.limit),
                month: formData.month
            }));

            if (response.payload?.success) {
                toast.success("Budget created successfully");
                resetForm();
                setDialogOpen(false);
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                toast.error(response.payload?.message || "Failed to create budget");
            }
        } catch (error) {
            toast.error("Error creating budget");
        }
    };

    const resetForm = () => {
        setFormData({
            categoryId: "",
            limit: "",
            month: format(new Date(), 'yyyy-MM')
        });
        setSelectedMonth(new Date());
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setFormData({
            ...formData,
            month: format(date, 'yyyy-MM')
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Monthly Budget</DialogTitle>
                        <DialogDescription>
                            Set a budget for a specific category and month
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Category Select */}
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Select
                                value={formData.categoryId}
                                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
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

                        {/* Budget Amount */}
                        <div className="grid gap-2">
                            <Label>Budget Amount (₹)</Label>
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={formData.limit}
                                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                                min="1"
                            />
                        </div>

                        {/* Month Picker */}
                        <div className="grid gap-2">
                            <Label>Month</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(selectedMonth, 'MMMM yyyy')}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <input
                                        type="month"
                                        value={formData.month}
                                        onChange={(e) => {
                                            const date = e.target.value ? parseISO(`${e.target.value}-01`) : new Date();
                                            handleMonthChange(date);
                                        }}
                                        className="border rounded p-2"
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
                        <Button type="submit">Save Budget</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBudgetModal;