//MÁSCARA CAMPO CNPJ
function mascaraCNPJ(cnpj) {
    let value = cnpj.value;
  
    // Remove tudo que não for dígito
    value = value.replace(/\D/g, "");
  
    // Adiciona a máscara de CNPJ
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  
    cnpj.value = value; // Atualiza o valor do input
  }

  
function aplicarMascaraCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não for número
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e quarto dígito
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o sexto e sétimo dígito
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um traço entre o nono e décimo dígito
  return cpf;
}

function formatarCPF() {
  var cpfInput = document.getElementById("cpf");
  cpfInput.value = aplicarMascaraCPF(cpfInput.value);
}

// Remove todos os caracteres que não sejam números
function somenteNumero(input) {
  input.value = input.value.replace(/[^0-9]/g, '');
}

// Remove todos os caracteres que sejam números ou símbolos
function somenteLetras(input){
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
}

//ALERT COM INSTRUÇÃO DE PREENCHIMENTO, CONTIDO NA IMAGEM
function dica(){
  alert("Informe os dados da unidade onde o funcionário está lotado atualmente.")
}

/*
 *VARIÁVEIS E FUNÇÕES RELATIVAS A OS TIPOS DE EXAMES
 *CAMPO DE EXAMES: DEVE INCLUIR O EXAME EM UMA LISTA(ARRAY) A CADA CLIQUE
*/
let lista = [];//CRIA UM ARRAY LISTA DE TIPOS DE EXAMES
let lista2 = [];//CRIA UM ARRAY LISTA DE TIPOS DE ESPECIALIDADES
let listaDeExames = [];

// Função principal para adicionar exames
function adicionar() {
    let select = document.getElementById('tipos-exames');
    let valorSelecionado = select.options[select.selectedIndex].value;
    let textoSelecionado = select.options[select.selectedIndex].text;

    // Verifica se o exame já está na lista
    if (valorSelecionado && !listaDeExames.includes(textoSelecionado)) {
        listaDeExames.push(textoSelecionado);
        atualizarLista();
    }

    // Se a opção "Consulta com especialista" for selecionada, cria o select de especialidades
    if (valorSelecionado === 'consulta-com-especialista') {
        document.getElementById('tipos-especialidades').innerHTML = criarSelectEspecialidades();

        let selectEspecialidades = document.querySelector('.select_Especialidades');

        // Captura e adiciona a especialidade selecionada à lista
        selectEspecialidades.addEventListener('change', function() {
            let especialidadeSelecionada = selectEspecialidades.options[selectEspecialidades.selectedIndex].text;

            // Verifica se a especialidade já está na lista para evitar duplicidade
            if (especialidadeSelecionada && !listaDeExames.includes(especialidadeSelecionada)) {
                listaDeExames.push(especialidadeSelecionada);
                atualizarLista();
            }
        });
    } else {
        document.getElementById('tipos-especialidades').innerHTML = ''; // Limpa se outro exame for selecionado
    }
}

// Função para criar o select de especialidades
function criarSelectEspecialidades() {
    return `
        <label for="especialidades">Especialidades</label>
        <select name="especialidades" class="select_Especialidades">
            <option value="">Selecione uma especialidade</option>
            <option value="cardiologista">Cardiologista</option>
            <option value="clinico-geral">Clínico Geral</option>
            <option value="dermatologista">Dermatologista</option>
        </select>
    `;
}

// Função para atualizar a lista de exames no span com imagem de "X"
function atualizarLista() {
    let listaContainer = document.getElementById('listaDeSelecionados');
    listaContainer.innerHTML = ''; // Limpa a lista para atualizar

    listaDeExames.forEach((exame, index) => {
        listaContainer.innerHTML += `
            <span class="item-lista">
                ${exame}
                <img src="img/excluir.png" alt="Remover" class="excluir" onclick="excluir(${index})">
            </span>
        `;
    });
}

// Função para excluir um exame da lista
function excluir(index) {
    listaDeExames.splice(index, 1); // Remove o exame da lista pelo índice
    atualizarLista(); // Atualiza a lista na tela
}
