// Roça & Roll: fazendeiro a pé e pets. Células 16x32 (gente) e 16x16 (pets) depois do contorno.
// Linhas: 0 frente, 1 costas, 2 direita, 3 esquerda. Colunas 0-3 andando, 4-5 parado.
pal({ k: "#1b1630", q: "#fff6e0",
  h: "#d9a93a", H: "#a8772a", i: "#f3d36e", r: "#8a3a1c",
  s: "#eab48a", S: "#c98a62", b: "#6b4226", B: "#4a2c18",
  t: "#7d8a3e", T: "#59642c", w: "#a3b05a", p: "#7a5a3c", P: "#5a4029", o: "#3d2a1e", O: "#2a1c14",
  e: "#d08a3c", E: "#a0632a", f: "#f2c27e", g: "#7a4a1e",
  a: "#d4d9e0", A: "#8e96a3", m: "#f4f6f9", n: "#6b7280", R: "#c9463d", N: "#e88bb0" })
ramps("kBbS", "kTtw", "kHhi", "kPp", "kEef", "kAam")

const DIRS = ["d", "u", "r"]
function farmer(c, dir, f) {
  const walk = f < 4, bob = walk && f % 2 === 1 ? 1 : 0, y0 = bob
  const lu = walk && f === 1 ? 1 : 0, ru = walk && f === 3 ? 1 : 0
  if (dir === "r") {
    // pernas em tesoura
    const fa = walk ? [0, 2, 0, -2][f] : 0
    c.rect(5 + fa, 21, 3, 5 - lu, "p"); c.rect(6 - fa, 21, 3, 5 - ru, "P")
    c.rect(5 + fa, 26 - lu, 4, 2, "o"); c.rect(6 - fa, 26 - ru, 4, 2, "O")
    c.rect(4, 14 + y0, 6, 7, "t"); c.vline(4, 14 + y0, 7, "T"); c.hline(4, 20 + y0, 6, "p")
    const sw = walk ? [0, 1, 0, -1][f] : 0
    c.rect(6 + sw, 15 + y0, 2, 5, "T"); c.px(6 + sw, 20 + y0, "s")
    c.rect(5, 8 + y0, 6, 6, "s"); c.px(11, 10 + y0, "s"); c.rect(5, 8 + y0, 2, 4, "b")
    c.rect(7, 11 + y0, 4, 3, "b"); c.px(10, 11 + y0, "s"); c.px(9, 9 + y0, "k")
    c.rect(1, 6 + y0, 13, 2, "h"); c.hline(1, 7 + y0, 13, "H"); c.rect(4, 2 + y0, 7, 4, "h"); c.hline(4, 5 + y0, 7, "r"); c.hline(5, 2 + y0, 4, "i")
    return
  }
  c.rect(4, 21, 3, 5 - lu, "p"); c.rect(7, 21, 3, 5 - ru, "p"); c.vline(7, 21, 5 - ru, "P")
  c.rect(4, 26 - lu, 3, 2, "o"); c.rect(7, 26 - ru, 3, 2, "o")
  c.rect(3, 14 + y0, 8, 7, "t"); c.hline(3, 20 + y0, 8, "p")
  c.rect(2, 15 + y0, 1, 5, "T"); c.rect(11, 15 + y0, 1, 5, "T"); c.px(2, 20 + y0, "s"); c.px(11, 20 + y0, "s")
  if (dir === "d") {
    c.vline(7, 14 + y0, 6, "T"); c.px(6, 14 + y0, "w"); c.px(8, 14 + y0, "w")
    c.rect(4, 8 + y0, 6, 6, "s"); c.px(3, 10 + y0, "S"); c.px(10, 10 + y0, "S")
    c.rect(4, 11 + y0, 6, 3, "b"); c.hline(6, 12 + y0, 2, "s"); c.px(5, 10 + y0, "k"); c.px(8, 10 + y0, "k")
    const blink = f === 5 ? "S" : null; if (blink) { c.px(5, 10 + y0, "S"); c.px(8, 10 + y0, "S") }
  } else {
    c.rect(4, 8 + y0, 6, 6, "b"); c.hline(4, 13 + y0, 6, "B"); c.px(3, 10 + y0, "S"); c.px(10, 10 + y0, "S")
  }
  c.rect(1, 6 + y0, 12, 2, "h"); c.hline(1, 7 + y0, 12, "H"); c.rect(3, 2 + y0, 8, 4, "h"); c.hline(3, 5 + y0, 8, "r"); c.hline(4, 2 + y0, 5, "i")
}
function pet(c, dir, f, kind) {
  const C = kind === "dog" ? ["e", "E", "f", "g"] : ["a", "A", "m", "n"], [b, d, l, x] = C
  const walk = f < 4, sit = !walk, wag = f === 5 ? 1 : 0, st = walk ? f % 2 : 0
  if (dir === "r") {
    if (sit) {
      c.rect(2, 8, 7, 5, b); c.rect(2, 12, 3, 1, d); c.rect(7, 10, 2, 3, b); c.px(8, 12, d)
      c.rect(7, 3, 5, 5, b); c.px(12, 5, b); c.px(12, 6, "k"); c.px(10, 4, "k")
      if (kind === "dog") { c.rect(7, 2, 2, 3, d); c.hline(7, 8, 4, "R") } else { c.px(7, 2, b); c.px(10, 2, b); c.hline(9, 6, 2, "N") }
      c.rect(0, kind === "dog" ? 7 - wag : 9 - wag, 2, kind === "dog" ? 2 : 4, d)
      return
    }
    c.rect(1, 6, 9, 4, b); c.hline(2, 9, 7, l)
    c.rect(2 + st, 10, 1, 3, d); c.rect(4 - st, 10, 1, 3, b); c.rect(7 + st, 10, 1, 3, d); c.rect(9 - st, 10, 1, 3, b)
    c.rect(9, 3, 4, 4, b); c.px(13, 5, b); c.px(13, 6, "k"); c.px(11, 4, "k")
    if (kind === "dog") { c.rect(9, 2, 2, 3, d); c.vline(9, 6, 2, "R"); c.rect(0, 4 + st, 2, 2, d) }
    else { c.px(9, 2, b); c.px(12, 2, b); c.rect(0, 2 + st, 1, 5, d); c.px(1, 6, d) }
    return
  }
  const front = dir === "d"
  if (sit) { c.rect(4, 7, 6, 6, b); c.rect(3, 11, 2, 2, d); c.rect(9, 11, 2, 2, d); c.hline(5, 12, 4, l) }
  else { c.rect(4, 6, 6, 7, b); c.rect(4, 12 - st, 2, 1, d); c.rect(8, 12 - (1 - st), 2, 1, d); c.rect(4, 13, 2, 1, d); c.rect(8, 13, 2, 1, d) }
  if (front) {
    c.rect(4, 2, 6, 5, b); c.px(5, 4, "k"); c.px(8, 4, "k"); c.hline(6, 5, 2, kind === "dog" ? "k" : "N"); c.hline(5, 6, 4, l)
    if (kind === "dog") { c.rect(3, 2, 1, 3, d); c.rect(10, 2, 1, 3, d); c.hline(4, 7, 6, "R") } else { c.px(4, 1, b); c.px(9, 1, b) }
  } else {
    c.rect(4, 2, 6, 5, b); c.hline(4, 6, 6, d)
    if (kind === "dog") { c.rect(3, 2, 1, 3, d); c.rect(10, 2, 1, 3, d); c.rect(6 + wag, 13, 2, 2, d) } else { c.px(4, 1, b); c.px(9, 1, b); c.rect(7 + wag, 12, 1, 3, d) }
  }
}
for (const dir of DIRS) for (let f = 0; f < 6; f++) {
  sprite("_far_" + dir + f, { w: 14, h: 30, outline: "k" }, (c) => farmer(c, dir, f))
  sprite("_dog_" + dir + f, { w: 14, h: 14, outline: "k" }, (c) => pet(c, dir, f, "dog"))
  sprite("_cat_" + dir + f, { w: 14, h: 14, outline: "k" }, (c) => pet(c, dir, f, "cat"))
}
const ROWS = [["d"], ["u"], ["r"], ["r", "x"]]
for (const [who, h] of [["far", 32], ["dog", 16], ["cat", 16]]) {
  const items = []
  ROWS.forEach(([d, fl], row) => { for (let f = 0; f < 6; f++) items.push(stamp("_" + who + "_" + d + f, f * 16, row * h, fl ? { flip: "x" } : {})) })
  sprite(who === "far" ? "player" : who, { w: 96, h: h * 4 }, ...items)
}
