import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getSchedule: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const schedule = await prisma.user({ id: user.id }).schedules();

      console.log(schedule);
      //console.log(following.map(user => user.id).push(user.id))
      //console.log(following);
      return schedule;
    }
  }
};
