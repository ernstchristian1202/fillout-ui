'use client';

import { cloneElement, MouseEventHandler, ReactElement, ReactNode, useEffect, useState  } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { Clipboard, Copy, EllipsisVertical, Flag, PenLine, Trash2 } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

type PageNavItemProps = {
  children: ReactNode ;
  id: string;
  isActive?: boolean;
  icon?: ReactElement ;
  onClick?: MouseEventHandler | undefined;
};

const PageNavItem = ({
  children,
  id,
  icon,
  isActive = false,
  onClick,
}: PageNavItemProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    
  } = useSortable({ id });

  const [isContextMenu, setIsContextMenu] = useState<boolean>(false)

  useEffect(() => {
    if (!isActive) {
      setIsContextMenu(isActive)
    }
  }, [isActive])

  const style = {
    transform: CSS.Transform.toString(transform && {
      ...transform,
      scaleX: 1,
    }),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const iconChild = icon && cloneElement(icon, {
    className: `${icon.props.className || ''} w-5 h-5 mr-[6px] ${isActive ? 'text-orange' : 'text-dark-gray'}`,
  })

  const menuItems = [
    { id: 1, label: 'Set as first page', icon: <Flag className='text-blue fill-blue mr-[6px]' size={16} /> },
    { id: 2, label: 'Rename', icon: <PenLine className='text-gray group-hover:text-dark-gray mr-[6px]' size={16} /> },
    { id: 3, label: 'Copy', icon: <Clipboard className='text-gray group-hover:text-dark-gray mr-[6px]' size={16} /> },
    { id: 4, label: 'Duplicate', icon: <Copy className='text-gray group-hover:text-dark-gray mr-[6px]' size={16} /> },
  ]

  return (
    <Popover.Root open={isContextMenu} onOpenChange={setIsContextMenu}>
      <div
        className="relative"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          ...style,
        }}
      >
        <Popover.Anchor asChild>
          <div
            className={
              isActive
                ? `
                  inline-flex items-center
                  transition-all duration-300
                  text-text font-sans font-medium text-sm tracking-tightest
                  bg-white hover:bg-gray-o15            
                  border border-gray focus:border-blue
                  px-2.5 py-1 rounded-lg select-none
                  shadow-navitem
                `
                : `
                  inline-flex items-center
                  transition-all duration-300
                  text-dark-gray font-sans font-medium text-sm tracking-tightest
                  bg-gray-o15 hover:bg-gray-o35            
                  border border-transparent
                  px-2.5 py-1 rounded-lg select-none            
                `
            }
            onClick={onClick}
          >
            {iconChild}
            {children}
            {isActive && (
                <Popover.Trigger>
                  <EllipsisVertical
                    className="transition-all duration-300 w-4 h-4 ml-2 hover:text-orange"
                  />
                </Popover.Trigger>
            )}
          </div>
        </Popover.Anchor>
        {isContextMenu && (
          <Popover.Portal>
            <Popover.Content
              className="text-text min-w-[240px] w-48 mb-[9px] rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
              side="top"
              align="start"
            >
              <h3 className="font-sans font-medium text-base tracking-tightest px-3 py-2 border-gray-o35 border-b">Settings</h3>
              <div role="menu" aria-orientation="vertical" className="pt-[5px] pb-[7px] font-normal text-[14px]">
                {menuItems.map((item) => (
                  <Popover.Close key={item.id} asChild>
                    <button
                      className={`
                        group flex w-full items-center px-3 py-[7px] 
                        font-sans font-medium text-sm tracking-tightest text-gray-700 
                        hover:bg-gray-o15 hover:text-gray-800
                      `}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </Popover.Close>
                ))}
              </div>
              <div className="border-t-[0.5px] border-gray-o35 mx-3"></div>
              <div className="py-[7px] font-normal text-[14px]">
                <Popover.Close asChild>
                  <button
                    className={`
                      group flex w-full items-center px-3 py-[7px] 
                      font-sans font-medium text-sm tracking-tightest text-red-500 
                      hover:bg-gray-o15 hover:text-red-600
                    `}
                  >
                    <Trash2 className="text-red-400 mr-[6px] group-hover:text-red-600" size={16} />
                    <span>Delete</span>
                  </button>
                </Popover.Close>
              </div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </div>
    </Popover.Root>
  );
};

export default PageNavItem;