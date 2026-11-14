# Roça & Roll 🚜

Simulador de fazenda cozy em pixel art, visto de cima, para navegador (PC e celular).
(O repositório ainda se chama `fazenda-sossego`, o nome antigo do jogo.)

**Jogar:** https://gabrielseibel.github.io/fazenda-sossego/

- Are, plante, pulverize e colha: trator para o serviço de campo, colheitadeira para colher, um serviço de cada vez.
- Você escolhe: dirigir, chamar um ajudante para a sua máquina ou só gerenciar.
- Contrate ajudantes e máquinas autônomas e diga de quais terras cada um cuida (aba Equipe).
- 12 campos para comprar e renomear, 5 culturas, mercado com preços que mudam a cada dia, melhorias e missões.
- Vila Pamonha com 8 moradores para fazer amizade (conversa diária, presentes, bônus com 3 corações) e duas fazendas vizinhas que tocam a própria roça.
- Dia e noite, chuva, estrada com carros, pasto com vacas, galinhas, pássaros.
- Tutorial guiado pelo Seu Zé e almanaque ilustrado (📖).
- Progresso salvo automaticamente no navegador.

## Controles
- **PC:** WASD ou setas para dirigir · 1–4 troca o equipamento · 5 chama o ajudante · F conversa · L loja · G guia · V vender · Z zoom
- **Celular:** arraste o dedo na tela para dirigir

Um único arquivo (`index.html`), sem dependências nem build.
Documento de design do guia: `design/gdd/guia-do-jogador.md`.

## Arte e ferramentas
- Tratores, máquinas, carros, plantações e terreno: gerados pelo próprio código do jogo.
- Decoração do mundo (pinheiros, arbustos, pedras, flores, poço, postes, placas, bancos): desenhada como código com [pxl](https://github.com/uilianks/pxl) (MIT). Fonte em `art/deco.px.js`; para regerar: `node <pxl>/bin/pxl.js build art/deco.px.js`.
- Construções, árvores frutíferas, animais, moradores, barracas, cerca do pasto e espantalhos: pacote *Farm & Ranch Life 16x16*, embutidos no jogo conforme a licença do pacote; os arquivos originais não fazem parte deste repositório.
