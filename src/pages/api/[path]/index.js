import { onSnapshot, addDoc, collection } from "firebase/firestore";
import { get, fsQuery, fsQueryWithOrderBy } from "shared/helper/API";
import { db } from "shared/helper/Firebase";


export default function handler(req, res) {

  const { query, body } = req;
  const { path } = query;
  // res.setHeader("Content-Type", "application/json");


  switch (req.method) {
    case 'GET':
      getAllApi(query, res, path);
      break;

    case 'POST':
      createAPI(body, path, res);
      break;

    default:
      break;
  }
}


const getAllApi = (query, res) => {
  try {
    const q = query.sort ? fsQueryWithOrderBy(query) : fsQuery(query.path);
    onSnapshot(q, (querySnapshot) => {
      const responseJSON = get(querySnapshot, query);
      return res.status(200).json(responseJSON);
    });
  } catch (error) {
    return res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}

const createAPI = (body, path, res) => {
  try {
    addDoc(collection(db, path), body).then(() => {
      return res.status(201).json({
        status: 'success',
        message: `Item has successfully added`,
      });
    })
  } catch (error) {
    return res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}


const getBillAPi = (data) => {
  let billStatus;
  if (data.paidDate != '') {
    billStatus = 'paid';
  } else if (new Date() > new Date(data.dueDate)) {
    billStatus = 'overdue';
  } else {
    billStatus = 'due';
  }

  console.log({ ...data, billStatus })
  return { ...data, billStatus };
};