import React, { useRef } from 'react'

const TableColumn = ({ columnOrder, columnValue, setColumnOrder }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...columnOrder];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setColumnOrder(copyListItems);
  };

  return (
    <div className='flex gap-2 flex-col'>
      {columnOrder?.map((item, index) => (
        <div className='flex flex-row p-2 bg-neutral-50 justify-between items-center border border-neutral-700 border-dashed rounded-lg' key={index} draggable onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop}>
          <span>{columnValue[item]}</span>
          <i className="fa-solid fa-grip-lines"></i>
        </div>
      ))}
    </div>
  )
}

export default TableColumn;