import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { scheduleId } = args;

      const schedule = await prisma.schedule({ id: scheduleId });

      if (schedule) {
        prisma.deleteSchedule({ id: scheduleId });
      } else {
        throw Error("You can't do that");
      }

      return schedule;

      // const plan = await prisma.createPlan({
      //   user: {
      //     connect: {
      //       id: user.id
      //     }
      //   },
      //   planTitle,
      //   exerciseType: {
      //     connect: {
      //       id: exerciseType
      //     }
      //   },
      //   planImage
      // });

      // plans.forEach(async item => {
      //   // console.log("item", item);
      //   await prisma.updateSchedule({
      //     where: { id: schedule.id },
      //     data: {
      //       plan: {
      //         connect: {
      //           id: item
      //         }
      //       }
      //     }
      //   });
      // });

      //schedule.plan = await prisma.schedule({ id: schedule.id }).plan();
    }
  }
};
