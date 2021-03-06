import { prisma } from "../../../../generated/prisma-client";

const NEW_MESSAGE = "newMessage";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;

      let room;
      console.log("roomId", roomId);
      console.log("message", message);
      //채팅방이 없으면 채팅방 개설
      if (roomId === undefined) {
        //나자신과 방은 만들게 하지않기위해
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              // to : 메시지 받는사람
              // 두번째 메세지를 보내는사람
              connect: [{ id: toId }, { id: user.id }]
            }
          });
          room.participants = await prisma.room({ id: room.id }).participants();
        }
      } else {
        //채팅방이 있을경우 채팅방 찾아서 넣기
        room = await prisma.room({ id: roomId });
        console.log(room);
        room.participants = await prisma.room({ id: roomId }).participants();
        room.message = await prisma.room({ id: roomId }).messages();
      }

      if (!room) {
        throw Error("Room not found");
      }
      //const participantList = prisma.room({ id: room.id }).participants();

      //console.log("room", room);
      //  console.log("participantList", participantList);

      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      )[0];

      const newMessage = prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });

      pubsub.publish(NEW_MESSAGE, {
        newMessage
      });

      return newMessage;
    }
  }
};
