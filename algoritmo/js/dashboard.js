function exibeDataHora() {
  // selecionadno a div que exibe a data e a hora na dashboard pelo ID
  const divDataHora = document.getElementById("data-hora");

  // atualizando a hora a cada 1 minuto
  setInterval(() => {
    // pegando a data atual e colocando em uma variável
    const data = new Date();

    // inserindo a data e hora formatadas para o nosso local (pt-BR) na div que selecionei
    divDataHora.innerHTML = `${data.toLocaleDateString("pt-BR"
)} - ${data.toLocaleTimeString("pt-BR")}`;
  }, 1000);
}

function trocaTitulo(checkBox) {
  //selecionando o span que exibe o nome da sala no topo da tela
  var spanTitulo = document.getElementById("nome-sala-titulo");

  // se a checkBox passada como parâmetro está marcada...
  if (checkBox.checked) {

    // guardando todas as checkboxes na variável checkBoxes
    var checkBoxes = document.getElementsByClassName("checkbox-sala");

    // percorrendo todas as checkboxes
    for (var i = 0; i < checkBoxes.length; i++) {

      // se a checkbox que está sendo verificada for diferente da checkbox passada como parâmentro da função (que é a checkbox marcada)
      // então eu desmarco ela usando o .checked = false
      if (checkBoxes[i] != checkBox) {
        checkBoxes[i].checked = false;
      }
    }

    // aqui eu checo qual o nome da checkbox que foi passada como parâmetro e troco o título da página de acordo.
    if (checkBox.name == "sala-1") {
      spanTitulo.innerHTML = "Datacenter principal";
    } else if (checkBox.name == "sala-2") {
      spanTitulo.innerHTML = "Sala de backup";
    } else {
      spanTitulo.innerHTML = "Sala de servidores A";
    }
  }
}

// window.onload: método para executar uma função assim que a janela for carregada
window.onload = () => {
  // então, estou executando a função de exibir a data e hora assim que a tela carrega
  exibeDataHora();

  // aqui, estou procurando através de um laço for, qual checkbox está marcada
  // quando acho, executo a função trocaTitulo() passando a dashboard marcada como parâmetro
  var checkBoxes = document.getElementsByClassName("checkbox-sala");
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      trocaTitulo(checkBoxes[i]);
      break;
    }
  }
};
