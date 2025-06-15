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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCategory } from "../../redux/slices/categorySlice";

const EditCategoryModal = ({ dialogOpen, setDialogOpen, category, onSuccess }) => {
  const dispatch = useDispatch();

  const [catName, setCatName] = useState("");
  const [catColor, setCatColor] = useState("#6366f1");

  useEffect(() => {
    if (category) {
      setCatName(category.name || "");
      setCatColor(category.color || "#6366f1");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!catName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const data = {
        id: category._id,
        name: catName,
        color: catColor,
      };

      const response = await dispatch(updateCategory(data));
      console.log("Edit modal response", response);

      if (response.payload.success) {
        toast.success(response.payload.message);
        setDialogOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(response.payload.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category name and color</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="catName">Name</Label>
              <Input
                id="catName"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="catColor">Color</Label>
              <Input
                id="catColor"
                type="color"
                value={catColor}
                onChange={(e) => setCatColor(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
