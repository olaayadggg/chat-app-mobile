import { SafeAreaView, StatusBar } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import { initializeFirebase } from './src/utils/firebase';
initializeFirebase();
import Constants from 'expo-constants';

export default function App() {
  const { EMPLOYEE_CHAT_ID } = Constants.expoConfig.extra;
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f8fafc'}}>
      <StatusBar barStyle="dark-content" />
      <ChatScreen employeeId={EMPLOYEE_CHAT_ID} />
    </SafeAreaView>
  );
}
