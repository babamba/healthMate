import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { scheduleId, planId } = args;

      const schedule = await prisma.schedule({ id: scheduleId });

      if (schedule) {
        return await prisma.updateSchedule({
          where: { id: scheduleId },
          data: {
            plan: {
              connect: {
                id: planId
              }
            }
          }
        });
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
