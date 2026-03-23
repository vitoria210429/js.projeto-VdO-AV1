const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const listaMensagens = document.querySelector("#lista");

let mensagens = [];

// validação
function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") return "Digite algo antes de enviar";
  if (txt.length < 3) return "Mínimo de 3 caracteres";

  return "";
}

// renderizar lista
function render() {
  listaMensagens.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = mensagens[i];

    const indexAtual = i;

    // 🔥 BOTÃO EDITAR
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.type = "button";

    btnEditar.addEventListener("click", () => {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = mensagens[indexAtual];

      li.replaceChild(inputEdit, span);
      inputEdit.focus();

      // salvar com ENTER
      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") salvar();
      });

      // salvar ao sair
      inputEdit.addEventListener("blur", salvar);

      function salvar() {
        const novoTexto = inputEdit.value.trim();

        if (novoTexto === "") {
          erro.textContent = "Texto não pode ser vazio";
          render();
          return;
        }

        mensagens[indexAtual] = novoTexto;
        erro.textContent = "";
        render();
      }
    });

    // 🔥 BOTÃO EXCLUIR
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.type = "button";

    btnExcluir.addEventListener("click", () => {
      mensagens.splice(indexAtual, 1);
      render();
    });

    li.append(span, " ", btnEditar, " ", btnExcluir);
    listaMensagens.append(li);
  }
}

// adicionar tarefa
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;
  const mensagemErro = validarTexto(textoDigitado);

  if (mensagemErro !== "") {
    erro.textContent = mensagemErro;
    return;
  }

  erro.textContent = "";

  mensagens.push(textoDigitado.trim());

  render();

  input.value = "";
  input.focus();
});