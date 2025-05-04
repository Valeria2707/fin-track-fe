import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { handleError } from '@/helpers/handleError';
import { Transaction, TransactionType } from '@/types/transaction';
import { useGetCategoriesQuery } from '@/features/categoryApi';
import { useCreateTransactionMutation, useUpdateTransactionMutation } from '@/features/transactionApi';
import { validationSchema } from '@/validators/transaction';
import { formatDateOnly } from '@/utils/date';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: TransactionType;
  transaction?: Transaction | null;
  onSave?: (updatedTransaction: Transaction) => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ open, onOpenChange, onSave, type, transaction }) => {
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] = useUpdateTransactionMutation();

  const isIncome = type === 'income';
  const filteredCategories = useMemo(() => categories?.filter(category => category.type === type), [categories, type]);

  const initialData = {
    amount: transaction?.amount ?? '',
    description: transaction?.description ?? '',
    categoryId: transaction?.category?.id ?? '',
    date: transaction?.date ? new Date(transaction.date) : new Date(),
  };

  const submitHandler = async (values: typeof initialData, { resetForm }: { resetForm: () => void }) => {
    const submitData = {
      type,
      category_id: +values.categoryId,
      amount: +values.amount,
      date: formatDateOnly(values.date),
      description: values.description,
    };
    try {
      if (transaction) {
        const updated = await updateTransaction({
          id: transaction.id,
          data: submitData,
        }).unwrap();
        onSave?.({ ...transaction, ...updated });
      } else {
        const created = await createTransaction(submitData).unwrap();
        onSave?.(created);
      }
      resetForm();
      onOpenChange(false);
    } catch (error) {
      handleError(error);
    }
  };

  const title = transaction ? 'Edit Transaction' : isIncome ? 'Add Income' : 'Add Expense';
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900 w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">{title}</DialogTitle>
        </DialogHeader>

        <Formik initialValues={initialData} enableReinitialize validationSchema={validationSchema} onSubmit={submitHandler}>
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Field as={Input} id="amount" name="amount" type="number" placeholder="Enter amount" className="rounded-md border-gray-300 w-full" />
                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Field as={Textarea} id="description" name="description" className="input" placeholder="Transaction description" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Label>Category</Label>
                <Select onValueChange={value => setFieldValue('categoryId', Number(value))} value={values.categoryId ? String(values.categoryId) : ''}>
                  <SelectTrigger className="rounded-md border-gray-300 w-full">
                    <SelectValue placeholder={isCategoriesLoading ? 'Loading...' : 'Select a category'} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map(category => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {format(values.date, 'dd/MM/yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={values.date} onSelect={date => setFieldValue('date', date || new Date())} />
                  </PopoverContent>
                </Popover>
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className={`w-[150px] ${isIncome ? 'bg-green-700' : 'bg-red-700'} ${isIncome ? 'hover:bg-green-800' : 'hover:bg-red-800'} text-base px-5 py-3 rounded-md font-medium transition-all duration-200`}
                >
                  {isCreating || isUpdating ? 'Processing...' : transaction ? 'Save' : 'Add'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
