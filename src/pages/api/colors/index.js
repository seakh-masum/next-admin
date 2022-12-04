import { onSnapshot } from "firebase/firestore";
import { fsQuery } from "shared/helper/API";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";


export default function handler(req, res) {

  const { query, body } = req;
  const { path } = query;

  try {
    onSnapshot(fsQuery(FIRESTORE_PATH.colors), (querySnapshot) => {
      // const responseJSON = get(querySnapshot, query);
      const responseJSON = querySnapshot.docs.map((doc => ({ id: doc.id, ...doc.data() })));
      return res.status(200).json(responseJSON);
    });
  } catch (error) {
    return res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}