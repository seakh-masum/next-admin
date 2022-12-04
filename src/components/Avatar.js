import React from 'react'

const Avatar = ({ url, title, size }) => {

  const sizeStyle = size == 'xl' ? 'w-14 h-14' : 'w-9 h-9';
  const textStyle = size == 'xl' ? 'text-3xl' : 'text-xl';


  return (
    <>
      {url ?
        <img src={url} className={`${sizeStyle} rounded-full border-primary-500 border-2`} /> :
        <div className={`${sizeStyle} rounded-full bg-primary-500 grid place-content-center`}>
          <span className={`${textStyle} text-white`}>{title.charAt() || 'A'}</span>
        </div>
      }
    </>
  )
}

export default Avatar