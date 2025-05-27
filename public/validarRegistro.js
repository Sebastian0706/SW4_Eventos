document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    const password = document.getElementById('contrasena').value;
    const confirm = document.getElementById('confirmcontrasena').value;

    if (password !== confirm) {
      e.preventDefault();
      alert('Las contraseñas no coinciden');
    }
  });
});