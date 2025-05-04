'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

type Props = {
  title: string;
  items: string[];
  icon: ReactNode;
};

const InfoListCard: React.FC<Props> = ({ title, items, icon }) => {
  return (
    <Card className="w-full bg-white shadow-lg rounded-xl p-2 sm:p-6">
      <CardHeader className="pb-4 flex items-center gap-3">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm  text-gray-700 leading-relaxed">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InfoListCard;
