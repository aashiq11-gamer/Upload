// 🔥 Firebase کنفیگریشن
const firebaseConfig = {
    apiKey: "AIzaSyDyle8ZWbZxfkt2hKC4Zdg0QqDgJN4Iu3c",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 یوزر لاگ ان چیک کرنا
function checkAuthStatus() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "login.html"; // اگر یوزر لاگ ان نہیں تو ری ڈائریکٹ کریں
        }
    });
}

// 🔹 لاگ آؤٹ فنکشن
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}

// 🔹 یوزر پروفائل اپڈیٹ کرنا
function updateProfile() {
    const user = firebase.auth().currentUser;
    const bio = document.getElementById("bio").value;

    if (user) {
        db.collection("users").doc(user.uid).set({
            bio: bio
        }).then(() => {
            alert("Profile updated!");
        });
    }
}

// 🔹 پوسٹ اپلوڈ فنکشن (Google Drive API کے ساتھ)
async function uploadPost() {
    const fileInput = document.getElementById("post-image");
    if (fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    const metadata = {
        name: file.name,
        mimeType: file.type
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(metadata));
    formData.append("uploadType", "multipart");

    const accessToken = "YOUR_GOOGLE_DRIVE_ACCESS_TOKEN"; // 🔹 گوگل ڈرائیو API ٹوکن

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        body: formData
    });

    if (response.ok) {
        const result = await response.json();
        alert("Post uploaded successfully!");
    } else {
        alert("Failed to upload post.");
    }
}