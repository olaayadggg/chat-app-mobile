📱 HR Employee Mobile App (React Native + Expo)
A modern mobile app for employees to chat with HR, send feedback, and receive notifications — built using React Native, Expo, and Firebase.

🚀 Features

💬 Real-time Chat with HR (Firestore-based)

🔔 Instant Notifications when HR responds

🧭 Smooth, responsive UI built with Expo

🛠️ Setup

# 1️⃣ Install dependencies:

npm install

# 2️⃣ Configure variables:

Go to app.json file in the project root and change EMPLOYEE_CHAT_ID to one of those IDs:
"extra": {
"EMPLOYEE_CHAT_ID": "emp_sample_1",
},

available IDs: ['emp_yara' , 'emp_sample_1' , 'emp_muhammed' , 'emp_alice_johnson_42']

# 3️⃣ Add Firebase config:

Edit the file:
src/utils/firebase.js

and replace it with your Firebase credentials:
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID",
};

# 4️⃣ Run the app:

npx expo start / or / npx expo start --tunne

Then scan the QR code with your Expo Go app 📱

🌟 Future Improvements

🔐 Employee login with Firebase Auth

📎 File/image sharing with HR
