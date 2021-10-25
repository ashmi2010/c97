const firebaseConfig = {
      apiKey: "AIzaSyCIjShu0jnIgDdQC9AFvqct5QKeVT6ygTA",
      authDomain: "kwitter-95bf4.firebaseapp.com",
      databaseURL: "https://kwitter-95bf4-default-rtdb.firebaseio.com",
      projectId: "kwitter-95bf4",
      storageBucket: "kwitter-95bf4.appspot.com",
      messagingSenderId: "704669394139",
      appId: "1:704669394139:web:8b9469f36cb66d38be98fe",
      measurementId: "G-TYHRCZJJBS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name: userName,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        name = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function updateLike(firebase_message_id) {
      buttonid = firebase_message_id;
      likes = document.getElementById(buttonid).value;
      updated_likes = Number(likes) + 1;
      firebase.database().ref(roomName).child(firebase_message_id).update({
            like: updated_likes
      });
}

function logOut() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}