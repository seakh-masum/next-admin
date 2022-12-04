import { db } from 'shared/helper/Firebase';
import { collection, updateDoc, query, where, getDocs, doc } from "firebase/firestore";
import { FIRESTORE_PATH } from 'shared/helper/ContstantData';

export default async function handler(req, res) {
  const { body } = req;
  res.setHeader("Content-Type", "application/json");

  try {
    const q = query(collection(db, FIRESTORE_PATH.users), where("uid", "==", body.uid)),
      singleDoc = await getDocs(q),
      data = singleDoc.docs[0].data(),
      id = singleDoc.docs[0].id,
      docRef = doc(db, FIRESTORE_PATH.users, id),
      updatedData = { ...data, ...body };
    updateDoc(docRef, updatedData).then(() => {
      return res.status(200).json({
        status: 'success',
        data: updatedData,
        message: `user has successfully updated`,
      });
    })
  } catch (err) {
    res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}