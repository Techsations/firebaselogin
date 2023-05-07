let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPassword");

let userData = JSON.parse(localStorage.getItem("users")) || [];
function signUp() {
    // ev.preventDefault();
    if (password.value.length < 8) {
        alert("Password must be atleast 8 characters long")
    } else {
        let data = {
            email: email.value,
            password: password.value
        }
        userData.push(data);
        localStorage.setItem("users", JSON.stringify(userData));
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                alert("SignUp Successful!")
                email.value = "";
                password.value = "";
                console.log(user);
                window.location.href = "signin.html"
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
}

function signInGoogle(ev) {
    ev.preventDefault();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    alert("Successful")
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
      console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
