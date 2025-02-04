const inputTexto = document.getElementById("tarefas");
const btnTarefas = document.getElementById("btnTarefas");
const listaTarefas = document.getElementById("listaTarefas");
const btnLimpaTudo = document.getElementById('btnlimpaTudo');
let divResultado = document.getElementById('divResposta');

function criaTarefas(textoinput) {
  const li = criaLI();
  li.innerHTML = textoinput;
  listaTarefas.appendChild(li);
  limpaInput();
  criarButaoApagar(li);
  salvarTarefas();
}
function criaLI() {
  const li = document.createElement("li");
  return li;
}
inputTexto.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (!inputTexto.value) return;
    criaTarefas(inputTexto.value);
  }
});
function limpaInput() {
  inputTexto.value = "";
  inputTexto.focus();
}
function criarButaoApagar(li) {
  li.innerHTML += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "excluir";
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "apagar tarefa");
  li.appendChild(botaoApagar);
}

btnTarefas.addEventListener("click", function () {
  if (!inputTexto.value) return;
  criaTarefas(inputTexto.value);
});
document.addEventListener("click", function (e) {
  const elemento = e.target;
  if (elemento.classList.contains("apagar")) {
    elemento.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = listaTarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("excluir", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}
function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefas(tarefa)
    }
}
btnLimpaTudo.addEventListener('click', function(){
  let divResultado = document.getElementById('divResposta');
  listaTarefas.innerHTML = '';
  localStorage.clear();
  // divResultado.style.backgroundColor = "#f8d7da"; 'ERROR PARA TROCAR A COR DO CSS
  return;
  
  
})


adicionarTarefasSalvas();
