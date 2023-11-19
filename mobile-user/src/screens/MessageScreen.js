import { View } from "react-native";
import * as React from "react";
import * as TalkRn from "@talkjs/expo";

export default function MessageScreen() {
  const me = {
    id: "4",
    name: "Pembeli",
    role: "default",
  };

  const other = {
    id: "3",
    name: "Penjual",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder("qwerty");

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);
  return (
    <TalkRn.Session appId="tjsSPkAZ" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}
