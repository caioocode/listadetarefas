// register.js
const API_URL = "http://localhost:3000";

// Registro de novo usuário
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Fazendo a requisição para o backend
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Se o registro for bem-sucedido
    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        // Redireciona para a página de lista de tarefas (index.html)
        window.location.href = "index.html"; 
    } else {
        alert(data.message || "Erro ao registrar. Tente novamente.");
    }
});
