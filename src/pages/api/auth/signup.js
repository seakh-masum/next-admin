import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from 'shared/helper/Firebase';
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { body } = req;
  res.setHeader("Content-Type", "application/json");

  try {
    const response = await createUserWithEmailAndPassword(auth, body.email, body.password);
    const { email, emailVerified, isAnonymous, phoneNumber, photoURL, uid } = response.user;
    await addDoc(collection(db, "users"), {
      uid: uid,
      name: body.name,
      authProvider: "local",
      email: body.email,
    }).then(() => {
      const currentUser = { displayName: body.name, email, emailVerified, isAnonymous, phoneNumber, photoURL };
      res.status(200).json({ data: currentUser, message: 'Signup Successfully' });
    })
  } catch (err) {
    res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}