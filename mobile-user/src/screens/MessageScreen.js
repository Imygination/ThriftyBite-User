import { View } from "react-native";
import * as React from "react";
import * as TalkRn from "@talkjs/expo";
import { useRoute } from "@react-navigation/native";

export default function MessageScreen() {
  const { StoreId, userId } = useRoute().params;
  console.log({ StoreId, userId });

  const me = {
    id: userId,
    name: "Pembeli",
    role: "default",
  };

  const other = {
    id: StoreId,
    name: "Penjual",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(`user${userId}-store${StoreId}`);

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);
  return (
    <TalkRn.Session appId="tjsSPkAZ" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}
