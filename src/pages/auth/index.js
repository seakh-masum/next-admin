import React from 'react'
import { GLOBAL_STYLE } from 'shared/helper/ContstantData'

const Auth = ({ children }) => {
  return (
    <div className={`grid place-content-center ${GLOBAL_STYLE.surface} min-h-screen`}>
      <div className="w-[500px]">
        {children}
      </div>
    </div>
  )
}

export default Auth