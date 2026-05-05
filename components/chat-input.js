import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="#555"
        multiline
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled]}
        onPress={handleSend}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{disabled ? "..." : "Send"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    backgroundColor: "#1a1a1a",
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 120,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#2f6ef5",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  disabled: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});