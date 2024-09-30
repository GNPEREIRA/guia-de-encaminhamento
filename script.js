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

//   function buscarDadosCNPJ() {
//     const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
  
//     if (cnpj.length === 14) { // Verifica se o CNPJ tem 14 dígitos
//       fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data.status === "OK") {
//             document.getElementById('razaoSocial').value = data.nome;
//           } else {
//             alert('CNPJ não encontrado ou inválido.');
//           }
//         })
//         .catch(error => {
//           console.error('Erro ao buscar CNPJ:', error);
//           alert('Ocorreu um erro ao buscar o CNPJ.');
//         });
//     } else {
//       alert('CNPJ incompleto.');
//     }
//   }
  