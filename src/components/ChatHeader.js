import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Bell } from "lucide-react-native";

export default function ChatHeader({ notifications, showDropdown, setShowDropdown }) {
  return (
    <View style={styles.header}>
      <Text style={styles.backArrow}>‹</Text>
      <Text style={styles.headerTitle}>Chat with HR</Text>
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => setShowDropdown(!showDropdown)}
      >
          <Bell size={22} color="#111827" />
        <Text style={styles.bell}></Text>
        {notifications.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>{notifications.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backArrow: { fontSize: 26, color: "#111827", marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  bellContainer: { marginLeft: "auto", position: "relative" },
  bell: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeTxt: { color: "white", fontSize: 10, fontWeight: "bold" },
});
