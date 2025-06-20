'use client';

import { CirclePause, CirclePlus, EllipsisVertical, Plus } from 'lucide-react';
import { MouseEventHandler, ReactNode, useRef, useState } from 'react';

type PageNavItemProps = {
  hidden?: boolean;
  disableHover?: boolean;
  onClick?: MouseEventHandler;
};

const PageNavGapItem = ({
  hidden = false,
  disableHover = false,
  onClick
}: PageNavItemProps) => {

  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disableHover) return;
    timeoutRef.current = setTimeout(() => {
      setHovered(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (disableHover) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(false);
  };

  return (
    <div
      className={`
        h-8
        ${hovered ? 'w-14' : 'w-5'}
        ${hidden && 'opacity-0'}
        relative transition-all duration-300
        before:border before:border-dashed before:border-gray-400 before:border-dash
        before:content-[''] before:absolute before:w-full before:h-0 before:top-1/2 before:-translate-y-1/2 before:left-0
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!disableHover && (
        <div
          className={`
            bg-white cursor-pointer hover:border-gray transition-all duration-300
            w-4 h-4 flex items-center justify-center rounded-full shadow-navitem border border-border
            absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
            ${hovered ? `opacity-100` : `opacity-0`}
          `}
          onClick={onClick}
        >
          <Plus className='w-2 h-2 text-black'/>
        </div>
      )}
    </div>
  );
};

export default PageNavGapItem;