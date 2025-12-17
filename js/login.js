// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmWaLD6mFt_eTBSqsUVItzYRiCg1M0MVM",
    authDomain: "login-firebase-331f0.firebaseapp.com",
    databaseURL: "https://login-firebase-331f0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "login-firebase-331f0",
    storageBucket: "login-firebase-331f0.firebasestorage.app",
    messagingSenderId: "855367090890",
    appId: "1:855367090890:web:1c5e520002388abb8b6a33",
    measurementId: "G-RPNTJ6M6MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form__body");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener valores
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validaciones básicas
        if (!email || !password) {
            alert("Por favor, completa todos los campos");
            return;
        }

        // Iniciar sesión con Firebase
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("¡Inicio de sesión exitoso!");
                // Redirigir a la página principal
                window.location.href = "../index.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = "Error al iniciar sesión";

                // Mensajes de error personalizados en español
                switch (errorCode) {
                    case "auth/invalid-email":
                        errorMessage = "El correo electrónico no es válido";
                        break;
                    case "auth/user-disabled":
                        errorMessage = "Esta cuenta ha sido deshabilitada";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "No existe una cuenta con este correo";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "Contraseña incorrecta";
                        break;
                    case "auth/invalid-credential":
                        errorMessage = "Credenciales inválidas. Verifica tu correo y contraseña";
                        break;
                    case "auth/network-request-failed":
                        errorMessage = "Error de conexión. Verifica tu internet";
                        break;
                    default:
                        errorMessage = error.message;
                }

                alert(errorMessage);
            });
    });
});
