# GDD — Guia do Jogador (Onboarding e Almanaque)

**Sistema:** Guia do Jogador · **Categoria:** UI / Meta (tutorial) · **Status:** implementado no MVP
**Lentes aplicadas:** game-designer (principal), ux-designer (fluxo), ui-programmer (viabilidade)

## 1. Visão geral
Ensina as mecânicas da Fazenda Sossego sem tirar o jogador do jogo. Tem quatro partes:
tutorial guiado pelo Seu Zé, almanaque ilustrado (📖), faixa de contexto do lote e seta de objetivo.

## 2. Fantasia do jogador
"Um vizinho experiente me mostra a fazenda." O jogador aprende fazendo, no próprio campo,
e nunca fica sem saber o que o chão embaixo do trator está pedindo.

## 3. Regras detalhadas
### 3.1 Tutorial do Seu Zé (10 passos)
| # | Ensina | Conclui quando |
|---|--------|----------------|
| 1 | Boas-vindas | jogador toca em Próximo |
| 2 | Dirigir | trator andou 90 px |
| 3 | Achar o Campo 1 (seta dourada) | trator dentro do Campo 1 |
| 4 | Arar no modo AUTO | 30 lotes arados |
| 5 | Plantar | 30 lotes plantados |
| 6 | Pulverizar | 20 lotes pulverizados |
| 7 | Esperar e colher | 40 lotes colhidos |
| 8 | Vender (botão pulsa) | 1 venda feita |
| 9 | Comprar máquina autônoma (Loja pulsa) | 1 máquina comprada |
| 10 | Encerramento e convite ao almanaque | jogador toca em Bora! |

- Texto em efeito de máquina de escrever (50 caracteres/s); tocar em Próximo completa o texto.
- Passos de ação mostram barra de progresso e contador.
- "Pular tutorial" encerra na hora; "Rever o tutorial" fica na última página do almanaque.
- Enquanto o tutorial está ativo, o painel de missões fica oculto (as missões continuam valendo e pagando).

### 3.2 Almanaque (7 páginas)
Ciclo da lavoura · Seu trator · Máquinas autônomas · Culturas · Silo e mercado · Tempo e clima · Dicas.
Imagens e números vêm dos mesmos dados do jogo (sprites, preços, tempos), então não desatualizam.
Abre pelo botão 📖 do topo, pela tecla G e por "Como jogar" na tela inicial.

### 3.3 Faixa de contexto
Acima dos botões de ferramenta: campo atual, estado do lote sob o trator e a ação indicada
(ex.: "Campo 1 · terra arada → PLANTAR 🌾"). Some fora dos campos.

### 3.4 Seta de objetivo
Durante os passos 3 a 7, se o trator está fora do Campo 1: seta dourada na borda da tela apontando
para o campo; com o campo visível, a seta quica sobre ele.

## 4. Fórmulas
- Progresso do passo = min(1, atual / meta).
- % maduro do campo (visível com a câmera afastada) = lotes maduros / lotes do campo.

## 5. Casos de borda
- Save antigo sem tutorial: quem já passou da 6ª missão entra com o tutorial concluído.
- Condição já cumprida ao entrar no passo: avança sozinho.
- Loja ou almanaque abertos: o balão do Seu Zé se esconde.
- Tela baixa (paisagem no celular): balão compacto e faixa de contexto oculta.

## 6. Dependências
Lavoura (estados dos lotes), Economia (venda, loja), Máquinas autônomas, HUD, Salvamento (`tut`).

## 7. Parâmetros de ajuste
Metas dos passos (30/30/20/40), velocidade do texto (50 c/s), distância do passo 2 (90 px),
margens da seta de objetivo.

## 8. Critérios de aceite
- [x] Um jogador novo fecha o primeiro ciclo completo só seguindo o Seu Zé.
- [x] Os 10 passos avançam em PC (teclado) e celular (toque), sem erros no console.
- [x] As 7 páginas do almanaque abrem e navegam em 390 px e 1280 px de largura.
- [x] Tutorial pode ser pulado e revisto; o estado sobrevive ao recarregar.
