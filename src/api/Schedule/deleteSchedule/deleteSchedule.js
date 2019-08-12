import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { scheduleId, planId } = args;

      const schedule = await prisma.schedule({ id: scheduleId });

      console.log("schedule : ", schedule);
      console.log("planId : ", planId);

      if (schedule) {
        return await prisma.updateSchedule({
          where: { id: scheduleId },
          data: {
            plan: {
              disconnect: {
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
