import { prisma } from "../../../generated/prisma-client";

//db필드에는 없는  computed 혹은 custom field(임의)
// resolver 에 있으니까 custom resolver
// parent 는 resolver를 call하는 resolver
// 여기서의 fullname의 parent는 위 resolver의 리턴된 user
// schema.js 에서 resolver들을 하나로 merge 하고있기때문에 다른 api에서도 fullName을 호출할 수 있다.

export default {
  Location: {
    user: ({ id }) => prisma.location({ id }).user()
  }
};
