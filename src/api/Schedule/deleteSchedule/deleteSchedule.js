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
        await prisma.updateSchedule({
          where: { id: scheduleId },
          data: {
            plan: {
              disconnect: {
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

      //     try {
      //       await prisma.updateUser({
      //            where : { id: user.id},
      //            data : {
      //                 following:{
      //                      disconnect:{
      //                           id
      //                      }
      //                 }
      //            }
      //       });
      //       return true;
      //  } catch (error) {
      //       return false;
      //  }

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
