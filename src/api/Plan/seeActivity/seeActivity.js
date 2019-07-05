import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeActivity: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { planId } = args;
      return prisma.plan({ id: planId }).activity();
    }
  }
};
