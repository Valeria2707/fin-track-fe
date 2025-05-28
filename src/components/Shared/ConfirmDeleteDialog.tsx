import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmText?: string;
};

const ConfirmDeleteDialog: React.FC<Props> = ({ open, onOpenChange, title, description, confirmText, onConfirm, isLoading = false }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-xl bg-white p-8 shadow-xl border border-red-100">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-3">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-5 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-400 text-gray-700 hover:bg-gray-200 px-5 py-3 rounded-md text-base"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-700 text-white hover:bg-red-800 px-5 py-3 rounded-md text-base font-medium transition-all duration-200"
          >
            {confirmText || 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
