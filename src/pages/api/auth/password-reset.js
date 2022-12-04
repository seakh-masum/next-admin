import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from 'shared/helper/Firebase';


export default async function handler(req, res) {
  const { body } = req;
  res.setHeader("Content-Type", "application/json");

  try {
    await sendPasswordResetEmail(auth, body.email).then(() => {
      res.status(200).json({ message: 'Password reset email successfully sent' });
    })
  } catch (err) {
    res.status(500).send({ ...err, message: 'Something went wrong' });
  }
}