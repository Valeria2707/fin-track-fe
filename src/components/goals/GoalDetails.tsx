'use client';

import { formatDateTextMonthDisplay } from '@/utils/date';
import { AccordionContent } from '../ui/accordion';
import { Button } from '../ui/button';
import { Goal } from '@/types/goal';
import { useState } from 'react';
import ConfirmDeleteDialog from '../shared/ConfirmDeleteDialog';
import { handleError } from '@/helpers/handleError';
import { useRemoveGoalMutation } from '@/features/goalApi';
import TopUpDialog from './TopUpDialog';
import GoalDialog from './GoalDialog';

type Props = {
  goal: Goal;
};

const GoalDetails: React.FC<Props> = ({ goal }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [removeGoal, { isLoading: isDeleting }] = useRemoveGoalMutation();

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleOpenTopUpDialog = () => {
    setIsTopUpOpen(true);
  };

  const handleOpenEditDialog = () => {
    setIsOpenEdit(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeGoal(goal.id).unwrap();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <AccordionContent>
        <div className="pt-4 px-6 pb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-end">
            <div className="space-y-1 text-sm text-gray-700 max-w-xl leading-relaxed">
              {goal.description && <p className="text-gray-800 text-[15px]">{goal.description}</p>}
              <p>
                <span className="text-gray-500">Deadline: </span>
                <span className="font-medium text-gray-900">{formatDateTextMonthDisplay(goal.deadline)}</span>
              </p>
              <p>
                <span className="text-gray-500">Target: </span>
                <span className="font-medium text-gray-900">{goal.target_amount}₴</span>
              </p>
              <p>
                <span className="text-gray-500">Saved: </span>
                <span className="font-medium text-gray-900">{goal.current_amount}₴</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button onClick={handleOpenEditDialog} className="bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 ">
                Edit
              </Button>
              <Button onClick={handleOpenDeleteDialog} className="bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200">
                Close
              </Button>
              <Button onClick={handleOpenTopUpDialog} className="bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200">
                Top Up
              </Button>
            </div>
          </div>
        </div>
      </AccordionContent>
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure you want to close this goal?"
        description="This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        confirmText="Close"
      />
      <TopUpDialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen} goal={goal} />
      <GoalDialog open={isOpenEdit} onOpenChange={setIsOpenEdit} goal={goal} />
    </>
  );
};

export default GoalDetails;
