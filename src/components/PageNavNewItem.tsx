'use client';

import { cloneElement, MouseEventHandler, ReactElement, ReactNode  } from 'react';

type PageNavNewItemProps = {
  children: ReactNode;
  icon?: ReactElement;
  hidden?: boolean;
  onClick?: MouseEventHandler | undefined;
};

const PageNavNewItem = ({
  children,
  icon,
  hidden = false,
  onClick
}: PageNavNewItemProps) => {

  const iconChild = icon && cloneElement(icon, {
    className: `${icon.props.className || ''} w-5 h-5 mr-[6px] text-black}`,
  })

  return (
    <button
      className={`
        ${hidden && 'opacity-0'}
        inline-flex items-center
        transition-all duration-300
        font-sans font-medium text-sm tracking-tightest
        bg-white hover:bg-gray-o15            
        border border-gray focus:border-blue
        px-2.5 py-1 rounded-lg select-none
        shadow-navitem
      `}
      onClick={onClick}
    >
      {iconChild}
      {children}
    </button>
  );
};

export default PageNavNewItem;