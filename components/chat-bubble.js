import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 4,
  },
  rowUser: { justifyContent: "flex-end" },
  rowBot: { justifyContent: "flex-start" },
  bubble: {
    maxWidth: "75%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: "#2f6ef5",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#2a2a2a",
    borderBottomLeftRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 21,
  },
});