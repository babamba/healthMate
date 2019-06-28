import { prisma } from "../../../../generated/prisma-client"

export default{
     Mutation:{
          createAccount : async(_, args,) => {
               //console.log(prisma)
               const { username, email, firstName="", lastName="", bio="" } = args;
               const exists = await prisma.$exists.user({
                    OR:[
                         { username },
                         { email }
                    ]
               })
               if(exists){
                    throw Error("This username is already taken")
               }
               // try {
               await prisma.createUser({
                    username,
                    email, 
                    firstName, 
                    lastName, 
                    bio
               })
               return true;
               // } catch (error) {
               //      console.log(error);
               //      return false;
               // }
               
               //return null
          }
     }
};