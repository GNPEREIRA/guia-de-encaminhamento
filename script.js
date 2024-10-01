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
 *VARIÁVEIR E FUNÇÕES RELATIVAS A OS TIPOS DE EXAMES
 *CAMPO DE EXAMES: DEVE INCLUIR O EXAME EM UMA LISTA(ARRAY) A CADA CLIQUE
*/
let lista = [];//CRIA UM ARRAY LISTA
function adicionar(){
  let select = document.getElementById('tipos-exames');//SELECIONA A TAG SELECT
  let valorSelecionado = select.options[select.selectedIndex].text;//CAPTURA O VALOR DA OPTION
  let selecionados = document.getElementById('listaDeSelecionados');//TAG DIV ONDE SERÁ ADD A LISTA
  let especialidades = document.getElementById('especialidades');
  let examesSelecionados = document.getElementById('exames-selecionados');

  /*VERIFICA SE O VALOR JÁ FOI SELECIONADO OU SE ESTÁ EM BRANCO; 
   *ESTA FUNÇÃO NÃO PERMITE A INCLUSÃO DUPLICADA OU EM BRANCO
  **/
  if(lista.find(item => item === valorSelecionado)){
    console.log('Valor encontrado');
  }else if(valorSelecionado == ''){
    console.log('Valor em branco');
  }else{
    lista.push(valorSelecionado);//ARMAZENA O VALOR SELECIONADO NA ÚLTIMA POSIÇÃO DO ARRAY
  }
  console.log(lista.length);

  //MOSTRA O ARRAY NA DIV
  selecionados.innerHTML = '<h4>Exames selecionados</h4>';
  selecionados.innerHTML = lista.map(item => `<span>${item}<img src="/img/excluir.png" alt="excluir" id='excluir' onclick='excluir()'></span>`).join('');

  //CRIA O CAMPO DE SELEÇÃO APÓS A ESCOLHA DA OPÇÃO 'CONSULTA COM ESPECIALISTA' DO CAMPO
  if(valorSelecionado == 'Consulta com especialista'){
    especialidades.innerHTML = '<label for="especialidades">Especialidades</label>'+
                                '<select name="especialidades">'+
                                  '<option value="clinico-geral">Cardiologista</option>'+
                                  '<option value="clinico-geral">Clínico Geral</option>'+
                                  '<option value="clinico-geral">Dermatologista</option>'
                               '</select>'
  }

  // Atualiza a lista de selecionados
  atualizarLista();

}

function atualizarLista() {
  let selecionados = document.getElementById('listaDeSelecionados');
  selecionados.innerHTML = lista.map((item, index) => 
    `<span>${item}<img src="/img/excluir.png" alt="excluir" id='excluir' onclick='excluir(${index})'></span>`
  ).join(''); //MOSTRA O ARRAY NA DIV
}

//EXCLUI OS BALÕES CRIADOS NA SELEÇÃO DE EXAMES
function excluir(index) {
  lista.splice(index, 1); // Remove o item do array pelo índice
  atualizarLista(); // Atualiza a lista de selecionados na tela

  especialidades.innerHTML = '';//Exclui o select de especialidades
}



