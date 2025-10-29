import { useEffect, useState, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "../utils/firebase";
import ChatHeader from "../components/ChatHeader";
import MessageItem from "../components/MessageItem";
import ChatInput from "../components/ChatInput";
import NotificationDropdown from "../components/NotificationDropdown";
import DateSeparator from "../components/DateSeparator";
const HR_ID = "hr_sconnor";

export default function ChatScreen({ employeeId }) {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [text, setText] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const flatRef = useRef(null);

  async function markEmployeeNotificationsRead() {
    const db = getDb();
    const q = query(
      collection(db, "notifications"),
      where("to", "==", employeeId),
      where("read", "==", false)
    );
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.docs.forEach((docSnap) => batch.update(docSnap.ref, { read: true }));
    await batch.commit();
  }

  // === Real-time listeners ===
  useEffect(() => {
    const db = getDb();
    if (!db) return;

    const convRef = doc(db, "conversations", employeeId);
    const msgsCol = collection(db, `conversations/${employeeId}/messages`);
    const msgQuery = query(msgsCol, orderBy("timestamp", "asc"));
    const notifQuery = query(
      collection(db, "notifications"),
      where("to", "==", employeeId),
      where("read", "==", false)
    );

    getDoc(convRef)
      .then(
        (snap) => snap.exists() && setEmployeeImage(snap.data().image || null)
      )
      .catch((err) => console.error("Conversation fetch error:", err));

    const unsubMessages = onSnapshot(msgQuery, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubNotifs = onSnapshot(notifQuery, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubMessages();
      unsubNotifs();
    };
  }, [employeeId]);

  async function sendMessage() {
    if (!text.trim()) return;
    const db = getDb();

    await markEmployeeNotificationsRead();

    const msgsCol = collection(db, `conversations/${employeeId}/messages`);
    await addDoc(msgsCol, {
      senderId: employeeId,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "conversations", employeeId), {
      lastMessage: text.trim(),
      lastMessageTimestamp: serverTimestamp(),
    }).catch(() => {});

    await addDoc(collection(db, "notifications"), {
      to: HR_ID,
      from: employeeId,
      text: text.trim(),
      timestamp: serverTimestamp(),
      read: false,
    });

    setText("");
    setTimeout(() => flatRef.current?.scrollToEnd?.(), 200);
  }

  function formatDateLabel(ts) {
    const d = ts?.toDate ? ts.toDate() : new Date();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  }

  const groupedMessages = [];
  let lastDate = null;
  messages.forEach((m) => {
    const msgDate = m.timestamp?.toDate
      ? m.timestamp.toDate().toDateString()
      : "";
    if (msgDate !== lastDate) {
      groupedMessages.push({
        type: "date",
        id: msgDate,
        label: formatDateLabel(m.timestamp),
      });
      lastDate = msgDate;
    }
    groupedMessages.push({ type: "msg", ...m });
  });

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ChatHeader
          notifications={notifications}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
        <NotificationDropdown
          visible={showDropdown}
          notifications={notifications}
          onClose={() => setShowDropdown(false)}
          onRead={markEmployeeNotificationsRead}
        />

        <FlatList
          ref={flatRef}
          data={groupedMessages}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) =>
            item.type === "date" ? (
              <DateSeparator date={item.label} />
            ) : (
              <MessageItem
                message={item}
                employeeId={employeeId}
                employeeImage={employeeImage}
              />
            )
          }
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatRef.current?.scrollToEnd?.()}
        />

        <ChatInput
          text={text}
          setText={setText}
          sendMessage={sendMessage}
          employeeImage={employeeImage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  messagesContainer: { padding: 16, paddingBottom: 100 },
});
