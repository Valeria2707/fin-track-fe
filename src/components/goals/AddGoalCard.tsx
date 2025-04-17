'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import GoalDialog from './GoalDialog';

const AddGoalCard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="flex  md:w-1/5 items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition rounded-lg shadow-md md:flex-row flex-col"
          onClick={() => setOpen(true)}
        >
          <div className="p-3 rounded-xl bg-blue-100 text-black">
            <Plus className="h-6 w-6 text-blue-700" />
          </div>
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold">Add Goal</h3>
            <p className="text-sm text-gray-500">Create a new goal</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <GoalDialog open={open} onOpenChange={setOpen} />
    </Dialog>
  );
};

export default AddGoalCard;
