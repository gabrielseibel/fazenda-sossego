// Roça & Roll: decoração do mundo. Luz vem de cima à esquerda.
pal({ k: "#1b1630", q: "#fff6e0", l: "#ffe98a" })
shades("abcd", "#2c6e49")   // pinheiro
shades("efgh", "#4f9a3e")   // arbusto
shades("mnop", "#8a5a36")   // madeira
shades("stuv", "#8c93a0")   // pedra
shades("wxyz", "#c9463d")   // vermelho
shades("WXYZ", "#e8b62c")   // amarelo
shades("1234", "#3f8fd0")   // água
shades("5678", "#b46fc0")   // lilás

for (const [n, sk] of [["a", 0], ["b", 1]]) {
  sprite("pine_" + n, { w: 22, h: 34, selout: "k" },
    rect(9, 27, 4, 7, "n"), vline(12, 27, 7, "m"),
    poly([11, 0, 17 + sk, 11, 5 - sk, 11], "b"),
    poly([11, 5, 20, 19 + sk, 2, 19 + sk], "b"),
    poly([11, 12, 22, 28, 0, 28], "b"),
    hline(6 - sk, 10, 10 + sk * 2, "a"), hline(3, 18 + sk, 16, "a"), hline(1, 27, 20, "a"),
    light([0, 0, 8, 2, 11, 0, 9, 9, 6, 9, 9, 16, 4, 16, 7, 25, 0, 25], 1),
    shade([14, 4, 22, 4, 22, 28, 16, 28, 18, 20, 14, 20, 16, 12, 13, 12], 1),
    px(9, 3, "d"), px(7, 13, "d"), px(5, 22, "d"), px(8, 21, "c"))
}

sprite("bush", { w: 16, h: 12, selout: "k" },
  ellipse(8, 7, 7, 4, "f"), circ(5, 5, 4, "f"), circ(11, 5, 3, "f"),
  light([5, 4, 3], 1), light([10, 4, 2], 1), shade([0, 9, 16, 3], 1),
  hline(3, 3, 3, "h"), hline(10, 3, 2, "h"))
sprite("bush_f", { base: "bush" }, hline(5, 6, 2, "y"), hline(10, 7, 2, "y"), hline(12, 5, 2, "Y"), hline(7, 9, 2, "Y"))

sprite("rock", { w: 13, h: 9, selout: "k" },
  ellipse(6, 5, 6, 3, "t"), circ(5, 4, 3, "t"),
  light([4, 3, 2], 1), shade([0, 7, 13, 2], 1), px(9, 4, "s"), px(8, 5, "s"))

sprite("flowers_r", { w: 12, h: 8 },
  px(2, 6, "f"), px(2, 5, "f"), px(6, 7, "f"), px(6, 6, "f"), px(10, 6, "f"), px(10, 5, "f"), px(4, 7, "e"), px(8, 7, "e"),
  px(2, 4, "y"), px(1, 4, "x"), px(3, 4, "x"), px(2, 3, "x"), px(6, 5, "Y"), px(5, 5, "X"), px(7, 5, "X"), px(6, 4, "X"),
  px(10, 4, "y"), px(9, 4, "x"), px(11, 4, "x"), px(10, 3, "x"))
sprite("flowers_y", { base: "flowers_r", swap: { x: "7", y: "8", X: "q", Y: "Y" } })

sprite("well", { w: 26, h: 30, selout: "k" },
  rect(3, 8, 2, 16, "n"), rect(21, 8, 2, 16, "n"), vline(3, 8, 16, "o"), vline(21, 8, 16, "o"),
  poly([0, 9, 13, 0, 26, 9], "x"), hline(2, 8, 22, "w"), light([0, 9, 13, 0, 13, 9], 1),
  hline(5, 11, 16, "n"), vline(13, 11, 6, "s"), rect(11, 16, 4, 3, "o"), hline(11, 16, 4, "p"),
  ellipse(13, 23, 12, 6, "t"), ellipse(13, 21, 12, 5, "u"), ellipse(13, 21, 9, 3, "2"), hline(8, 20, 5, "3"),
  shade([14, 22, 12, 8], 1), vline(6, 24, 4, "s"), vline(12, 26, 3, "s"), vline(19, 24, 4, "s"), hline(3, 25, 21, "s"))

sprite("lamp", { w: 8, h: 26, selout: "k" },
  rect(3, 7, 2, 17, "s"), vline(3, 7, 17, "t"), rect(1, 24, 6, 2, "s"), hline(1, 24, 6, "t"),
  rect(1, 1, 6, 6, "m"), rect(2, 2, 4, 4, "l"), hline(0, 0, 8, "n"), rect(2, 2, 2, 2, "q"))

sprite("sign", { w: 16, h: 16, selout: "k" },
  rect(7, 8, 2, 8, "n"), vline(7, 8, 8, "o"),
  rect(0, 1, 16, 8, "o"), hline(0, 1, 16, "p"), hline(0, 8, 16, "n"), hline(0, 5, 16, "n"),
  hline(3, 3, 10, "m"), hline(4, 6, 8, "m"))

sprite("bench", { w: 22, h: 12, selout: "k" },
  rect(0, 0, 22, 3, "o"), hline(0, 0, 22, "p"), rect(1, 3, 2, 3, "n"), rect(19, 3, 2, 3, "n"),
  rect(0, 6, 22, 3, "o"), hline(0, 6, 22, "p"), hline(0, 8, 22, "n"), rect(2, 9, 2, 3, "m"), rect(18, 9, 2, 3, "m"))

sheet("deco", ["pine_*", "bush*", "rock", "flowers_*", "well", "lamp", "sign", "bench"], { pad: 1 })
