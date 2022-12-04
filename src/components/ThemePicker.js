import React, { useState, useEffect } from 'react'
import { ThemeContext } from 'shared/contexts/theme.context';
import { getAPI } from 'shared/helper/API';
import { STORAGE_KEY } from 'shared/helper/ContstantData';
import { checkDeviceType } from 'shared/helper/Service';
import { checkLocalStorage, getLocalStorage, setLocalStorage } from 'shared/helper/storage';
import { setColorVariable } from 'shared/helper/utility';

const ThemePicker = () => {
  const [loader, setLoader] = useState(false);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState('blue');
  const isMobile = checkDeviceType();


  const ThemePickerStyle = {
    ColorBox: 'grid grid-cols-3 p-3 gap-5',
    ThemeBox: 'grid grid-cols-3 p-3 gap-3 mb-4',
    Circle: 'w-full aspect-square rounded-full drop-shadow-sm hover:drop-shadow-xl border-4 border-solid flex justify-center items-center',
    Title: 'text-xs text-slate-700 pl-3 m-0 dark:text-slate-50',
  }


  useEffect(() => {
    setLoader(true);
    if (loader) {
      getAPI('/api/colors').then(res => {
        setColors(res);
      });
      if (checkLocalStorage(STORAGE_KEY.theme)) {
        const existingTheme = getLocalStorage(STORAGE_KEY.theme);
        setCurrentColor(existingTheme.name);
      }
    }

    return () => {
      console.log('done')
    }
  }, [loader]);


  const setTheme = (color) => {
    setCurrentColor(color.name)
    setColorVariable(color.value)
    setLocalStorage(STORAGE_KEY.theme, color);
  }


  return (
    <div className={`flex flex-col gap-8 w-[${isMobile ? 'full' : '400px'}]`}>
      <div className={ThemePickerStyle.ColorBox}>
        {colors?.map((color, index) => (
          <ThemeContext.Provider key={index} value={color.value}>
            <div key={index}
              className={ThemePickerStyle.Circle}
              style={{ background: `${color.value[500]}`, borderColor: `${currentColor == color.name ? color.value[300] : 'transparent'}` }}
              onClick={() => setTheme(color)}
            >
              {currentColor == color.name && <i className="fa-solid fa-check text-primary-300 text-4xl"></i>}
            </div>
          </ThemeContext.Provider>
        ))}
      </div>
    </div>
  )
}

export default ThemePicker