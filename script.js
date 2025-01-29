// 🔥 Firebase کنفیگریشن (اپنی API Key اپڈیٹ کریں)
const firebaseConfig = {
    apiKey: "YOUR_NEW_API_KEY",  
    authDomain: "upload-and-earn-69b82.firebaseapp.com",
    projectId: "upload-and-earn-69b82",
    storageBucket: "upload-and-earn-69b82.appspot.com",
    messagingSenderId: "584894831273",
    appId: "1:584894831273:web:4ac4d6b284e3568b20a7b8",
    measurementId: "G-656Q28NMKD"
};

// 🔥 Firebase Initialize
firebase.initializeApp(firebaseConfig);

// 🔹 سائن اپ فنکشن
function signUp() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Sign up successful!");
        window.location.href = "home.html"; // 🟢 سائن اپ کے بعد ری ڈائریکٹ
    })
    .catch((error) => {
        alert(error.message);
    });
}

// 🔹 سائن ان فنکشن
function signIn() {
    var email = document.getElementById("signin-email").value;
    var password = document.getElementById("signin-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Sign in successful!");
        window.location.href = "home.html"; // 🟢 لاگ ان کے بعد ری ڈائریکٹ
    })
    .catch((error) => {
        alert(error.message);
    });
}

// 🔹 یوزر کی حالت چیک کریں
function checkAuthStatus() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "home.html"; // 🟢 اگر یوزر لاگ ان ہو تو ری ڈائریکٹ کریں
        }
    });
}

// 🔹 لاگ آؤٹ فنکشن
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html"; // 🔴 لاگ آؤٹ کے بعد مین پیج پر ری ڈائریکٹ
    });
}
