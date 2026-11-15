# Roça & Roll 🚜

Simulador de fazenda cozy em pixel art, visto de cima, para navegador (PC e celular).
(O repositório ainda se chama `fazenda-sossego`, o nome antigo do jogo.)

**Jogar:** https://gabrielseibel.github.io/fazenda-sossego/

- Are, plante, aplique o tratamento e colha: trator para o serviço de campo, colheitadeira para colher.
- A equipe segue o plano campo a campo: ara o campo inteiro, planta, trata e só colhe quando tudo amadurece.
- Ande a pé pelo mapa enquanto a equipe trabalha; substitua qualquer ajudante por um tempo e devolva a máquina.
- Ajudantes com turnos de 8 horas e salário diário; máquinas autônomas trabalham 24 horas. Diga de quais terras cada um cuida.
- 4 estações de 28 dias, culturas por época, qualidade ★ com adubo e irrigação subterrânea por campo.
- Eventos aleatórios (vaca fugida, corvos, pneu furado, encomendas, ovo dourado, círculo misterioso) e pets (Caramelo e Mingau).
- Pátio de máquinas com vagas e suporte para os implementos que não estão em uso.
- Agroindústria: duto pneumático do silo para moinho, prensa, barris e usina de biodiesel; energia de vento, sol e água; desgaste das máquinas com manutenção (óleo + peça forjada); estufas modulares com microclima.
- Mina com 50 níveis em 5 biomas: minérios, monstros, bombas, sonar, brocas autônomas com torretas e trilhos, fundição contínua, aço de irídio, Forja do Brasa para melhorar ferramentas, e o Vale Etéreo escondido no fundo.
- 12 campos maiores para comprar e renomear, 5 culturas, mercado com preços diários, melhorias e missões.
- Vila Pamonha com 8 moradores para fazer amizade (conversa diária, presentes, bônus com 3 corações) e duas fazendas vizinhas que tocam a própria roça.
- Dia e noite, chuva, estrada com carros, pasto com vacas, galinhas, pássaros.
- Tutorial guiado pelo Seu Zé e almanaque ilustrado (📖).
- Progresso salvo automaticamente no navegador.

## Controles
- **PC:** WASD ou setas para andar/dirigir · 1–4 equipamento · Q desce (a pé) · F ação (falar, entrar, resolver evento) · 5 ajudante · B bomba e N sonar (na mina) · L loja · G guia · V vender · Z zoom
- **Celular:** arraste o dedo na tela para dirigir

O jogo é o `index.html` mais as músicas da pasta `music/`, sem dependências nem build.
Documento de design do guia: `design/gdd/guia-do-jogador.md`.

## Arte e ferramentas
- Tratores, máquinas, carros, plantações e terreno: gerados pelo próprio código do jogo.
- Decoração do mundo (pinheiros, arbustos, pedras, flores, poço, postes, placas, bancos): desenhada como código com [pxl](https://github.com/uilianks/pxl) (MIT). Fonte em `art/deco.px.js`; para regerar: `node <pxl>/bin/pxl.js build art/deco.px.js`.
- Fazendeiro a pé, Caramelo e Mingau: desenhados com pxl (`art/chars.px.js`).
- Trilha sonora (uma música por estação e o tema da vila): composta como código com [chirp](https://github.com/uilianks/chirp), fonte em `music/roca.cx.js`, volume nivelado em −20 LUFS com ffmpeg.
- Construções, árvores frutíferas, animais, moradores, barracas, cerca do pasto e espantalhos: pacote *Farm & Ranch Life 16x16*, embutidos no jogo conforme a licença do pacote; os arquivos originais não fazem parte deste repositório.
