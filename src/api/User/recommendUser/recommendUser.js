import { prisma } from "../../../../generated/prisma-client";
import rad2Deg from "rad2deg";
import deg2Rad from "deg2rad";

export default {
  Query: {
    recommendUser: async (_, args, { request, isAuthenticated }) => {
      //  isAuthenticated(request);

      //  const { user } = request;

      const user = await prisma.users({
        first: 5,
        orderBy: "createdAt_DESC"
      });

      return user;
      // lastMessage: ({ id }) => prisma.room({ id }).messages({ last: 1 }),
      //  const nearUser = await prisma.locations({
      //    where: {
      //      latitude_gte: minLat,
      //      latitude_lte: maxLat,
      //      longitude_gte: minLon,
      //      longitude_lte: maxLon
      //    }
      //  });

      //const following = await prisma.user({ id: user.id }).following();
      //console.log(following.map(user => user.id).push(user.id))
      //console.log(following);
      //  return prisma.posts({
      //    where: {
      //      user: {
      //        id_in: [...following.map(user => user.id), user.id]
      //      }
      //    },
      //    orderBy: "createdAt_DESC"
      //  });
    }
  }
};
