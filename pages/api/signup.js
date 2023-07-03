import { prisma } from "../../lib/prismaClient";
import bcrypt from "bcryptjs";

export default async function registerUser(req, res) {
  const { username, email, password } = req.body;
  // console.log(username);
  // console.log(email);
  // console.log(password);
  const user = await prisma.user.findUnique({
    where: { username },
  });

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail !== null || user !== null) {
    return res.send({ user: null, message: "User already exists! 😫" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.send({
    user: newUser,
    message: "😊😊😊User created successfully",
  });
}
