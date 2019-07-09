import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
import bcryptjs from "bcryptjs";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      const user = await prisma.user({ email });

      const compare = bcryptjs.compareSync(password, user.password);
      console.log("password compare", compare);

      if (compare) {
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/password");
      }

      //  if (user.loginSecret === secret) {
      //    await prisma.updateUser({
      //      where: {
      //        id: user.id
      //      },
      //      data: {
      //        loginSecret: ""
      //      }
      //    });
      //    return generateToken(user.id);
      //  } else {
      //    throw Error("Wrong email/secret combination");
      //  }
    }
  }
};
