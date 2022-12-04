import { doc, updateDoc } from "firebase/firestore";
import { db } from "shared/helper/Firebase";

export default function handler(req, res) {
  const { body, query } = req;
  // res.setHeader("Content-Type", "application/json");

  try {
    const docRef = doc(db, 'table-columns', query.id)
    updateDoc(docRef, body).then(() => {
      return res.status(200).json({
        status: 'success',
        message: `Table column has successfully updated`,
      });
    })
  } catch (err) {
    return res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}