import PageNav from '@/components/PageNav';
import { CircleCheck, Info } from 'lucide-react';

export default function Home() {
  
  const pages = [
    { id: 'info', icon: <Info /> , title: 'Info' },
    { id: 'details', title: 'Details' },
    { id: 'other', title: 'Other' },
    { id: 'ending', icon: <CircleCheck />, title: 'Ending' },
  ]

  return (
    <div className="flex flex-col justify-between items-center min-h-lvh bg-workspace p-4">
      <PageNav pages={pages} />

      <div className="text-orange">
        Created by Ernst Christian Catedral.
      </div>
    </div>
  );
}