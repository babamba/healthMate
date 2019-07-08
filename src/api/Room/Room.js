import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    messages: ({ id }) =>
      prisma.room({ id }).messages({ orderBy: "createdAt_DESC" }),
    lastMessage: ({ id }) => prisma.room({ id }).messages({ last: 1 }),

    person: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.room({ id }).participants({
        where: {
          NOT: {
            id_contains: user.id
          }
        }
      });
    },

    me: (_, __, { request }) => {
      const { user } = request;
      return prisma.user({ id: user.id });
    }
  }
};
