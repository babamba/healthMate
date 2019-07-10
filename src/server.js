import dotenv from "dotenv";
import path from "path";
// dotenv.config({path: path.resolve(__dirname, ".env")});
import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController } from "./upload";

const PORT = process.env.PORT || 4000;
const pubsub = new PubSub();
const server = new GraphQLServer({
  //typeDefs, resolvers
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
  pubsub
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);
//server.express.use(passport.authenticate("jwt"));

server.start({ port: PORT }, () =>
  console.log(`🎉🎉  SERVER running on http://localhost:${PORT}`)
);

// console.log(__dirname)

// const typeDefs = `
//      type Query{
//           hello:String!
//      }
// `

// const resolvers = {
//      Query: {
//           hello : () => "Hi"
//      }
// }
