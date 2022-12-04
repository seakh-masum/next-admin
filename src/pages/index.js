import CreditCard from 'components/CreditCard'
import MiniCard from 'components/MiniCard';
import TopRow from 'components/TopRow';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getAPI } from 'shared/helper/API';
import { FIRESTORE_PATH } from 'shared/helper/ContstantData';

const index = () => {
  const [cards, setCards] = useState([]);
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCreditCards();
    getDocuments();
  }, []);


  const getCreditCards = () => {
    getAPI(`/api/${FIRESTORE_PATH.cards}?page=1&limit=8`)
      .then(res => {
        setCards(res.data);
      }).catch(err => {
        console.log(err)
      });
  }

  const getDocuments = () => {
    getAPI(`/api/${FIRESTORE_PATH.docs}?page=1&limit=8`)
      .then(res => {
        setDocuments(res.data);
      }).catch(err => {
        console.log(err)
      });
  }

  const onViewAllCards = () => {
    onRouter('cards');
  }

  const onViewAllDocuments = () => {
    onRouter('documents');
  }

  const onRouter = (path) => {
    router.push(`/${path}`);
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 p-3'>
        <TopRow title='My Cards' onViewAll={onViewAllCards} />
        <div className='flex flex-row gap-3 overflow-x-auto'>
          {cards.map((item, index) => (
            <CreditCard key={index} data={item} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-5 p-3'>
        <TopRow title='My Documents' onViewAll={onViewAllDocuments} />
        <div className='flex flex-row gap-3 py-5 overflow-x-auto'>
          {documents.map((item, index) => (
            <MiniCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default index