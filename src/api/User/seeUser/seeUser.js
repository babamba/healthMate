import { prisma } from "../../../../generated/prisma-client";

export default {
     Query : {
          seeUser: async(_,args) => {
               //isAuthenticated(request);
               const { username } = args;
               // const user = await prisma.user({ id});
               // const posts = await prisma.user({ id }).posts();
               // return{
               //      user,
               //      posts
               // }
               return prisma.user({username})
          }
     }
}