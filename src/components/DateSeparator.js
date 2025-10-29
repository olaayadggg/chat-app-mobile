import { View, Text, StyleSheet } from "react-native";

export default function DateSeparator({ date }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <Text style={styles.text}>{date}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#6b7280",
  },
});
