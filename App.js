import React, { useState, useRef } from "react";
import { FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ModelPicker from "./components/model-picker";
import ChatBubble from "./components/chat-bubble";
import ChatInput from "./components/chat-input";

export default function App() {
  const MODELS = [
    { label: "Claude Sonnet 4", value: "claude-sonnet-4" },
    { label: "Claude Haiku 4.5", value: "claude-haiku-4-5" },
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
  ];
  const [selectedModel, setSelectedModel] = useState(MODELS[0].value);
  const [messages, setMessages] = useState([
    { id: "0", role: "assistant", content: "Hi! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const handleSend = async (text) => {
    const userMsg = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `[${selectedModel}] You said: "${text}"`,
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ModelPicker selectedModel={selectedModel} onModelChange={setSelectedModel} />
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            onContentSizeChange={() => listRef.current?.scrollToEnd()}
            style={styles.chat}
            contentContainerStyle={{ padding: 12 }}
          />
          <ChatInput onSend={handleSend} disabled={loading} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f0f0f" },
  flex: { flex: 1 },
  chat: { flex: 1 },
});