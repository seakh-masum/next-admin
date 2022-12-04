import React, { useState, useEffect } from 'react'
import { PAGE_SIZE_OPTIONS } from 'shared/data/SelectionData';
import Select from './Select'

const Paginator = (props) => {
  const { totalItem, currentPage, setCurrentPage } = props;
  const [displayPages, setDisplayPages] = useState([]);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0].value);

  const makeArray = (number) => {
    return Array.from({ length: Math.round(number) }, (_, i) => i + 1);
  }

  useEffect(() => {
    let pageArrayLength = totalItem / Number(pageSize)
    if (pageArrayLength > 3) {
      setDisplayPages(makeArray(pageArrayLength).slice(currentPage - 1, currentPage + 2));
    } else {
      setDisplayPages(makeArray(pageArrayLength > 0.5 ? pageArrayLength : 1));
    }

    props.limit(pageSize);
  }, [pageSize, totalItem, currentPage])

  const changePageSize = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
  }

  const clickPageNbr = (pageNbr) => {
    setCurrentPage(pageNbr);
  }

  const style = {
    li: 'm-1 aspect-square rounded-md text-center leading-10 h-10 transition duration-150 ease-in-out hover:border-2 text-neutral-700 bg-neutral-100 hover:border-primary-700 hover:text-primary-700 hover:scale-105 disabled:text-neutral-400 dark:bg-neutral-600 dark:text-white',
    activeLi: 'border-2 border-primary-500 text-primary-500 scale-105 dark:bg-neutral-600 dark:text-white dark:border-white',
  }

  return (
    <div className='flex flex-row justify-between items-center pt-1'>
      <div className='inline-flex items-center gap-4'>
        <h2 className='text-black dark:text-white'>Item per page:</h2>
        <Select options={PAGE_SIZE_OPTIONS} onChange={changePageSize} value={pageSize} />
      </div>
      <div className='inline-flex'>
        <button className={style.li} disabled={currentPage == 1} onClick={() => clickPageNbr(1)}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button className={style.li} disabled={currentPage == 1} onClick={() => clickPageNbr(currentPage - 1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {displayPages?.map((page, index) => (
          <button key={index} className={`${style.li} ${currentPage == page ? style.activeLi : ''}`} onClick={() => clickPageNbr(page)}>
            {page}
          </button>
        ))}
        <button className={style.li} disabled={displayPages[displayPages.length - 1 === totalItem / pageSize]} onClick={() => clickPageNbr(currentPage + 1)}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button className={style.li} disabled={displayPages[displayPages.length - 1 === totalItem / pageSize]} onClick={() => clickPageNbr(totalItem / Number(pageSize))}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  )
}

export default Paginator