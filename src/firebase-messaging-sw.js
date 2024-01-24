importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAPSeSPupmwgxUeQsz43cnQbwySlnBP8J0",
  authDomain: "pizzaproject-e4bcf.firebaseapp.com",
  projectId: "pizzaproject-e4bcf",
  storageBucket: "pizzaproject-e4bcf.appspot.com",
  messagingSenderId: "260795603597",
  appId: "1:260795603597:web:aaaf03e49b7fc0c21f20c4",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Customize this part based on your requirements
messaging.setBackgroundMessageHandler(function (payload) {
  console.log("Received background message: ", payload);

  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };

  return self.registration.showNotification(
    payload.data.title,
    notificationOptions
  );
});
