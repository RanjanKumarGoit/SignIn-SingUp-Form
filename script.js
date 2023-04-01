

// My web-app's configuration details from firebase database console
var firebaseConfig = {
  apiKey: "AIzaSyAry-7rw09KpjDHiBSiEHCL4lL0oOicml4",
  authDomain: "sapient-assigment.firebaseapp.com",
  databaseURL: "https://sapient-assigment-default-rtdb.firebaseio.com",
  projectId: "sapient-assigment",
  storageBucket: "sapient-assigment.appspot.com",
  messagingSenderId: "965175018351",
  appId: "1:965175018351:web:61018f2299fd2c4bf31e9a",
  measurementId: "G-QNEYL6LLED"
};


// Here Firebase is Initialized using initializeApp keyword
firebase.initializeApp(firebaseConfig); 


// auth and database variables are initialized and assigned values
const auth = firebase.auth();
const database = firebase.database();


// Register function is declared which  validates the signUp form ,connect the firebase and store the data
function register() {

  // Get all our input fields from the SignUp form
  email = document.getElementById("signupEmail").value;
  password = document.getElementById("signupPassword").value;
  confirmPassword = document.getElementById("signupConfirmPassword").value;
  
  // if email field is empty then it shows the following error
  if (email === "") {
    alert("Please enter your email.");
    return false;
  }
   // if input email is not valid then it shows the following error
  else if (!isValidEmail(email)) {
    alert("Please enter a valid email.");
    return false;
  }
   // if password field is empty then it shows the following error
  else if (password === "") {
    alert("Please enter your password.");
    return false;
  }
   // if password size is less than 6 characters then it shows the following error
  else if (password.length < 6) {
    alert("Password should be at least 6 characters long.");
    return false;
  }
   // if password size is greater than 15 then it shows the following error
  else if (password.length > 15) {
    alert("Password should not exceed 15 characters.");
    return false;
  }
   // if password is not valid then it shows the following error
  else if (!isValidPassword(password)) {
    alert("Password should contain at least one digit and one special character");
    return false;
  }
   // if confirmPassword is empty then it shows the following error
  else if (confirmPassword === "") {
    alert("Please confirm your password.");
    return false;
  }
   // if password and confirmpassword does not match then it shows the following error
  else if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Here, a user database is created in the firebase which stores the entered email and their user ID
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        password: password
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created!!");
      window.location.href = "login.html";
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// This is login function which validates and store data while logging in the page
function login() {
  // Get all our input fields from the login form
  email = document.getElementById("loginEmail").value;
  password = document.getElementById("loginPassword").value;
  
  // here all the information filled in the form are validated as following
  if (email === "") {
    alert("Please enter your email.");
    return false;
  }
  else if (password === "") {
    alert("Please enter your password.");
    return false;
  }
  else if (!isValidEmail(email)) {
    alert("Please enter a valid email.");
    return false;
  }

    // here email and password from the login form is stored in the firebase
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      console.log("first")

      var user = auth.currentUser;
      window.location.href = "welcome.html";

      // DOne
      alert("User Logged In!!");

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}


//  This function shows message i.e. Logged out/User Logged out from the page and redirect to the login page
function logout() {
  auth.signOut().then(function () {
    alert("User Logged Out!!");
    window.location.href = "login.html";
  }).catch(function (error) {
    // An error happened
    console.log(error.message);
  });
}


// This function check whether the password is valid or not.
function isValidPassword(password) {
  // A simple password validation regex.
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
  return regularExpression.test(password);
}

// This function checks whether the email is valid or not.
function isValidEmail(email) {
  // A simple email validation regex.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

