import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { useUpdateGoalMutation } from '@/features/goalApi';
import { handleError } from '@/helpers/handleError';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Goal } from '@/types/goal';
import { validationSchema } from '@/validators/goal';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal;
}

const TopUpDialog: React.FC<Props> = ({ open, onOpenChange, goal }) => {
  const [updateGoal, { isLoading }] = useUpdateGoalMutation();

  const handleSubmit = async (values: { amount: string }) => {
    try {
      const numericAmount = parseFloat(values.amount);
      const updatedAmount = Number(goal.current_amount) + numericAmount;

      await updateGoal({
        id: goal.id,
        data: {
          ...goal,
          current_amount: updatedAmount,
          target_amount: Number(goal.target_amount),
        },
      });
      onOpenChange(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-900">Top Up Goal</DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-3">Please enter the amount you want to add to this goal.</DialogDescription>
        </DialogHeader>
        <Formik initialValues={{ amount: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-4">
            <div>
              <Field as={Input} name="amount" type="number" placeholder="100₴" className="w-full" />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpDialog;
