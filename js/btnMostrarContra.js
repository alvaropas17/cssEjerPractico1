function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.getElementById('toggleBtn');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = 'Ocultar'; // Cambia el texto del botón
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = 'Mostrar'; // Cambia el texto del botón
    }
}
function togglePasswordVisibility2() {
    const passwordField = document.getElementById('password2');
    const toggleBtn = document.getElementById('toggleBtn2');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.textContent = 'Ocultar'; // Cambia el texto del botón
    } else {
        passwordField.type = 'password';
        toggleBtn.textContent = 'Mostrar'; // Cambia el texto del botón
    }
}