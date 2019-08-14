import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    ReceiveMessage: {
      subscribe: (_, args, { request }) => {
        const { userId } = args;
        // const { user } = request;
        console.log("new subscription userId : ", userId);

        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { participants_some: { id: userId } }
                  // rooms: { participants_every: { id: userId } }
                }
              }
            ]
          })
          .node();

        // console.log(subscriptionRoom);
        // return subscriptionRoom;
      },
      resolve: payload => payload
    }
  }
};
