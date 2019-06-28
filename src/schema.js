import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

// defTypes 와 resolver를 하나로 묶어준다.
// 각 API의 fragment 들로 각각의 다른 모델들을 검색하는 작업해야할 일을 따로만들어서 같이 머지시켜 검색할 수 있게한다.

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
