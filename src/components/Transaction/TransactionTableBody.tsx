import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatDateDisplay } from '@/utils/date';
import { MoreVertical } from 'lucide-react';
import { Transaction } from '@/types/transaction';

type Props = {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
};

export default function TransactionTableBody({ transactions, onEdit, onDelete }: Props) {
  return (
    <Table className="w-full text-sm">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="px-4 py-3 text-center">№</TableHead>
          <TableHead className="px-4 py-3">Category</TableHead>
          <TableHead className="px-4 py-3 text-center">Amount</TableHead>
          <TableHead className="px-4 py-3 text-center">Date</TableHead>
          <TableHead className="px-4 py-3">Description</TableHead>
          <TableHead className="w-[2%]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx, index) => (
          <TableRow key={tx.id} className="border-b hover:bg-gray-50">
            <TableCell className="px-4 py-3 text-center">{index + 1}</TableCell>
            <TableCell className="px-4 py-3">{tx.category.name}</TableCell>
            <TableCell className={`px-4 py-3 text-center font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              <div className="flex items-center justify-center gap-1">
                <span>{tx.type === 'income' ? '+' : '-'}</span>
                <span>₴{tx.amount}</span>
              </div>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">{formatDateDisplay(tx.date)}</TableCell>
            <TableCell className="px-4 py-3">{tx.description || '—'}</TableCell>
            <TableCell className="px-4 py-3 text-center">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-base cursor-pointer" onClick={() => onEdit(tx)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="!text-red-600 cursor-pointer hover:!text-red-700 hover:bg-red-50 focus:bg-red-50 text-base"
                    onClick={() => onDelete(tx)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
