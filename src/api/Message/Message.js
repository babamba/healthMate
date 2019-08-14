import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    from: ({ id }) => prisma.message({ id }).from(),
    to: ({ id }) => prisma.message({ id }).to(),
    room: ({ id }) => prisma.message({ id }).room(),
    _id: ({ id }) => {
      return id;
    },
    user: ({ id }) => {
      const returnObj = {
        _id: prisma
          .message({ id })
          .from()
          .id(),
        name: prisma
          .message({ id })
          .from()
          .username(),
        avatar: prisma
          .message({ id })
          .from()
          .avatar()
      };

      return returnObj;
    }
  }
};
