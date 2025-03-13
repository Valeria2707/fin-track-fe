import { useCreateTransactionMutation } from '@/features/transactionApi';
import { useGetCategoriesQuery } from '@/features/categoryApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, CalendarIcon } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '../ui/input';
import { handleError } from '@/helpers/handleError';

interface Props {
  type: 'income' | 'expense';
}

const AddTransactionCard: React.FC<Props> = ({ type }) => {
  const [open, setOpen] = useState(false);
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const isIncome = type === 'income';
  const filteredCategories = useMemo(() => categories?.filter(category => category.type === type), [categories, type]);
  const validationSchema = Yup.object().shape({
    amount: Yup.number().positive('Amount must be greater than 0').required('Amount is required'),
    categoryId: Yup.number().nullable().required('Category is required'),
    date: Yup.date().required('Date is required'),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg shadow-md md:flex-row flex-col"
          onClick={() => setOpen(true)}
        >
          <div className={`p-3 rounded-xl ${isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isIncome ? <Plus className="h-6 w-6" /> : <Minus className="h-6 w-6" />}
          </div>
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold">{isIncome ? 'Add Income' : 'Add Expense'}</h3>
            <p className="text-sm text-gray-500">{isIncome ? 'Create an income' : 'Create an expense'}</p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900 w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">{isIncome ? 'Add Income' : 'Add Expense'}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            amount: '',
            description: '',
            categoryId: '',
            date: new Date(),
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await createTransaction({
                type,
                category_id: Number(values.categoryId),
                amount: Number(values.amount),
                date: values.date,
                description: values.description,
              }).unwrap();
              resetForm();
              setOpen(false);
            } catch (error) {
              handleError(error);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Field as={Input} id="amount" name="amount" type="number" placeholder="Enter amount" className="rounded-md border-gray-300  w-full" />
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

              <Button type="submit" disabled={isLoading} className={`w-full ${isIncome ? 'bg-green-500' : 'bg-red-500'}`}>
                {isLoading ? 'Adding...' : 'Add'}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionCard;
