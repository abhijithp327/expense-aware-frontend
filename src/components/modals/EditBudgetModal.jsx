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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { updateBudget } from "../../redux/slices/budgetSlice";


const EditBudgetModal = ({ dialogOpen, setDialogOpen, budgetData, onSuccess }) => {
    console.log("EditBudgetModal rendered with budgetData:", budgetData);

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const [formData, setFormData] = useState({
        categoryId: "",
        limit: "",
        month: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await dispatch(getAllCategories());
                setCategories(response.payload);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (budgetData) {
            const parsedMonth = parseISO(`${budgetData.month}-01`);
            setFormData({
                categoryId: budgetData.categoryId._id,
                limit: budgetData.limit.toString(),
                month: budgetData.month,
            });
            setSelectedMonth(parsedMonth);
        }
    }, [budgetData]);

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setFormData({
            ...formData,
            month: format(date, "yyyy-MM"),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.categoryId || !formData.limit || isNaN(formData.limit)) {
            toast.error("Please fill all fields correctly");
            return;
        }

        try {
            const response = await dispatch(
                updateBudget({
                    id: budgetData?._id,
                    categoryId: formData.categoryId,
                    limit: Number(formData.limit),
                    month: formData.month,
                })
            );

            console.log("Update budget response:", response);

            if (response.payload.success) {
                toast.success("Budget updated successfully");
                setDialogOpen(false);
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            toast.error("Error updating budget");
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>Update budget info for selected month</DialogDescription>
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
                                        {format(selectedMonth, "MMMM yyyy")}
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
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Update Budget</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBudgetModal;
