import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePlan: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const plan = await prisma.user({ id: user.id }).plan();
      //console.log(following.map(user => user.id).push(user.id))
      //console.log(following);
      return plan;
    }
  }
};
