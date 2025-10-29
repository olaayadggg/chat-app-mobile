import { View, Text, Image, StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default function MessageItem({ message, employeeId, employeeImage }) {
    const { HR_IMAGE } = Constants.expoConfig.extra;
  const isMe = message.senderId === employeeId;
  const avatarUri = isMe
    ? employeeImage
    : HR_IMAGE;
    const timeStr = message.timestamp?.toDate
    ? message.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <View style={[styles.msgRow, isMe ? styles.msgRowRight : styles.msgRowLeft]}>
      {!isMe && <Image source={{ uri: avatarUri }} style={styles.avatar} />}
      <View>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.msgText, isMe && { color: "#fff" }]}>{message.text}</Text>
        </View>
        <Text style={[styles.msgTime, isMe ? styles.msgTimeRight : styles.msgTimeLeft]}>
          {timeStr}
        </Text>
      </View>
      {isMe && <Image source={{ uri: avatarUri }} style={styles.avatar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  msgRow: { marginVertical: 8, flexDirection: "row", alignItems: "flex-end" },
  msgRowLeft: { justifyContent: "flex-start" },
  msgRowRight: { justifyContent: "flex-end", alignSelf: "flex-end" },
  bubble: { maxWidth: "90%", padding: 10, borderRadius: 16 },
  bubbleMe: {
    backgroundColor: "#2563eb",
    marginRight: 4,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "#f3f4f6",
    marginLeft: 4,
    borderBottomLeftRadius: 4,
  },
  msgText: { fontSize: 15, color: "#111827" },
  msgTime: { fontSize: 11, color: "#6b7280", marginTop: 4 },
  msgTimeLeft: { textAlign: "left", marginLeft: 4 },
  msgTimeRight: { textAlign: "right", marginRight: 4 },
  avatar: { width: 34, height: 34, borderRadius: 17 },
});
