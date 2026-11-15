// Roça & Roll: trilha lo-fi aconchegante. 10 faixas de ~1,5 a 2 min, com introdução, groove, melodia,
// pausa, volta e final, para tocarem em sequência sem cansar. O "vinil" (chiado, estalo, fita) entra no ffmpeg.
inst("rhodes", { wave: "fm", fm: { ratio: 1, index: 1.4, decay: 0.6 }, env: [0.006, 0.9, 0.25, 0.7], vol: 0.13, tremolo: { rate: 4, depth: 0.12 }, filter: { type: "lp", cutoff: 2600 } })
inst("sinos", { wave: "fm", fm: { ratio: 3.5, index: 2, decay: 0.5 }, env: [0.002, 0.7, 0.1, 0.6], vol: 0.075 })
inst("violao", { wave: "fm", fm: { ratio: 2, index: 1.1, decay: 0.15 }, env: [0.002, 0.3, 0.12, 0.3], vol: 0.12, filter: { type: "lp", cutoff: 3000 } })
inst("flauta", { wave: "triangle", env: [0.05, 0.1, 0.8, 0.3], vol: 0.15, vibrato: { rate: 5, depth: 0.12, delay: 0.25 }, filter: { type: "lp", cutoff: 2400 } })
inst("sax", { wave: "saw", env: [0.04, 0.2, 0.7, 0.25], vol: 0.06, vibrato: { rate: 4.5, depth: 0.1, delay: 0.3 }, filter: { type: "lp", cutoff: 1300 } })
inst("sanfona", { wave: "square", duty: 0.25, env: [0.02, 0.1, 0.7, 0.15], vol: 0.07, vibrato: { rate: 6, depth: 0.12, delay: 0.1 }, filter: { type: "lp", cutoff: 1800 } })
inst("pad", { wave: "saw", env: [0.7, 0.3, 0.7, 1.4], vol: 0.035, filter: { type: "lp", cutoff: 900 } })
inst("baixo", { wave: "sine", env: [0.005, 0.3, 0.5, 0.15], vol: 0.5, filter: { type: "lp", cutoff: 700 } })

function lcg(seed) { let a = seed >>> 0; return () => ((a = (a * 1664525 + 1013904223) >>> 0) / 4294967296) }
const E = () => Array(16).fill(".")
const S16 = (b) => b.join(" ")
const root = (c, o) => c.match(/^[A-G][b#]?/)[0] + o
function compBar(K, v) { const b = E(); const put = (i, n) => { b[i] = K; for (let k = 1; k < n && i + k < 16; k++) b[i + k] = "-" }
  if (v === 0) { put(0, 7); put(10, 4) } else if (v === 1) { put(0, 12) } else if (v === 2) { put(2, 6); put(12, 4) } else { put(0, 3); put(6, 3); put(11, 4) } return S16(b) }
function bassBar(c, next, v) { const b = E(), r = root(c, 2), f = chord(c, 2).split("+")[2] || r, nr = root(next, 2)
  b[0] = r; b[1] = "-"; b[2] = "-"; if (v % 2) { b[7] = f; b[10] = r } else { b[10] = f; b[11] = "-" } b[14] = nr; return S16(b) }
function phrase(r, Sc, bars) { // frase de 2 compassos, notas no contratempo, com respiros
  const R = [[0, 3, 6, 10], [2, 6, 8, 12, 14], [0, 4, 7, 10, 14], [3, 6, 11]], out = []; let i = 4 + (r() * 3 | 0)
  for (let k = 0; k < bars; k++) { const b = E(), pos = R[r() * R.length | 0]; pos.forEach((p, j) => { i = Math.max(0, Math.min(Sc.length - 1, i + [-2, -1, -1, 1, 1, 2, 0][r() * 7 | 0])); b[p] = Sc[i]; const h = j === pos.length - 1 ? 3 : 1 + (r() * 2 | 0); for (let q = 1; q <= h && p + q < 16 && b[p + q] === "."; q++) b[p + q] = "-" }); out.push(S16(b)) }
  return out }
const KICK = ["x . . . . . . x . . x . . . . .", "x . . . . . . . . x x . . . . .", "x . . x . . . . . . x . . . x ."]
const SNARE = ". . . . x . . . . . . . x . . .", HAT = "x . x . x . x . x . x . x . x x", OHAT = ". . . . . . . . . . . . . . x ."
function lofi(name, o) {
  const r = lcg(o.seed), P = o.prog, Sc = scale(o.key, o.mode, o.oct || 5, 2), lead = o.lead || "flauta", keys = o.keys || "rhodes"
  const sec = [["intro", 4], ["a", 8], ["b", 8], ["pausa", 4], ["b2", 8], ["fim", 4]], bars = sec.reduce((s, x) => s + x[1], 0)
  const tk = { keys: [], bass: [], lead: [], cont: [], kick: [], snare: [], hat: [], ohat: [], pad: [] }, silent = S16(E())
  const motif = phrase(r, Sc, 2), motif2 = phrase(r, Sc, 2), answer = phrase(r, Sc.slice(2), 2)
  let n = 0
  for (const [s, len] of sec) for (let k = 0; k < len; k++, n++) {
    const c = P[n % P.length], nx = P[(n + 1) % P.length], K = chord(c, o.koct || 3, (n % 2) ? 1 : 0)
    tk.keys.push(compBar(K, s === "intro" || s === "fim" || s === "pausa" ? 1 : (o.comp || [0, 2, 0, 3])[k % 4]))
    tk.pad.push(o.pad ? chord(c, 3) + " -".repeat(15) : silent)
    const drums = s === "a" || s === "b" || s === "b2"
    tk.bass.push(drums || s === "pausa" ? bassBar(c, nx, k) : silent)
    tk.kick.push(drums ? (o.kick || KICK)[(k + (s === "b2" ? 1 : 0)) % (o.kick || KICK).length] : silent)
    tk.snare.push(drums ? SNARE : silent); tk.hat.push(drums ? (o.hat || HAT) : silent); tk.ohat.push(drums && k % 4 === 3 ? OHAT : silent)
    const m = s === "b" ? (k % 4 < 2 ? motif[k % 2] : answer[k % 2]) : s === "b2" ? (k % 4 < 2 ? motif2[k % 2] : motif[k % 2]) : s === "pausa" ? (k < 2 ? answer[k] : silent) : silent
    tk.lead.push(m)
    tk.cont.push(s === "b2" && o.cont && k % 2 === 1 ? phrase(r, scale(o.key, o.mode, (o.oct || 5) + 1, 1), 1)[0] : silent)
  }
  const J = (a) => a.join(" | ")
  song(name, { bpm: o.bpm, swing: o.swing || 0.22, loop: false, bars, vol: 0.8, fx: [filter({ type: "lp", cutoff: 5200 }), chorus({ mix: 0.18 }), reverb({ size: 0.5, mix: 0.18 }), limiter()] },
    track(keys, J(tk.keys)), track("baixo", J(tk.bass)), track(lead, J(tk.lead)), o.cont ? track(o.cont, J(tk.cont)) : null, o.pad ? track("pad", J(tk.pad)) : null,
    track("kick", J(tk.kick), { vol: 0.55 }), track("snare", J(tk.snare), { vol: 0.28 }), track("hat", J(tk.hat), { vol: 0.17 }), track("openhat", J(tk.ohat), { vol: 0.12 }))
}
lofi("orvalho", { seed: 11, bpm: 78, key: "C", mode: "pentatonic", prog: ["Fmaj7", "Em7", "Dm9", "Cmaj9"], lead: "flauta", cont: "sinos" })
lofi("varanda", { seed: 23, bpm: 84, key: "C", mode: "pentatonic", prog: ["Dm9", "G13", "Cmaj9", "A7"], lead: "violao", comp: [0, 3, 2, 0] })
lofi("feno", { seed: 37, bpm: 88, key: "Eb", mode: "pentatonic", prog: ["Ebmaj7", "Cm9", "Fm9", "Bb13"], lead: "sinos", keys: "violao", cont: "flauta", kick: ["x . . x . . x . x . . x . . x ."], swing: 0.12 })
lofi("rede", { seed: 41, bpm: 80, key: "A", mode: "pentatonic", prog: ["Amaj9", "F#m9", "Dmaj9", "E6"], lead: "flauta", oct: 4, pad: 1 })
lofi("folhas", { seed: 53, bpm: 76, key: "A", mode: "minorPentatonic", prog: ["Am9", "Dm9", "G7", "Cmaj7"], lead: "sax", oct: 4, cont: "sinos" })
lofi("chuva", { seed: 67, bpm: 72, key: "G", mode: "minorPentatonic", prog: ["Gm9", "Cm9", "F7", "Bbmaj7"], lead: "rhodes", keys: "rhodes", oct: 5, pad: 1, comp: [1, 1, 0, 1] })
lofi("neve", { seed: 71, bpm: 70, key: "E", mode: "minorPentatonic", prog: ["Em9", "Cmaj7", "Am9", "Bm7"], lead: "sinos", pad: 1, hat: "x . . . x . . . x . . . x . . .", comp: [1, 1, 2, 1] })
lofi("noite", { seed: 83, bpm: 74, key: "Db", mode: "pentatonic", prog: ["Dbmaj7", "Bbm9", "Ebm9", "Ab13"], lead: "sax", oct: 4, cont: "sinos", pad: 1 })
lofi("praca", { seed: 97, bpm: 92, key: "F", mode: "pentatonic", prog: ["Fmaj7", "Dm7", "Gm7", "C9"], lead: "sanfona", keys: "violao", cont: "flauta", swing: 0.16 })
lofi("mina", { seed: 101, bpm: 70, key: "C", mode: "minorPentatonic", prog: ["Cm9", "Abmaj7", "Fm9", "G7"], lead: "sinos", oct: 4, pad: 1, hat: "x . . . . . x . x . . . . . x .", comp: [1, 1, 1, 2] })
