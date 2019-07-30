import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { plans, exerciseDate } = args;
      const { user } = request;

      const schedule = await prisma.createSchedule({
        user: {
          connect: {
            id: user.id
          }
        },
        exerciseDate
      });

      plans.forEach(async item => {
        // console.log("item", item);
        await prisma.updateSchedule({
          where: { id: schedule.id },
          data: {
            plan: {
              connect: {
                id: item
              }
            }
          }
        });
      });

      schedule.plan = await prisma.schedule({ id: schedule.id }).plan();

      return schedule;
    }
  }
};
