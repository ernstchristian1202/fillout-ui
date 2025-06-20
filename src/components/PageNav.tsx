'use client';

import { ReactElement, useState } from 'react';
import PageNavItem from './PageNavItem';
import PageNavGapItem from './PageNavGapItem';
import { FileText, Plus } from 'lucide-react';
import PromptModal from './PromptModal';
import PageNavNewItem from './PageNavNewItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface PageItem {
  id: string;
  icon?: ReactElement;
  title: string;
}

type PageNavProps = {
  pages?: PageItem[];
  className?: string;
};

const PageNav = ({
  pages: initPages = [],
  className = ''
}: PageNavProps) => {
  const [isPromptOpen, setPromptOpen] = useState(false);
  const [addingIndex, setAddingIndex] = useState(0);
  const [activePage, setActivePage] = useState<PageItem | undefined>();
  const [draggingItem, setDraggingItem] = useState<PageItem | undefined>();

  const [pages, setPages] = useState<PageItem[]>(initPages);

  const needNewItem = (index: number) => {
    setAddingIndex(index)
    setPromptOpen(true)
  }

  const addNewItem = (pageName: string) => {
    const newItem = { id: `${pageName}-${pages.length}`, title: pageName};
    const newPages = [...pages];
    if (addingIndex < 0) {
      newPages.unshift(newItem)
    } else if (addingIndex > pages.length - 1) {
      newPages.push(newItem)
    } else {
      newPages.splice(addingIndex + 1, 0, newItem);
    }
    setPages(newPages)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  }),
    useSensor(TouchSensor, {
    activationConstraint: {
      distance: 3,
    },
  }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: typeof window !== 'undefined' && 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingItem(pages.find((item) => item.id === event.active.id));
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingItem(undefined);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = pages.findIndex((item) => item.id === active.id);
      const newIndex = pages.findIndex((item) => item.id === over?.id);
      setPages((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart} onDragEnd={handleDragEnd}
    >
      <div className={`flex items-center p-2 bg-white ${className}`}>
        <SortableContext
          items={pages.map(item => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          {
            // <SortableItem key={item.id} id={item.id} item={item} />
            pages.flatMap((page, index) => [
              <PageNavItem
                id={page.id}
                key={page.id}
                icon={page.icon || <FileText />}
                isActive={activePage === page}
                onClick={() => {
                  setActivePage(page);
                }}
              >
                {page.title}
              </PageNavItem>,
              <PageNavGapItem
                key={`${page.id}-gap`}
                disableHover={index >= pages.length - 1}
                hidden={!!draggingItem}
                onClick={() => needNewItem(index)}
              />,
              index >= pages.length - 1 && (
                <PageNavNewItem
                  key="add-last"
                  hidden={!!draggingItem}
                  icon={<Plus />}
                  onClick={() => needNewItem(index)}
                >
                  Add page
                </PageNavNewItem>
              )
            ].filter(Boolean))
          }
        </SortableContext>
        <DragOverlay>
          {draggingItem ? (
            <PageNavItem
              id={draggingItem.id}
              icon={draggingItem.icon || <FileText />}
              isActive={activePage === draggingItem}
            >
              {draggingItem.title}
            </PageNavItem>
          ): null}
        </DragOverlay>
        {isPromptOpen && (<PromptModal
          isOpen={isPromptOpen}
          onClose={() => setPromptOpen(false)}
          onSubmit={(value) => {
            addNewItem(value);
          }}
          title="Name your form page"
          placeholder="Please input your page name"
          initValue="Page"
        />)}
      </div>
    </DndContext>
  );
};

export default PageNav;