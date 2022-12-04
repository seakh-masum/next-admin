import { slugQuery } from "shared/helper/API";
import { onSnapshot } from "firebase/firestore";

export default function handler(req, res) {
  const { query } = req;
  const { slug } = query;
  // res.setHeader("Content-Type", "application/json");


  getApi(slug, res);
}

const getApi = (slug, res) => {
  try {
    onSnapshot(slugQuery(slug), (querySnapshot) => {
      let response = querySnapshot.docs.map((res) => ({ id: res.id, ...res.data() }))
      return res.status(200).json(response[0]);
    });
  } catch (error) {
    return res.status(500).send({ ...error, message: 'Something went wrong' })
  }
}