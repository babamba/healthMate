import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeExercise: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const exercises = await prisma.exercises();
      //console.log(following.map(user => user.id).push(user.id))
      //console.log(following);
      return exercises;
    }
  }
};
