import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import ChatItem from "../components/chatList/ChatItem";

export default function ChatList() {
  return (
    <View style={styles.frame}>
      <SimpleHeader title="채팅 목록" goBack="Main" />
      <Contour />
      <ScrollView>
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
        <ChatItem />
        <Contour style={{ opacity: 0.1 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
