
document.addEventListener("DOMContentLoaded", function () {
    const { jsPDF } = window.jspdf;

    function gerarPDF(event) {
        event.preventDefault(); // Previne o envio do formulário
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Adiciona a imagem estática (Exemplo: Logotipo da empresa)
        const logoURL = 'img/logo1.png'; // URL ou base64 da imagem
        doc.addImage(logoURL, 'PNG', 10, 10, 30, 10); // Adiciona logo na parte superior

        // Adiciona borda para cada seção
        doc.setDrawColor(0); // Cor da borda (0 = preto)
        doc.setLineWidth(0.2); // Largura da linha da borda

        // Adiciona o título do documento
        doc.setFontSize(16);
        doc.text("Guia de encaminhamento de exames", 70, 18); // Centralizado com base no logo

        // Extrai os valores do formulário
        const cnpj = document.getElementById('cnpj').value;
        const razaoSocial = document.getElementById('razao-social').value;
        const unidadeObra = document.getElementById('unidade-obra').value;
        const nomeFuncionario = document.getElementById('nome-funcionario').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const cargo = document.getElementById('cargo').value;
        const tiposExames = document.getElementById('tipos-exames').value;
        const dataAdmissao = document.getElementById('data-admissao').value;
        const preMatricula = document.getElementById('pre-matricula').value;
        const recomendacoes = document.getElementById('recomendacoes').value;
        const unidades = document.getElementById('unidades').value;
        const nomeResponsavel = document.getElementById('nome').value;
        const telefoneFixo = document.getElementById('telefone-fixo').value;
        const celular = document.getElementById('celular').value;
        const email = document.getElementById('email').value;
        const dataEmissao = document.getElementById('dataEmissao').value;
        const valorSelecionado = document.querySelector('input[name="opcao"]:checked').value;
        //const treinamentos = document.getElementById('treinamento').value;
        const listaExames = document.getElementById('listaDeSelecionados').value

        //Formata datas no padrão brasileiro
        function dateFormater(dataString){
            const[year, month, day] = dataString.split('-');
            return `${day}/${month}/${year}`;
        }

        //Novas variáveis com as datas formatadas no padrão BR
        const nascimentoFormatado = dateFormater(dataNascimento);
        const admissaoFormatada = dateFormater(dataAdmissao);
       

        // Dados da empresa
        // Adiciona borda para cada seção
        doc.rect(10, 27, 190, 20); // (x, y, largura, altura)
        doc.setFontSize(10);
        doc.text("Dados da Empresa", 10, 25);
        doc.text("CNPJ", 12, 35)
        doc.text("Razão Social", 75, 35)
        doc.text("Unidade", 170, 35)
        doc.text(`${cnpj}`, 12, 42);
        doc.text(`${razaoSocial}`, 75, 42);
        doc.text(`${unidadeObra}`, 170, 42);

        // Dados do funcionário
        doc.rect(10, 59, 190, 31); // (x, y, largura, altura)
        doc.text("Dados do Funcionário", 10, 57);
        doc.text("Nome", 12, 67);
        doc.text("Cargo", 85, 67);
        //doc.text("Pré-matrícula", 158, 72);
        doc.text("Data de admissão", 158, 67);
        doc.text("R.G.", 12, 80);
        doc.text("CPF", 85, 80);
        doc.text("Data de nascimento", 158, 80);
        doc.text(`${nomeFuncionario}`, 12, 72);
        doc.text(`${cargo}`, 85, 72);
        //doc.text(`${preMatricula}`, 158, 72);
        doc.text(`${admissaoFormatada}`, 158, 72);
        doc.text(`${rg}`, 12, 85);
        doc.text(`${cpf}`, 85, 85);
        doc.text(`${nascimentoFormatado}`, 158, 85);

        // Exames
        doc.rect(10, 100, 190, 28); // (x, y, largura, altura)
        doc.text("Exames", 10, 98);

        //Printa a lista de exames selecionados
        let x = 12;
        let y = 108;
        let count = 0
        listaDeExames.forEach((exame, index) => {
            doc.text(`${index + 1}. ${exame}`, x, y + (index*5));

            count++;  // Incrementa o contador de exames na linha

            // Quando atingir 10 exames, move para a nova coluna
            if (index + 1 === 4) {
                x = 60;  // Nova coluna
                y = 88;  // Reinicia a altura
            }
        });

        if(listaDeExames.includes('Mudança de função')){
            const novaFuncao = document.getElementById('mudancaFuncao').value;
            console.log(novaFuncao)
            doc.rect(138, 101.5, 60, 25); // (x, y, largura, altura)
            doc.text(`Nova função`, 158, 108);
            doc.text(`${novaFuncao}`, 142, 117);
        }

        // Prestador
        const unidadeProsed = unidades;
        let telefone;
        let endereco;
        let bairro;
        let cidade;
        let atendimento = '07:30 às 11:30 - 13:00 às 16:30';
        let referencia;
        let mapa;

        if(unidadeProsed === 'Cariacica'){
            telefone = '(27) 99582-6416';
            endereco = 'R. José Barros da Silva, 17'
            bairro = 'Campo Grande'
            cidade = 'Cariacica/ES'
            mapa = 'img/cariacica.png'
            referencia = `BR 101, próximo a Escola Lusiadas.\nEm frente a academia TopFit`
        }else if(unidadeProsed === 'Serra'){
            telefone = '(27) 99640-5527';
            endereco = 'R. Humberto de Campos, 25'
            bairro = 'Parque Residencial Laranjeiras'
            cidade = 'Serra/ES'
            mapa = 'img/serra.png'
            referencia = `Após o Palácio dos Brinquedos \n(Av. Central), Primeira esquerda`
        }if(unidadeProsed === 'Vila Velha'){
            telefone = '(27) 99640-5527';
            endereco = 'Av. Profª Francelina Carneiro Setubal, 168'
            bairro = 'Itapuã'
            cidade = 'Vila Velha/ES'
            mapa = 'img/vila_velha.png'
            referencia = `Próximo ao terminal de Vila Velha.\nAtrás da loja de armas, Guerreiros`
        }else if(unidadeProsed === 'Vitória'){
            telefone = '(27) 99582-6416';
            endereco = 'R. Neves Armond, 535'
            bairro = 'Enseada do Suá'
            cidade = 'Vitória/ES'
            mapa = 'img/vitoria.png'
            referencia = `Próximo a EDP Escelsa (Av. Vitória).\nAo lado da Dakar Veículos`
        }

        doc.rect(10, 137, 190, 50); // (x, y, largura, altura)
        doc.text('Prestador', 10, 135);
        doc.text(`Prosed:`, 12, 145);
        doc.text(`Telefone:`, 12, 150);
        doc.text(`Endereço:`, 12, 155);
        doc.text(`Bairro:`, 12, 160);
        doc.text(`Cidade/UF:`, 12, 165);
        doc.text(`Atendimento:`, 12, 170);
        doc.text(`Referência:`, 12, 180);
        doc.text(`${unidades}`, 35, 145);
        doc.text(`${telefone}`, 35, 150);
        doc.text(`${endereco}`, 35, 155);
        doc.text(`${bairro}`, 35, 160);
        doc.text(`${cidade}`, 35, 165);
        doc.text(`${atendimento}`, 35, 170);
        doc.text(`${referencia}`, 35, 180);
        doc.addImage(mapa, 'PNG', 102, 138, 97, 48); // Adiciona o mapa
        
        //Treinamentos
        let resposta;
        if(valorSelecionado === 'Sim'){
            const treinamentos = document.getElementById('nome-treinamento-input').value;
            resposta = treinamentos ? treinamentos : "Nenhum treinamento informado"
        }else if(valorSelecionado === 'Não'){
            resposta = '--'
        }

        doc.rect(10, 195, 190, 13); // (x, y, largura, altura)
        doc.text("Treinamentos", 10, 193);
        doc.text('Treinamento a realizar:', 12, 200);
        doc.text('Qual:', 12, 205);
        doc.text(`${valorSelecionado}`, 50, 200);
        doc.text(`${resposta}`, 23, 205);

        //Recomendações
        const larguraMaxima = 185;// Define a largura máxima que o texto pode ocupar (ex: 180px)
        const textoFormatado = doc.splitTextToSize(recomendacoes, larguraMaxima); // Divide o texto em múltiplas linhas, se necessário

        doc.rect(10, 215, 190, 25); // (x, y, largura, altura)
        doc.text("Recomendações / Observações", 10, 213);
        doc.text(textoFormatado, 12, 220);

        // Responsável pela emissão da guia
        doc.rect(10, 248, 190, 30); // (x, y, largura, altura)
        doc.text("Responsável pela Emissão da Guia", 10, 246);
        doc.text(`Nome:`, 12, 253);
        doc.text(`Tel. fixo:`, 12, 258);
        doc.text(`Tel. celular:`, 12, 263);
        doc.text(`E-mail:`, 12, 268);
        doc.text(`Emitido em`, 12, 273);
        doc.text(`${nomeResponsavel}`, 35, 253);
        doc.text(`${telefoneFixo}`, 35, 258);
        doc.text(`${celular}`, 35, 263);
        doc.text(`${email}`, 35, 268);
        doc.text(`${dataEmissao}`, 35, 273);

        //imagem dinâmica
        const inputImage = document.getElementById('input-imagem');
        if (inputImage && inputImage.files && inputImage.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                doc.addImage(imgData, 'PNG', 150, 260, 40, 30); // Assinatura ou foto do usuário
                doc.save('dados-formulario.pdf'); // Gera e faz o download do PDF após carregar a imagem
            };
            reader.readAsDataURL(inputImage.files[0]); // Converte a imagem selecionada para base64
        } else {
            doc.save('dados-formulario.pdf'); // Se não houver imagem dinâmica, gera o PDF diretamente
        }
    }

    document.getElementById('meu-formulario').addEventListener('submit', gerarPDF);
});
