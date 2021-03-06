import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args, { request }) => {
        // console.log("newMessage", request.user);
        const { roomId } = args;
        console.log("new subscription ");
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};
