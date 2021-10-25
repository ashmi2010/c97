
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

userName=localStorage.getItem("userName");

document.getElementById("username").innerHTML="Welcome "+userName+"!";

function addRoom(){
      roomName=document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose:"Adding room name"
      });
      localStorage.setItem("roomName",roomName);
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();
function redirectToRoomName(name){
      localStorage.setItem("roomName",name);
      window.location="kwitter_page.html";    
}

function logOut(){
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location="index.html";
}
