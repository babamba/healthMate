import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const UPDATE = "UPDATE";

export default {
  Mutation: {
    updatePlan: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { planId, planTitle, exerciseType, planImage, action } = args;
      console.log("planId :", planId);

      const plan = await prisma.plan({ id: planId });

      if (plan) {
        if (action === UPDATE) {
          await prisma.updatePlan({
            where: {
              id: planId
            },
            data: {
              planTitle,
              exerciseType: {
                connect: {
                  id: exerciseType
                }
              },
              planImage
            }
          });
        } else if (action === DELETE) {
          await prisma.deletePlan({ id: planId });
        } else {
          throw Error("You can't do that");
        }
      }

      return plan;

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
