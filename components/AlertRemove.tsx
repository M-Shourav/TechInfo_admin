import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell } from "./ui/table";

const AlertRemove = () => {
  return (
    <TableCell className="hidden md:flex items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            // onClick={handleRemove}
            className="cursor-pointer bg-transparent text-black hover:text-white"
            variant={"destructive"}
          >
            <Trash2 size={18} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You sure</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableCell>
  );
};

export default AlertRemove;
