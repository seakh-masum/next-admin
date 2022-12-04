import React from 'react'
import { cardNumber } from 'shared/helper/Service';
import { CARD_NETWORK } from 'shared/helper/ContstantData';
import { makeExpiryDate } from 'shared/helper/utility';
const CreditCard = ({ data }) => {

  const { network } = data;
  const visaIcon = 'https://cdn-icons-png.flaticon.com/512/196/196578.png',
    mastercardIcon = 'https://img.icons8.com/color/512/mastercard-logo.png',
    rupayIcon = 'https://img.icons8.com/color/512/rupay.png';
  const getNetworkIcon = (network) => {
    switch (network) {
      case 'visa':
        return visaIcon;

      case 'master_card':
        return mastercardIcon;

      case 'rupay':
        return rupayIcon;

      default:
        return '';
    }
  }

  return (
    <div className={`flex flex-col justify-between bg-gradient-to-r from-${data.color}-800 to-${data.color}-500 h-56 min-w-[24rem] p-3 rounded-2xl`}>
      <div className='flex flex-row justify-between items-center'>
        <p className='text-2xl text-white'>{data.cardName}</p>
        <img className='h-10' src={getNetworkIcon(network)} />
      </div>
      <div className='flex flex-col'>
        <p className='text-2xl tracking-widest text-white font-montserrat'>{cardNumber(data.cardNo)}</p>
        <div className='flex flex-row justify-between items-end'>
          <p className='text-xl text-white'>{data.holderName}</p>
          <p className='text-neutral-300 text-md'>{makeExpiryDate(data.expiryDate)}</p>
        </div>
      </div>
    </div>
  )
}

export default CreditCard;