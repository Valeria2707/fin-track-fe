import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';
import TransactionDialog from './TransactionDialog';

interface Props {
  type: TransactionType;
  onAdd: (newTransaction: Transaction) => void;
}

const AddTransactionCard: React.FC<Props> = ({ type, onAdd }) => {
  const [open, setOpen] = useState(false);

  const isIncome = type === 'income';

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
      <TransactionDialog
        open={open}
        onOpenChange={setOpen}
        type={type}
        onSave={newTransaction => {
          onAdd(newTransaction);
        }}
      />
    </Dialog>
  );
};

export default AddTransactionCard;
