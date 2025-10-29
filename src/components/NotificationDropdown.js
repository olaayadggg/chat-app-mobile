import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";

export default function NotificationDropdown({ visible, notifications, onClose, onRead }) {
  async function handleClick(id) {
    await onRead();
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dropdown}>
          {notifications.length === 0 ? (
            <Text style={styles.emptyNotif}>No new notifications</Text>
          ) : (
            notifications.map((n) => (
              <TouchableOpacity key={n.id} style={styles.notifItem} onPress={() => handleClick(n.id)}>
                <Text style={styles.notifFrom}>
                  From: {n.from?.replace("hr_", "").replace("emp_", "")}
                </Text>
                <Text numberOfLines={1} style={styles.notifText}>
                  {n.text}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdown: {
    marginTop: 80,
    marginRight: 12,
    width: 260,
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
  },
  notifItem: { borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 6 },
  notifFrom: { fontSize: 13, fontWeight: "600", color: "#111827" },
  notifText: { fontSize: 13, color: "#4b5563" },
  emptyNotif: { textAlign: "center", color: "#6b7280", padding: 10 },
});
