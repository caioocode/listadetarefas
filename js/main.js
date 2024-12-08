
const button = document.querySelector('.buttonAddTask')
const input = document.querySelector('.inputTask')
const listaCompleta = document.querySelector('.listTasks')

let minhaListaDeItens = []



function adicionarNovaTarefa() {
     // Verificar se o campo de entrada está vazio
    if (input.value.trim() === ''){
    alert("Por favor, insira uma tarefa antes de adicionar!");
    return; // Retorna para evitar adicionar uma tarefa vazia à lista
}

    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })
    input.value = '' 
    mostrarTarefas()
}

function mostrarTarefas(){

    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            
            <img src="imagens/checkbutton.png" alt="" onclick="concluirTarefa(${posicao})">
            
            <p>${item.tarefa}</p>

            <img src="imagens/removebutton.png" alt="" onclick="deletarItem(${posicao})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}


//deleta o item usando seu index
function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}


function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

button.addEventListener('click', adicionarNovaTarefa)


function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
}
    mostrarTarefas() 
}   recarregarTarefas()



input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        adicionarNovaTarefa(input.value);
    }
});


document.getElementById("logout-btn").addEventListener("click", () => {
    // Remover o token do localStorage ou sessionStorage
    localStorage.removeItem("auth_token");  // Ou sessionStorage.removeItem("auth_token");
    
    // Redirecionar para a tela de login
    window.location.href = "index.html";
});