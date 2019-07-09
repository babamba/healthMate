import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      //console.log(prisma)
      const {
        username,
        email,
        firstName = "",
        lastName = "",
        bio = "",
        password
      } = args;
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      if (exists) {
        throw Error("This username is already taken");
      }
      // try {
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
        password: hashedPassword
      });
      return true;
      // } catch (error) {
      //      console.log(error);
      //      return false;
      // }

      //return null
    }
  }
};
