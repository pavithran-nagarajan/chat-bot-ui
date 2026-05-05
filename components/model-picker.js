import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MODELS } from "../constants/models";

export default function ModelPicker({ selectedModel, onModelChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Model</Text>
      <Picker
        selectedValue={selectedModel}
        onValueChange={onModelChange}
        style={styles.picker}
        dropdownIconColor="#aaa"
      >
        {MODELS.map((m) => (
          <Picker.Item key={m.value} label={m.label} value={m.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    paddingHorizontal: 12,
  },
  label: {
    color: "#888",
    fontSize: 11,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  picker: {
    color: "#fff",
    height: 50,
  },
});