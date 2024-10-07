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

function mascaraCelular(celular){
  let numero = celular.value;
  numero = numero.replace(/\D/g, "");
  numero = numero.replace(/^(\d{2})(\d)/, "($1) $2");
  numero = numero.replace(/(\d{5})(\d{4})$/, "$1-$2");
  celular.value = numero;
}

function mascaraFixo(fixo){
  let numero = fixo.value;
  numero = numero.replace(/\D/g, "");
  numero = numero.replace(/^(\d{2})(\d)/, "($1) $2");
  numero = numero.replace(/(\d{4})(\d{4})$/, "$1-$2");
  fixo.value = numero;
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
            <option value=""></option>
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

//Função para mostrar os dados da empresa
let enderecos = {
  cariacica : {
    endereco : 'Rua José Barros da Silva, 17 - Campo Grande - Cariacica',
    contato : '(27) 99582-6416'
    
  },
  serra : {
    endereco : 'Rua Humberto de Campos, 25 - Parque Residencial Laranjeiras - Serra',
    contato : '(27) 99640-5527'
  },
  vilaVelha : {
    endereco : 'Avenida Professora Francelina Carneiro Setubal, 168 - Itapuã - Vila Velha',
    contato : '(27) 99640-5527'
  },
  vitoria : {
    endereco : 'Rua Neves Armond, 535 - Enseada do Suá  - Vitória',
    contato : '(27) 99582-6416'
  }

}

function dadosUnidade(index){
  let escolha = index.value;
  let divDadosUnidade = document.getElementById('dados-unidade');

  //console.log(escolha)
  if(escolha === 'cariacica'){
    //console.log(enderecos.cariacica.endereco)
    divDadosUnidade.innerHTML = `<didiv class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>                                 
                                  <span>${enderecos.cariacica.endereco}</span>
                                  <span>${enderecos.cariacica.contato}</span>
                                  <img src="/img/cariacica.png" alt="mapa de Cariacica" class="mapa">
                                </didiv>`

  }else if(escolha === 'serra'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.serra.endereco}</span>
                                  <span>${enderecos.serra.contato}</span>
                                  <img src="/img/serra.png" alt="mapa de Serra" class="mapa">
                                </div>`
  }else if(escolha === 'vila-velha'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.vilaVelha.endereco}</span>
                                  <span>${enderecos.vilaVelha.contato}</span>
                                  <img src="/img/vila_velha.png" alt="mapa de Vila Velha" class="mapa">
                                </div>`
  }else if(escolha === 'vitoria'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.vitoria.endereco}</span>
                                  <span>${enderecos.vitoria.contato}</span>
                                  <img src="/img/vitoria.png" alt="mapa de Vitória" class="mapa">
                                </div>`
  }
  
}

function validarCPF(cpf) {
  
  // Remover pontos e traços
  cpf = cpf.replace(/[^\d]+/g, '');

  // Verificar se o CPF tem 11 dígitos e se não é uma sequência de números iguais
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      alert("Inválido")
      return false;
  }

  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = (resto > 9) ? 0 : resto;

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = (resto > 9) ? 0 : resto;

  // Verifica se os dígitos calculados são iguais aos do CPF informado
  return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
}
