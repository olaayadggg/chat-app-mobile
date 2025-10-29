import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

export default function ChatInput({ text, setText, sendMessage, employeeImage }) {
    const isDisabled = text.trim().length === 0;
  return (
    <View style={styles.inputRow}>
      <Image source={{ uri: employeeImage }} style={[styles.avatar, { marginRight: 8 }]} />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Message HR..."
        style={styles.input}
      />
      <TouchableOpacity onPress={!isDisabled ? sendMessage : null}
        activeOpacity={isDisabled ? 1 : 0.7}
        style={[styles.sendBtn, isDisabled && styles.sendBtnDisabled ]}>
        <Text style={styles.sendTxt}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  sendBtnDisabled: {
    backgroundColor: "#9ca3af", 
  },
  sendTxt: { color: "#fff", fontWeight: "600" },
  avatar: { width: 34, height: 34, borderRadius: 17 },
});
