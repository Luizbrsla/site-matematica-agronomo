// Função para mostrar seções
function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.calculator-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar a seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Função para validar entrada numérica
function validarNumero(valor, nome) {
    const numero = parseFloat(valor);
    if (isNaN(numero) || numero <= 0) {
        throw new Error(`${nome} deve ser um número válido maior que zero.`);
    }
    return numero;
}

// Função para formatar números
function formatarNumero(numero, decimais = 2) {
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: decimais,
        maximumFractionDigits: decimais
    });
}

// Função para mostrar resultado
function mostrarResultado(elementId, conteudo, sucesso = true) {
    const elemento = document.getElementById(elementId);
    elemento.innerHTML = conteudo;
    elemento.className = `resultado ${sucesso ? 'success' : 'error'}`;
}

// ===== CÁLCULOS DE ÁREA =====

function calcularAreaRetangular() {
    try {
        const comprimento = validarNumero(document.getElementById('comprimento').value, 'Comprimento');
        const largura = validarNumero(document.getElementById('largura').value, 'Largura');
        
        // Cálculo: Área = Comprimento × Largura
        const area = comprimento * largura;
        
        // Conversões
        const areaHectares = area / 10000;
        const areaAlqueirePaulista = area / 24200;
        const areaAlqueireMineiro = area / 48400;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            📐 Área: ${formatarNumero(area)} m²<br>
            🌾 Hectares: ${formatarNumero(areaHectares, 4)} ha<br>
            📏 Alqueire Paulista: ${formatarNumero(areaAlqueirePaulista, 4)} alq<br>
            📏 Alqueire Mineiro: ${formatarNumero(areaAlqueireMineiro, 4)} alq<br><br>
            <em>Fórmula aplicada: ${formatarNumero(comprimento)} × ${formatarNumero(largura)} = ${formatarNumero(area)} m²</em>
        `;
        
        mostrarResultado('resultado-area-ret', resultado);
    } catch (error) {
        mostrarResultado('resultado-area-ret', `❌ Erro: ${error.message}`, false);
    }
}

function calcularAreaCircular() {
    try {
        const raio = validarNumero(document.getElementById('raio').value, 'Raio');
        
        // Cálculo: Área = π × raio²
        const area = Math.PI * Math.pow(raio, 2);
        
        // Conversões
        const areaHectares = area / 10000;
        const areaAlqueirePaulista = area / 24200;
        const areaAlqueireMineiro = area / 48400;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            📐 Área: ${formatarNumero(area)} m²<br>
            🌾 Hectares: ${formatarNumero(areaHectares, 4)} ha<br>
            📏 Alqueire Paulista: ${formatarNumero(areaAlqueirePaulista, 4)} alq<br>
            📏 Alqueire Mineiro: ${formatarNumero(areaAlqueireMineiro, 4)} alq<br><br>
            <em>Fórmula aplicada: π × ${formatarNumero(raio)}² = ${formatarNumero(area)} m²</em>
        `;
        
        mostrarResultado('resultado-area-circ', resultado);
    } catch (error) {
        mostrarResultado('resultado-area-circ', `❌ Erro: ${error.message}`, false);
    }
}

// ===== CÁLCULOS DE IRRIGAÇÃO =====

function calcularIrrigacao() {
    try {
        const area = validarNumero(document.getElementById('area-irrigacao').value, 'Área');
        const lamina = validarNumero(document.getElementById('lamina-agua').value, 'Lâmina d\'água');
        const eficiencia = validarNumero(document.getElementById('eficiencia').value, 'Eficiência');
        
        if (eficiencia > 100) {
            throw new Error('Eficiência não pode ser maior que 100%.');
        }
        
        // Cálculo: Volume = Área × Lâmina d'água × (100 / Eficiência)
        // Conversão: mm para metros = lamina / 1000
        const volumeIdeal = area * (lamina / 1000) * 1000; // em litros
        const volumeReal = volumeIdeal * (100 / eficiencia);
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            💧 Volume ideal: ${formatarNumero(volumeIdeal)} litros<br>
            💧 Volume real necessário: ${formatarNumero(volumeReal)} litros<br>
            📊 Diferença por ineficiência: ${formatarNumero(volumeReal - volumeIdeal)} litros<br><br>
            <em>Fórmula aplicada: ${formatarNumero(area)} m² × ${formatarNumero(lamina)} mm × (100/${formatarNumero(eficiencia, 0)}%) = ${formatarNumero(volumeReal)} L</em>
        `;
        
        mostrarResultado('resultado-irrigacao', resultado);
    } catch (error) {
        mostrarResultado('resultado-irrigacao', `❌ Erro: ${error.message}`, false);
    }
}

function calcularTempoIrrigacao() {
    try {
        const volume = validarNumero(document.getElementById('volume-necessario').value, 'Volume necessário');
        const vazao = validarNumero(document.getElementById('vazao-sistema').value, 'Vazão do sistema');
        
        // Cálculo: Tempo = Volume ÷ Vazão
        const tempoHoras = volume / vazao;
        const tempoMinutos = tempoHoras * 60;
        const horas = Math.floor(tempoHoras);
        const minutos = Math.round((tempoHoras - horas) * 60);
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            ⏰ Tempo necessário: ${horas}h ${minutos}min<br>
            ⏰ Total em horas: ${formatarNumero(tempoHoras)} horas<br>
            ⏰ Total em minutos: ${formatarNumero(tempoMinutos, 0)} minutos<br><br>
            <em>Fórmula aplicada: ${formatarNumero(volume)} L ÷ ${formatarNumero(vazao)} L/h = ${formatarNumero(tempoHoras)} horas</em>
        `;
        
        mostrarResultado('resultado-tempo-irrigacao', resultado);
    } catch (error) {
        mostrarResultado('resultado-tempo-irrigacao', `❌ Erro: ${error.message}`, false);
    }
}

// ===== CÁLCULOS DE FERTILIZANTES =====

function calcularFertilizante() {
    try {
        const area = validarNumero(document.getElementById('area-fertilizante').value, 'Área');
        const dose = validarNumero(document.getElementById('dose-fertilizante').value, 'Dose');
        
        // Cálculo: Quantidade = Área × Dose ÷ 1000 (conversão g para kg)
        const quantidadeGramas = area * dose;
        const quantidadeKg = quantidadeGramas / 1000;
        const sacas50kg = quantidadeKg / 50;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            ⚖️ Quantidade total: ${formatarNumero(quantidadeKg)} kg<br>
            ⚖️ Quantidade em gramas: ${formatarNumero(quantidadeGramas, 0)} g<br>
            📦 Sacas de 50kg: ${formatarNumero(sacas50kg)} sacas<br><br>
            <em>Fórmula aplicada: ${formatarNumero(area)} m² × ${formatarNumero(dose)} g/m² = ${formatarNumero(quantidadeKg)} kg</em>
        `;
        
        mostrarResultado('resultado-fertilizante', resultado);
    } catch (error) {
        mostrarResultado('resultado-fertilizante', `❌ Erro: ${error.message}`, false);
    }
}

function calcularCustoFertilizante() {
    try {
        const quantidade = validarNumero(document.getElementById('quantidade-fertilizante').value, 'Quantidade');
        const preco = validarNumero(document.getElementById('preco-fertilizante').value, 'Preço');
        
        // Cálculo: Custo = Quantidade × Preço
        const custoTotal = quantidade * preco;
        const custoPorHectare = custoTotal / (quantidade / 1000); // assumindo 1000kg/ha como base
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            💰 Custo total: R$ ${formatarNumero(custoTotal)}<br>
            💰 Custo por kg: R$ ${formatarNumero(preco)}<br>
            📊 Quantidade: ${formatarNumero(quantidade)} kg<br><br>
            <em>Fórmula aplicada: ${formatarNumero(quantidade)} kg × R$ ${formatarNumero(preco)} = R$ ${formatarNumero(custoTotal)}</em>
        `;
        
        mostrarResultado('resultado-custo-fertilizante', resultado);
    } catch (error) {
        mostrarResultado('resultado-custo-fertilizante', `❌ Erro: ${error.message}`, false);
    }
}

// ===== CÁLCULOS DE SEMENTES =====

function calcularSementes() {
    try {
        const area = validarNumero(document.getElementById('area-sementes').value, 'Área');
        const densidade = validarNumero(document.getElementById('densidade-plantio').value, 'Densidade');
        const germinacao = validarNumero(document.getElementById('germinacao').value, 'Taxa de germinação');
        
        if (germinacao > 100) {
            throw new Error('Taxa de germinação não pode ser maior que 100%.');
        }
        
        // Cálculo: Quantidade = Área × Densidade × (100 / Germinação)
        const sementesIdeais = area * densidade;
        const sementesReais = sementesIdeais * (100 / germinacao);
        const sementesExtras = sementesReais - sementesIdeais;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            🌱 Sementes necessárias: ${formatarNumero(sementesReais, 0)} sementes<br>
            🌱 Sementes ideais: ${formatarNumero(sementesIdeais, 0)} sementes<br>
            📊 Sementes extras (perdas): ${formatarNumero(sementesExtras, 0)} sementes<br>
            📈 Taxa de segurança: ${formatarNumero(100 - germinacao)}%<br><br>
            <em>Fórmula aplicada: ${formatarNumero(area)} m² × ${formatarNumero(densidade)} sem/m² × (100/${formatarNumero(germinacao, 0)}%) = ${formatarNumero(sementesReais, 0)} sementes</em>
        `;
        
        mostrarResultado('resultado-sementes', resultado);
    } catch (error) {
        mostrarResultado('resultado-sementes', `❌ Erro: ${error.message}`, false);
    }
}

function calcularEspacamento() {
    try {
        const densidade = validarNumero(document.getElementById('densidade-espacamento').value, 'Densidade');
        
        // Cálculo: Espaçamento = √(1 / Densidade) em metros
        const espacamento = Math.sqrt(1 / densidade);
        const espacamentoCm = espacamento * 100;
        const areaPlanta = 1 / densidade;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            📏 Espaçamento recomendado: ${formatarNumero(espacamento)} m<br>
            📏 Espaçamento em centímetros: ${formatarNumero(espacamentoCm)} cm<br>
            📐 Área por planta: ${formatarNumero(areaPlanta)} m²<br>
            🌱 Densidade: ${formatarNumero(densidade)} plantas/m²<br><br>
            <em>Fórmula aplicada: √(1 ÷ ${formatarNumero(densidade)}) = ${formatarNumero(espacamento)} m</em>
        `;
        
        mostrarResultado('resultado-espacamento', resultado);
    } catch (error) {
        mostrarResultado('resultado-espacamento', `❌ Erro: ${error.message}`, false);
    }
}

// ===== CÁLCULOS DE PRODUTIVIDADE =====

function calcularProdutividade() {
    try {
        const producao = validarNumero(document.getElementById('producao-total').value, 'Produção total');
        const area = validarNumero(document.getElementById('area-colheita').value, 'Área colhida');
        
        // Cálculo: Produtividade = (Produção ÷ Área) × 10000 (conversão para hectare)
        const produtividade = (producao / area) * 10000;
        const produtividadeToneladas = produtividade / 1000;
        const areaHectares = area / 10000;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            📊 Produtividade: ${formatarNumero(produtividade)} kg/ha<br>
            📊 Produtividade: ${formatarNumero(produtividadeToneladas)} t/ha<br>
            📐 Área colhida: ${formatarNumero(areaHectares)} hectares<br>
            ⚖️ Produção total: ${formatarNumero(producao)} kg<br><br>
            <em>Fórmula aplicada: (${formatarNumero(producao)} kg ÷ ${formatarNumero(area)} m²) × 10.000 = ${formatarNumero(produtividade)} kg/ha</em>
        `;
        
        mostrarResultado('resultado-produtividade', resultado);
    } catch (error) {
        mostrarResultado('resultado-produtividade', `❌ Erro: ${error.message}`, false);
    }
}

function calcularReceita() {
    try {
        const producao = validarNumero(document.getElementById('producao-receita').value, 'Produção total');
        const preco = validarNumero(document.getElementById('preco-venda').value, 'Preço de venda');
        
        // Cálculo: Receita = Produção × Preço
        const receitaTotal = producao * preco;
        const producaoToneladas = producao / 1000;
        const precoTonelada = preco * 1000;
        
        const resultado = `
            <strong>Resultado do Cálculo:</strong><br>
            💰 Receita bruta total: R$ ${formatarNumero(receitaTotal)}<br>
            ⚖️ Produção: ${formatarNumero(producao)} kg (${formatarNumero(producaoToneladas)} t)<br>
            💲 Preço: R$ ${formatarNumero(preco)}/kg (R$ ${formatarNumero(precoTonelada)}/t)<br>
            📈 Receita por kg: R$ ${formatarNumero(preco)}<br><br>
            <em>Fórmula aplicada: ${formatarNumero(producao)} kg × R$ ${formatarNumero(preco)} = R$ ${formatarNumero(receitaTotal)}</em>
        `;
        
        mostrarResultado('resultado-receita', resultado);
    } catch (error) {
        mostrarResultado('resultado-receita', `❌ Erro: ${error.message}`, false);
    }
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar a primeira seção por padrão
    showSection('area');
    
    // Adicionar eventos de Enter nos inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Encontrar o botão na mesma seção e clicar
                const section = input.closest('.calculator-card');
                const button = section.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Adicionar validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const valor = parseFloat(this.value);
            if (this.value && (isNaN(valor) || valor <= 0)) {
                this.style.borderColor = '#f44336';
                this.style.backgroundColor = '#ffebee';
            } else {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
    });
});

// Função para limpar todos os campos de uma seção
function limparCampos(sectionId) {
    const section = document.getElementById(sectionId);
    const inputs = section.querySelectorAll('input');
    const resultados = section.querySelectorAll('.resultado');
    
    inputs.forEach(input => {
        input.value = '';
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    });
    
    resultados.forEach(resultado => {
        resultado.innerHTML = '';
        resultado.className = 'resultado';
    });
}

// Função para exportar resultados (futura implementação)
function exportarResultados() {
    // Esta função pode ser implementada para exportar os cálculos em PDF ou Excel
    alert('Funcionalidade de exportação será implementada em versão futura.');
}

