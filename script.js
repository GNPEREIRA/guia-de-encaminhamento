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

function validarCPF(numero) {
  let cpf = document.getElementById('cpf').value;
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return alert("CPF Inválido");

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1+$/.test(cpf)) return alert("CPF Inválido") ;

  // Valida os dígitos verificadores
  let soma;
  let resto;

  // Validação do primeiro dígito
  soma = 0;
  for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return alert("CPF Inválido");

  // Validação do segundo dígito
  soma = 0;
  for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return alert("CPF Inválido");

  return true;
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
  if (valorSelecionado && valorSelecionado != 'consulta-com-especialista' && !listaDeExames.includes(textoSelecionado)) {
      listaDeExames.push(textoSelecionado);
      atualizarLista();
  }

  if(valorSelecionado === 'admissional' && valorSelecionado === 'periodico' ){
    console.log("adm e periodico")
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

  if(valorSelecionado === 'mudança-de-funcao'){
    document.getElementById('mudanca-funcao').innerHTML = criarInputMudancaFuncao();
  }

  if(listaDeExames.includes("Admissional") && listaDeExames.includes('Periódico')){
    alert("Você adicionou os exames Admissional e Periódico à lista.")
  }
}

// Função para criar o select de especialidades
function criarSelectEspecialidades() {
    return `
        <label for="especialidades">Especialidades</label>
        <select name="especialidades" class="select_Especialidades" required>
            <option value=""></option>
            <option value="cardiologista">Cardiologista</option>
            <option value="clinico-geral">Clínico Geral</option>
            <option value="dermatologista">Dermatologista</option>
        </select>
    `;
}

function criarInputMudancaFuncao(){
    return `<label for="mudanca-funcao">Informe a nova função</label>
            <input type="text" id="mudancaFuncao" required>`;
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
    let valorRemovido = listaDeExames[index];//recupera o valor a  ser removido
    listaDeExames.splice(index, 1); // Remove o exame da lista pelo índice

    if(valorRemovido === 'Mudança de função'){
      document.getElementById('mudanca-funcao').innerHTML = ''
    } 
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
  if(escolha === 'Cariacica'){
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

  }else if(escolha === 'Serra'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.serra.endereco}</span>
                                  <span>${enderecos.serra.contato}</span>
                                  <img src="/img/serra21.png" alt="mapa de Serra" class="mapa">
                                </div>`
  }else if(escolha === 'Vila Velha'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.vilaVelha.endereco}</span>
                                  <span>${enderecos.vilaVelha.contato}</span>
                                  <img src="/img/vila_velha21.png" alt="mapa de Vila Velha" class="mapa">
                                </div>`
  }else if(escolha === 'Vitória'){
    divDadosUnidade.innerHTML = `<div class="paragrafo-unidade">
                                  <div>
                                    <p>Ordem de chegada</p>
                                    <p>Horário de atendimento: 07:30 às 11:30 - 13:00 às 16:30</p>
                                  </div>
                                  <span>${enderecos.vitoria.endereco}</span>
                                  <span>${enderecos.vitoria.contato}</span>
                                  <img src="/img/vitoria21.png" alt="mapa de Vitória" class="mapa">
                                </div>` //413X287
  }
  
}

//Busca os dados do cliente após a digitação do CNPJ <não está funcionando ainda>
async function getNomeEmpresa(cnpj) {
  const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
  
  try {
      const response = await fetch(url);
      
      // Verifica se a resposta foi OK (200)
      if (!response.ok) {
          throw new Error('Erro ao consultar o CNPJ: ' + response.status);
      }

      const data = await response.json();
      
      // Verifica se a consulta retornou um erro
      if (data.status === 'ERROR') {
          throw new Error('CNPJ inválido ou não encontrado');
      }

      // Retorna o nome da empresa
      return data.nome;
      
  } catch (error) {
      console.error('Erro:', error);
      return null;
  }
}

// Exemplo de uso
function buscarDadosCNPJ(){
  const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
  //const cnpj = '27865757000102'; // Substitua pelo CNPJ desejado
  getNomeEmpresa(cnpj).then(nomeEmpresa => {
    if (nomeEmpresa) {
        console.log('Nome da Empresa:', nomeEmpresa);
    } else {
        console.log('CNPJ não encontrado.');
    }
  });
}

//Retorna a data atual no campo Data de Emissão da Guia
function dataAtual(){
  const data = new Date(); // Pega a data atual
  const dia = String(data.getDate()).padStart(2,'0');
  const mes = String(data.getMonth()+1).padStart(2,'0')//meses de 0 a 11
  const ano = data.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`
  document.getElementById('dataEmissao').value = dataFormatada
}
document.addEventListener("DOMContentLoaded", function(){
  dataAtual();
});

//Controla eventos dos radioButtons e cria um input na DOM
function clickRadio(){
  const valor = document.querySelector('input[name="opcao"]:checked').value;
  if(valor === 'Sim'){
    console.log('tem treinamento')
    document.getElementById('nome-treinamento').innerHTML = `<input type="text" id="nome-treinamento-input" required autofocus placeholder="Informe aqui qual treinamento será realizado">`
  }else{
    console.log('não tem treinamento')
    document.getElementById('nome-treinamento').innerHTML = ""
  }
}

const radios = document.querySelectorAll('input[name="opcao"]')
radios.forEach(radio =>{
  radio.addEventListener('change', clickRadio)
});


//Seta o valor padrão dos selects para ''
/*window.onload = function(){
  document.getElementById("tipos-exames").value = "";
  document.getElementById("unidades").value = "";
  
}*/


