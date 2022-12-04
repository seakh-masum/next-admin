import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { db } from 'shared/helper/Firebase';
import { createUser } from "shared/helper/utility";


export default async function handler(req, res) {
  const { body } = req;
  // res.setHeader("Content-Type", "application/json");
  try {
    let userData;
    const user = createUser(body);
    const q = query(collection(db, FIRESTORE_PATH.users), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    userData = docs.docs.map(x => x.data());
    console.log(userData[0])
    if (userData.length === 0) {
      await addDoc(collection(db, FIRESTORE_PATH.users), {
        ...userData,
        authProvider: "google",
      })
    }
    res.status(200).json({ data: userData[0], message: 'Login Successfully' });
  } catch (err) {
    res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}