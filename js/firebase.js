// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const lopd = document.getElementById('lopd').checked;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = "";

    // Validación ley general protección de datos
    if (!lopd) {
        errorMessage.textContent = "Debes aceptar la política de privacidad.";
        return;
    }

    // Validación si las contraseñas no coinciden
    if (password !== password2) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        return;
    }

    // Validación por si la contraseña tiene menos de 6 caracteres
    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Con esto se guardan los datos del usuario en firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: "", // Puedes agregar un campo nombre si quieres
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
        });

        alert("¡Registro exitoso! Bienvenido a AI Land.");
        window.location.href = "./inicioSesion.html";


    } catch (error) {
        let mensaje = "Error al registrarse: ";
        switch (error.code) {
            case 'auth/email-already-in-use':
                mensaje += "Este correo ya está registrado.";
                break;
            case 'auth/invalid-email':
                mensaje += "Correo electrónico inválido.";
                break;
            case 'auth/weak-password':
                mensaje += "La contraseña es demasiado débil.";
                break;
            default:
                mensaje += error.message;
        }
        errorMessage.textContent = mensaje;
    }
});