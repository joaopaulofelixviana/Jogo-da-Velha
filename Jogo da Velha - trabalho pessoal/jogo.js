document.addEventListener('DOMContentLoaded', function() {
    const jogador = document.getElementById('jogadas');
    const contador = document.getElementById('cont');
    let contador_jogada = 0;
    const lista = [
        document.getElementById('um'),
        document.getElementById('dois'),
        document.getElementById('tres'),
        document.getElementById('quatro'),
        document.getElementById('cinco'),
        document.getElementById('seis'),
        document.getElementById('sete'),
        document.getElementById('oito'),
        document.getElementById('nove')
    ];

    const combinacoes_vitoria = [
        [0, 1, 2], // linha 1
        [3, 4, 5], // linha 2
        [6, 7, 8], // linha 3
        [0, 3, 6], // coluna 1
        [1, 4, 7], // coluna 2
        [2, 5, 8], // coluna 3
        [0, 4, 8], // diagonal 1
        [2, 4, 6]  // diagonal 2
    ];

    function verificarVitoria() {
        for (const combinacao of combinacoes_vitoria) {
            const [a, b, c] = combinacao;
            if (lista[a].textContent && lista[a].textContent === lista[b].textContent && lista[b].textContent === lista[c].textContent) {
                return lista[a].textContent;
            }
        }
        return null;
    }

    function verificarEmpate() {
        return lista.every(celula => celula.textContent !== '');
    }

    function reiniciarJogo() {
        lista.forEach(celula => celula.textContent = '');
        contador_jogada = 0;
        jogador.textContent = 'Inicie o jogo';
        contador.textContent = '';
    }

    lista.forEach((pos, index) => {
        pos.addEventListener('click', () => {
            if (pos.textContent === '') {
                if (contador_jogada % 2 === 0) {
                    pos.textContent = 'X';
                    jogador.textContent = 'Jogador Dois';
                } else {
                    pos.textContent = 'O';
                    jogador.textContent = 'Jogador Um';
                }

                contador_jogada++;
                
                const vitoria = verificarVitoria();
                if (vitoria) {
                    jogador.textContent = `${vitoria} venceu!`;
                    setTimeout(reiniciarJogo, 2000); // Reinicia o jogo após 2 segundos
                    return;
                }

                if (verificarEmpate()) {
                    jogador.textContent = 'Empate!';
                    setTimeout(reiniciarJogo, 2000); // Reinicia o jogo após 2 segundos
                }

                contador.textContent = `Jogada: ${contador_jogada}`;
            }
        });
    });
});