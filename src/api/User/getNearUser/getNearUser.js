import { prisma } from "../../../../generated/prisma-client";
import rad2Deg from "rad2deg";
import deg2Rad from "deg2rad";

export default {
  Query: {
    getNearUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);

      // constant somewhere
      const EARTH_RADIUS_KM = 6371;
      const DISTANCE = 1;
      const { user } = request;

      const latitude = await prisma
        .user({ id: user.id })
        .location()
        .latitude();
      const longitude = await prisma
        .user({ id: user.id })
        .location()
        .longitude();

      const maxLat = latitude + rad2Deg(DISTANCE / EARTH_RADIUS_KM);
      const minLat = latitude - rad2Deg(DISTANCE / EARTH_RADIUS_KM);

      const maxLon =
        longitude +
        rad2Deg(DISTANCE / EARTH_RADIUS_KM / Math.cos(deg2Rad(latitude)));
      const minLon =
        longitude -
        rad2Deg(DISTANCE / EARTH_RADIUS_KM / Math.cos(deg2Rad(latitude)));

      //  console.log("location : ", latitude);
      //  console.log("location : ", longitude);
      //  console.log("maxLat : ", maxLat);
      //  console.log("minLat : ", minLat);
      //  console.log("maxLon : ", maxLon);
      //  console.log("minLon : ", minLon);

      console.log("DISTANCE : ", DISTANCE, "KM");
      console.log("EARTH_RADIUS_KM : ", EARTH_RADIUS_KM, "KM");

      //  const nearUser = await prisma.users({
      //    where: {
      //      location: {
      //        AND: [
      //          {
      //            lat_gte: minLat,
      //            lat_lte: maxLat,
      //            lon_gte: minLon,
      //            lon_lte: maxLon
      //          }
      //        ]
      //      }
      //    }
      //  });
      //const me = prisma.users({ id: user.id });

      return await prisma.users({
        where: {
          location: {
            latitude_gte: minLat,
            latitude_lte: maxLat,
            longitude_gte: minLon,
            longitude_lte: maxLon
          },
          NOT: {
            location: {
              user: {
                id_in: user.id
              }
            }
          }
        },
        orderBy: "createdAt_DESC"
      });

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
