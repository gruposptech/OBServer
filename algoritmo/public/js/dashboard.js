function exibeDataHora() {
	// selecionadno a div que exibe a data e a hora na dashboard pelo ID
	const divDataHora = document.getElementById('data-hora');

	// atualizando a hora a cada 1 minuto
	setInterval(() => {
		// pegando a data atual e colocando em uma variável
		const data = new Date();

		// inserindo a data e hora formatadas para o nosso local (pt-BR) na div que selecionei
		divDataHora.innerHTML = `${data.toLocaleDateString('pt-BR')} - ${data.toLocaleTimeString('pt-BR')}`;
	}, 1000);
}

function trocaTitulo(checkBox) {
	//selecionando o span que exibe o nome da sala no topo da tela
	var spanTitulo = document.getElementById('nome-sala-titulo');
  // selecionando todas as checkbox
	var checkBoxes = document.getElementsByClassName('checkbox-sala');
  // criando uma variável para guardar o titulo da sala
	var titulo = '';

	// laço for que percorre todas as checkboxes
	for (var i = 0; i < checkBoxes.length; i++) {
		// a variável checkBox é a checkbox da posição i da lista checkBoxes
		var checkBox = checkBoxes[i];

		//se a checkBox está marcada...
		if (checkBox.checked) {
			var nomeSala = '';

			// checando qual checkbox está marcada e atriuindo o nome dela a variavel nomeSala
			if (checkBox.name == 'sala-1') {
				nomeSala = 'Datacenter principal';
			} else if (checkBox.name == 'sala-2') {
				nomeSala = 'Sala de backup';
			} else if (checkBox.name == 'sala-3') {
				nomeSala = 'Sala de servidores A';
			} else if (checkBox.name == 'sala-4') {
				nomeSala = 'Sala de servidores B';
			} else if (checkBox.name == 'sala-5') {
				nomeSala = 'Sala de servidores C';
			}

			// se o título não está vazio, eu adiciono uma vírgula para separar os nomes
			if (titulo != '') {
				titulo += ', ';
			}

			// adicionando o nome da sala a variavel título
			titulo += nomeSala;
		}
	}

	// trocando o span do título para a variável título
	spanTitulo.innerHTML = titulo;
}

// window.onload: método para executar uma função assim que a janela for carregada
window.onload = () => {
	// então, estou executando a função de exibir a data e hora assim que a tela carrega
	exibeDataHora();

	// aqui, estou procurando através de um laço for, qual checkbox está marcada
	// quando acho, executo a função trocaTitulo() passando a dashboard marcada como parâmetro
	var checkBoxes = document.getElementsByClassName('checkbox-sala');
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			trocaTitulo(checkBoxes[i]);
			break;
		}
	}
};
