import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId } = args;
      const { user } = request;

      const canSee = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      console.log("canSee : ", canSee);

      if (canSee) {
        return prisma.room({ id: roomId }).messages();
      } else {
        throw Error("you can't see this");
      }
    }
  }
};
