import React, { useState } from 'react'
import Status from './Status';

const MiniCard = ({ topLeft, bottomLeft, topRight, bottomRight, onClickCard, onView, onEdit, onQrCode, onDelete }) => {

  const [isActionVisible, setActionVisibility] = useState(false);

  const style = {
    card: 'bg-white rounded-xl py-4 px-3 flex flex-col gap-1 justify-between mb-2 relative shadow-md dark:bg-neutral-800',
    leftSide: 'flex flex-col gap-1',
    rightSide: 'flex flex-col justify-between gap-3 items-end',
    heading: 'text-base font-medium text-black dark:text-white',
    desc: 'text-xs text-neutral-500 dark:text-neutral-300',
    iconContainer: 'flex flex-col items-center justify-center gap-1',
    icon: 'fa-solid text-neutral-600 dark:text-neutral-400',
    iconLabel: 'text-xs text-black dark:text-white',
  };

  const onClickTop = () => {
    setActionVisibility(state => state = !state);
  };

  return (
    <div className={style.card} onClick={onClickCard}>
      <div className='flex flex-row gap-1 justify-between' onClick={onClickTop}>
        <div className={style.leftSide}>
          <p className={style.heading}>
            {topLeft}
          </p>
          <p className={style.desc}>
            {bottomLeft}
          </p>
        </div>
        <div className={style.rightSide}>
          {/* <p>{topRight}</p> */}
          <Status value={topRight} type='tiny' />
          <p className='dark:text-white text-black'>{bottomRight}</p>
        </div>
      </div>
      {
        isActionVisible &&
        <div className='flex flex-row justify-around border-t border-neutral-200 pt-3 dark:border-neutral-700'>
          <div className={style.iconContainer} onClick={onView}>
            <i className={`fa-eye ${style.icon}`}></i>
            <span className={style.iconLabel}>View</span>
          </div>
          <div className={style.iconContainer} onClick={onEdit}>
            <i className={`fa-pen ${style.icon}`}></i>
            <span className={style.iconLabel}>Edit</span>
          </div>
          <div className={style.iconContainer} onClick={onDelete}>
            <i className={`fa-trash ${style.icon}`}></i>
            <span className={style.iconLabel}>Delete</span>
          </div>
          <div className={style.iconContainer} onClick={onQrCode}>
            <i className={`fa-qrcode ${style.icon}`}></i>
            <span className={style.iconLabel}>QR Code</span>
          </div>
        </div>
      }
    </div>
  )
}

export default MiniCard;