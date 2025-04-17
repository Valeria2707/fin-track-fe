'use client';

import { useCreateGoalMutation, useUpdateGoalMutation } from '@/features/goalApi';
import { Goal, GoalData, Priority } from '@/types/goal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { format } from 'date-fns';
import { handleError } from '@/helpers/handleError';
import { Label } from '../ui/label';
import { goalValidationSchema } from '@/validators/goal';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: Goal | null;
};

const GoalDialog: React.FC<Props> = ({ open, onOpenChange, goal }) => {
  const [createGoal, { isLoading: isCreating }] = useCreateGoalMutation();
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation();

  const initialData: GoalData = {
    title: goal?.title ?? '',
    target_amount: goal?.target_amount ?? '',
    current_amount: goal?.current_amount ?? '',
    deadline: goal?.deadline ? new Date(goal.deadline) : new Date(),
    description: goal?.description ?? '',
    priority: goal?.priority ?? Priority.LOW,
  };

  const isEditing = !!goal;
  const isLoading = isCreating || isUpdating;

  const submitHandler = async (values: typeof initialData, { resetForm }: { resetForm: () => void }) => {
    try {
      const data = {
        ...values,
        target_amount: +values.target_amount,
        current_amount: +values.current_amount || 0,
      };

      if (isEditing) {
        await updateGoal({ id: goal.id, data }).unwrap();
      } else {
        await createGoal(data).unwrap();
      }
      resetForm();
      onOpenChange(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900 w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">{isEditing ? 'Edit Goal' : 'Create Goal'}</DialogTitle>
        </DialogHeader>
        <Formik initialValues={initialData} validationSchema={goalValidationSchema} enableReinitialize onSubmit={submitHandler}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Field as={Input} name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" className="text-sm text-red-500 mt-1" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label htmlFor="target_amount">Target Amount</Label>
                  <Field as={Input} type="number" name="target_amount" placeholder="Target Amount" />
                  <ErrorMessage name="target_amount" component="div" className="text-sm text-red-500 mt-1" />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="current_amount">Current Amount</Label>
                  <Field as={Input} type="number" name="current_amount" placeholder="Current Amount" />
                  <ErrorMessage name="current_amount" component="div" className="text-sm text-red-500 mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {format(values.deadline, 'dd/MM/yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={values.deadline} onSelect={date => setFieldValue('deadline', date || new Date())} />
                  </PopoverContent>
                </Popover>
                <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Label>priority</Label>
                <Select onValueChange={value => setFieldValue('priority', value)} value={values.priority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage name="priority" component="div" className="text-sm text-red-500 mt-1" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Field as={Textarea} name="description" placeholder="Description" />
              </div>
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading} className="w-[150px] ">
                  {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
