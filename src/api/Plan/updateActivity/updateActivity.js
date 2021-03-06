import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const UPDATE = "UPDATE";

export default {
  Mutation: {
    updateActivity: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const { activityId, title, second, count, set, action } = args;

      const activity = await prisma.activity({ id: activityId });
      const plan = await prisma.activity({ id: activityId }).plan();

      if (activity) {
        if (action === UPDATE) {
          await prisma.updateActivity({
            where: {
              id: activityId
            },
            data: {
              title,
              second,
              count,
              set
            }
          });
        } else if (action === DELETE) {
          await prisma.deleteActivity({ id: activityId });
        } else {
          throw Error("You can't do that");
        }
      }

      console.log(plan);
      return plan;
    }
  }
};
