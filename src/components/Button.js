import React, { useState, useEffect, forwardRef } from "react";
import { BUTTON_COLOR, BUTTON_SIZE, BUTTON_VARIANT } from "shared/helper/ContstantData";

const Button = forwardRef((props, ref) => {
  const commonProperty = 'inline-flex items-center justify-center';
  const { title, variant, clickEvent, size, icon, loader, type, color } = props;

  const [variants, setVariants] = useState(commonProperty + 'shadow-lg border-primary-500');
  const [sizes, setSizes] = useState("text-lg py-2 px-6 min-w-[120px] rounded-md border-2");
  const [colors, setColors] = useState('bg-primary-500 text-white');


  useEffect(() => {

    if (color == BUTTON_COLOR.warn) {
      setColors('bg-red-400 text-white border-red-400');
    } else if (color == BUTTON_COLOR.accent) {
      setColors('bg-primary-100 text-primary-500');
    } else if (color == BUTTON_COLOR.primary) {
      setColors('bg-primary-500 text-white');
    }


    if (size == BUTTON_SIZE.full) {
      setSizes('w-full text-lg py-2 px-6 rounded-xl border-2');
    } else if (size == BUTTON_SIZE.mini) {
      setSizes('py-2 px-5 text-base rounded-2xl');
    } else if (size == BUTTON_SIZE.normal) {
      setSizes('text-lg py-2 px-6 min-w-[120px] rounded-md');
    } else if (size == BUTTON_SIZE.rounded) {
      setSizes('p-4 rounded-full')
    }

    switch (variant) {
      case BUTTON_VARIANT.flat:
        setVariants(`${commonProperty} shadow-lg border-primary-500`);
        break;

      case BUTTON_VARIANT.raised:
        setVariants(`${commonProperty} shadow-xl border-primary-500`);
        break;

      case BUTTON_VARIANT.outline:
        setVariants(`${commonProperty} shadow-xl border-primary-500`);
        setColors('bg-white text-primary-500');
        break;

      case BUTTON_VARIANT.link:
        setVariants(commonProperty);
        setColors('bg-transparent text-primary-700');
        break;

      case BUTTON_VARIANT.icon:
        setVariants(commonProperty);
        setSizes('p-4 rounded-full')
        break;

      default:
        setVariants(`${commonProperty} shadow-lg border-primary-500`);
        break;
    }
    // let primaryClassName = commonProperty +
    //   " bg-primary-500 text-white py-2 px-6 border-2 min-w-[120px] text-lg rounded-md dark:bg-white dark:border-white dark:text-black shadow-primary-500/50";
    // setClassName(primaryClassName);
    // if (variant === "outline") {
    //   setClassName(commonProperty +
    //     "bg-white text-primary-500 py-2 px-6 border-2 min-w-[120px] text-lg rounded-md dark:bg-neutral-800 dark:border-white dark:text-white"
    //   );
    // } else if (variant == 'link') {
    //   setClassName('text-primary-500')
    // } else if(variant == 'warn') {
    //   setClassName(commonProperty +
    //     "bg-red-400 text-white py-2 px-6 border-2 min-w-[120px] text-lg rounded-md dark:bg-neutral-800 dark:border-white dark:text-white"
    //   );
    // }

    // if (size == 'full') {
    //   setWidth('w-full');
    // } else if (size == 'tiny') {
    //   setClassName(commonProperty + 'bg-primary-100 text-primary-700 py-2 px-4 rounded-xl text-base')
    // }
  }, [variant, size, color]);

  return (
    <button ref={ref} type={type} className={`${variants} ${sizes} ${colors}`} onClick={clickEvent}>
      {loader && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
      {icon && <i className={`${icon} mr-2`}></i>}
      {variant != BUTTON_VARIANT.icon && title}
    </button>
  );
});

export default Button;
