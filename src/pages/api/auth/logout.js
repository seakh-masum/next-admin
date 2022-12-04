import { signOut } from "firebase/auth";
import { auth } from 'shared/helper/Firebase';


export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    signOut(auth).then(() => {
      res.status(200).json({ message: 'User has logged out' });
    })
  } catch (error) {
    res.status(500).send({ ...error, message: 'Something went wrong' });
  }
}