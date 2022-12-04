import React, { useState } from 'react'
import { makeArrayFromObject } from 'shared/helper/Service';
import Select from './Select';

const QRCode = ({ formData, columnValue }) => {

  const defaultValue = JSON.stringify(formData);
  const defaultArray = [{ label: 'All', value: '' }];

  const [qrField, setQrField] = useState('');
  const [qrValue, setQrValue] = useState(defaultValue);

  const changeQrField = (e) => {
    const { value } = e.target;
    setQrField(value);
    setQrValue(value == '' ? defaultValue : formData[value]);
  }


  return (
    <>
      <Select name='qr' label='Select field to generate QR Code' value={qrField} onChange={changeQrField} options={makeArrayFromObject(columnValue, defaultArray)} />
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${qrValue}`} />
    </>
  )
}

export default QRCode