const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const listaMensagens = document.querySelector("#lista");

//"Banco de dados" em memória (array)
let mensagens = [];

let editandoIndex = null;

function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") {
    return "Digite algo antes de enviar";
  }

  if (txt.length < 3) {
    return "Mínimo de 3 caracteres";
  }

  return "";
}

//Renderizando/mostrando a lista na tela
function render() {
  listaMensagens.innerHTML = "";

  //<li> para cada mensagem
  for (let i = 0; i < mensagens.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = mensagens[i];

    span.addEventListener("click", () => {
      input.value = mensagens[indexAtual];
      input.focus();
      editandoIndex = indexAtual;

      erro.textContent =
        "Editando item " + (indexAtual + 1) + " (envie para salvar)";
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    const indexAtual = i;

    btnExcluir.addEventListener("click", () => {
      mensagens.splice(indexAtual, 1);
      console.log(indexAtual);
      render();
    });

    li.append(span, " ", btnExcluir);
    listaMensagens.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;
  const mensagemErro = validarTexto(textoDigitado);

  if (mensagemErro !== "") {
    erro.textContent = mensagemErro;
    return;
  }

  erro.textContent = "";

  const textoFinal = textoDigitado.trim();

  if (editandoIndex !== null) {
    mensagens[editandoIndex] = textoFinal;
    editandoIndex = null;
  } else {
    mensagens.push(textoDigitado.trim());
  }

  render();

  input.value = "";
  input.focus();
});

//exemplo de função
function falar() {
  alert("Olá! Eu sou um botão com Javascript");
  console.log("O botão foi clicado");
  console.log("Meu time me estressa toda semana");
}

//ligando botão com a função
// Se precisar reutilizar a função falar futuramente, deixamos a função definida acima.
// A ligação ao botão 'btnFala' foi removida porque o botão foi excluído do HTML.
//const botao2 = document.getElementById("btnFala2");
//botao2.addEventListener("click", falar);