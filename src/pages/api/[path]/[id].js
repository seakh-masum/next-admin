import { getSingleData } from "shared/helper/API";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "shared/helper/Firebase";

export default function handler(req, res) {

  const { body, query, method } = req;
  // res.setHeader("Content-Type", "application/json");

  switch (method) {
    case 'PUT':
      putAPI(query, body, res);
      break;

    case 'GET':
      getAPI(query, res);
      break;

    case 'DELETE':
      deleteAPI(query, res);
      break;

    default:
      break;
  }
}

const putAPI = (query, body, res) => {
  try {
    const docRef = doc(db, query.path, query.id)
    updateDoc(docRef, body).then(() => {
      return res.status(200).json({
        status: 'success',
        message: `${query.path} has successfully updated`,
      });
    })
  } catch (err) {
    return res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}

const getAPI = (query, res) => {
  try {
    getSingleData(query.id, query.path).then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}

const deleteAPI = (query, res) => {
  const docRef = doc(db, query.path, query.id)
  try {
    deleteDoc(docRef).then(() => {
      res.status(200).json({ status: 'success', message: 'Item has successfully deleted' });
    })
  } catch (err) {
    res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}