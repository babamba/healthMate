import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { scheduleId, planId } = args;

      const schedule = await prisma.schedule({ id: scheduleId });

      if (schedule) {
        await prisma.updateSchedule({
          where: { id: scheduleId },
          data: {
            plan: {
              connect: {
                id: planId
              }
            }
          }
        });
        // prisma
        //        .likesConnection({
        //             where:{ post :{ id :parent.id } }
        //        })
        //        .aggregate()
        //        .count(),
        console.log("length", schedule.length);
      } else {
        throw Error("You can't do that");
      }
      return schedule;
    }
  }
};
