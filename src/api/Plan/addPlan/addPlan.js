import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPlan: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { planTitle, exerciseType, planImage } = args;

      const plan = await prisma.createPlan({
        user: {
          connect: {
            id: user.id
          }
        },
        planTitle,
        exerciseType: {
          connect: {
            id: exerciseType
          }
        },
        planImage
      });

      return plan;

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
