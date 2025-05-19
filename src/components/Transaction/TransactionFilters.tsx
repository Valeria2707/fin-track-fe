'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';

type FilterProps = {
  filters: Record<string, string | undefined>;
  categories?: Category[];
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
};

const TransactionFilters: React.FC<FilterProps> = ({ filters, categories, onFilterChange, onResetFilters }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-sm text-gray-700">
      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-gray-600 text-xs font-medium">
          Type
        </label>
        <Select value={filters.type ?? 'none'} onValueChange={value => onFilterChange('type', value)}>
          <SelectTrigger className="w-32 text-gray-800">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-gray-600 text-xs font-medium">
          Category
        </label>
        <Select value={filters.category_id ?? 'none'} onValueChange={value => onFilterChange('category_id', value)}>
          <SelectTrigger className="w-48 text-gray-800">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            {categories?.map(category => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={onResetFilters} className="mt-5">
        Reset
      </Button>
    </div>
  );
};

export default TransactionFilters;
