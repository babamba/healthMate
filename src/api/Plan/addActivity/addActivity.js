import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addActivity: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      //const { user } = request;
      // planId: String!, title: String!, second: Int , count: Int, set: String
      //const { planId, title, second = 0, count = 0, set = "" } = args;
      const { items } = args;
      const planId = items[0].planId;
      // console.log(items[0]);
      // console.log(planId);

      //const plan = await prisma.plan({ id: planId });

      items.forEach(async item => {
        // console.log("count", item.count);
        // console.log("second", item.second);
        // console.log("set", item.set);
        // console.log("title", item.title);
        // console.log("planId", item.planId);

        await prisma.createActivity({
          count: item.count,
          second: item.second,
          set: item.set,
          title: item.title,
          plan: {
            connect: {
              id: item.planId
            }
          }
        });
      });

      const plan = await prisma.plan({ id: planId });
      // plan.activity = await prisma.plan({ id: planId }).activity();

      // console.log(plan);
      return plan;

      // const activity = await prisma.createActivity({
      //   user: {
      //     connect: {
      //       id: user.id
      //     }
      //   },
      //   plan: {
      //     connect: {
      //       id: planId
      //     }
      //   },
      //   title,
      //   second,
      //   count,
      //   set
      // });

      // return activity;

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
