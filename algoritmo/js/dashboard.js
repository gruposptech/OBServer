// window.onload: método para executar uma função assim que a janela for carregada
// então, estou executando a função de exibir a data e hora assim que a tela carrega
window.onload = exibeDataHora();

function exibeDataHora() {

  // selecionadno a div que exibe a data e a hora na dashboard pelo ID
  const divDataHora = document.getElementById("data-hora");

  // atualizando a hora a cada 1 minuto
  setInterval(() => {

    // pegando a data atual e colocando em uma variável
    const data = new Date();

    // inserindo a data e hora formatadas para o nosso local (pt-BR) na div que selecionei
    divDataHora.innerHTML = `${data.toLocaleDateString("pt-BR")} - ${data.toLocaleTimeString("pt-BR")}`;
  }, 1000);
}
