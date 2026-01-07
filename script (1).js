// Gerenciamento de Linhas
let contadorPessoas = 0;

function adicionarLinha() {
    const tbody = document.getElementById('corpoTabela');
    const tr = document.createElement('tr');
    tr.id = `linha-${contadorPessoas}`;
    tr.innerHTML = `
        <td><input type="text" placeholder="Nome"></td>
        <td><input type="number" class="val-input" placeholder="0"></td>
        <td class="result-val">R$ 0,00</td>
        <td><button class="btn-remove" onclick="removerLinha('${tr.id}')">×</button></td>
    `;
    tbody.appendChild(tr);
    contadorPessoas++;
}

function removerLinha(id) {
    document.getElementById(id).remove();
}

// Inicializa com 3 pessoas como no original
for(let i=0; i<3; i++) adicionarLinha();

// Troca de Tema
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    document.getElementById('themeToggle').innerText = isDark ? "☀️ Modo Dia" : "🌙 Modo Noite";
}

// Lógica de Cálculo
function calcular() {
    const valorTotal = parseFloat(document.getElementById('valorTotal').value) || 0;
    const tipo = document.getElementById('tipoCalculo').value;
    const prodTotalFilial = parseFloat(document.getElementById('producaoTotalFilial').value) || 1;
    
    const linhas = document.querySelectorAll('#corpoTabela tr');
    const totalPessoas = linhas.length;

    linhas.forEach(linha => {
        const inputIndividual = linha.querySelector('.val-input').value || 0;
        const displayResultado = linha.querySelector('.result-val');
        let final = 0;

        if (tipo === 'proporcional') {
            final = (inputIndividual / prodTotalFilial) * valorTotal;
        } else if (tipo === 'igualitario') {
            final = valorTotal / totalPessoas;
        } else if (tipo === 'metaFixa') {
            final = valorTotal - inputIndividual; // Ex: Falta quanto para a meta?
        }

        displayResultado.innerText = final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });
}

// Esconder/Mostrar campo de Produção Total conforme o tipo
document.getElementById('tipoCalculo').addEventListener('change', function() {
    const display = this.value === 'proporcional' ? 'block' : 'none';
    document.getElementById('groupProducaoTotal').style.display = display;
    document.getElementById('thVariavel').innerText = this.value === 'metaFixa' ? 'Já Realizado' : 'Produção (R$)';
});
