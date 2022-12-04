import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from 'shared/helper/Firebase';
import { query, collection, where, getDocs } from "firebase/firestore";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { serialize } from 'cookie';
import { setExpiryDate } from "shared/helper/utility";
const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import { apiHandler } from "shared/helper/api-handler";



const { serverRuntimeConfig } = getConfig();

// export default apiHandler(handler);

export default async function handler(req, res) {
  const { body } = req;
  res.setHeader("Content-Type", "application/json");

  try {
    const user = await signInWithEmailAndPassword(auth, body.email, body.password),
      q = query(collection(db, FIRESTORE_PATH.users), where("uid", "==", user.user.uid)),
      singleDoc = await getDocs(q),
      userData = singleDoc.docs[0].data();
    // res.setHeader('Set-Cookie', serialize('token', userData.uid, { path: '/' }));
    // const token = jwt.sign({ sub: userData.uid }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    res.status(200).json({ data: userData, message: 'Login Successfully' });
  } catch (error) {
    res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}