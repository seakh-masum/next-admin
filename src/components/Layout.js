import React, { useState } from 'react'
import Header from './Header';
import { Sidenav } from './Sidenav';

const Layout = (props) => {
  const [isSidenavOpen, setSidenavState] = useState(false);
  return (
    <div className='h-screen bg-neutral-50 dark:to-neutral-700 dark:from-neutral-900 dark:via-neutral-800'>
      {/* bg-gradient-to-b from-primary-100 to-neutral-100 */}
      <Header onClickMenu={() => setSidenavState(!isSidenavOpen)} />
      <>
        {isSidenavOpen && <Sidenav closeSidenav={() => setSidenavState(false)} isOpen={isSidenavOpen} />}
      </>
      <div className={`pt-4 min-h-screen dark:bg-neutral-900`}>
        {props.children}
      </div>
    </div>
  )
}

export default Layout