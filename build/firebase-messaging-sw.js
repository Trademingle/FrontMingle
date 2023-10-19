importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js");


firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
     apiKey: "AIzaSyARTjraxEpZqygB62W10x_ISKjzh0NsY5c",
     authDomain: "booktrades-ef251.firebaseapp.com",
     databaseURL: "https://booktrades-ef251.firebaseio.com",
     projectId: "booktrades-ef251",
     storageBucket: "booktrades-ef251.appspot.com",
     messagingSenderId: "95103237352",
     appId: "1:95103237352:web:81873c6a9b042f834d1d5d",
     measurementId: "G-2RZCGYRG5W"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Message Received';
  const notificationOptions = {
    data: {
      'receiverId': payload.data.sender,
      'receiverName': payload.data.sender_name
    },
    body: payload.data.sender_name+': '+payload.data.message,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// self.addEventListener("notificationclick", function(event) {
//     console.log(event);
//     const clickedNotification = event.notification;
//     clickedNotification.close();
//     // debugger;
//     // clients.openWindow('/InboxPage')
// });

// self.addEventListener('notificationclick', function(event) {
//   console.log('On notification click: ', event.notification.tag);
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(clients.matchAll({
//     type: "window"
//   }).then(function(clientList) {
//     for (var i = 0; i < clientList.length; i++) {
//       var client = clientList[i];
//       if (client.url == '/' && 'focus' in client)
//         return client.focus();
//     }
//     if (clients.openWindow)
//       return clients.openWindow('/');
//   }));
// });

self.onnotificationclick = function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  const data = event.notification.data;
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    const navUrl = './InboxPage/'+data.receiverName+'/'+data.receiverId
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if ('focus' in client)
        client.focus();
        client.navigate(navUrl).then(function(arg) {
          console.log('notification.navigation successful')
        }).catch((err)=>{ 
          console.log('notification.navigation error')
        })
    }
    if (clients.openWindow)
      return clients.openWindow(navUrl);
  }));
};