// login.js
const API_URL = "https://listadetarefas-8241.onrender.com";

// Login do usuário
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login bem-sucedido!");
        window.location.href = "home.html"; // Redireciona para a página principal
    } else {
        alert(data.message);
    }
});
