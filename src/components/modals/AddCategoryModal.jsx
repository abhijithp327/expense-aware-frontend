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
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { createCategory } from "../../redux/slices/categorySlice"
import { data } from "autoprefixer"

const AddCategoryModal = ({ dialogOpen, setDialogOpen, onSuccess }) => {

  const dispatch = useDispatch();

  const [catName, setCatName] = useState("")
  const [catColor, setCatColor] = useState("#6366f1")


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!catName.trim()) {
      toast.error("Category name is required")
      return
    }
    if (!catColor.trim()) {
      toast.error(response.message)
      return
    }
    try {
      const data = {
        name: catName,
        color: catColor
      }
      const response = await dispatch(createCategory(data))
      console.log("modal response", response);
      if (response.payload.success) {
        toast.success(response.payload.message)
        setDialogOpen(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.payload.message)
      }
    } catch (error) {
      console.log(error);
    }


    setCatName("")
    setCatColor("#6366f1")
    setDialogOpen(false)
  }



  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a category with a selected color
            </DialogDescription>
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryModal
