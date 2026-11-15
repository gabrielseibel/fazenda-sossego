// Roça & Roll: trilha sonora. Uma música por estação + o tema da vila.
// Andamentos e tons escolhidos pelo clima: primavera clara (Sol maior), verão de forró (Dó mixolídio),
// outono calmo (Ré dórico), inverno de caixinha de música (Mi menor), vila alegre (Fá maior).
inst("sanfona", { wave: "square", duty: 0.25, env: [0.01, 0.1, 0.7, 0.12], vol: 0.13, vibrato: { rate: 6, depth: 0.15, delay: 0.1 } })
inst("flauta", { wave: "triangle", env: [0.03, 0.1, 0.8, 0.15], vol: 0.26, vibrato: { rate: 5, depth: 0.1, delay: 0.2 } })
inst("viola", { wave: "fm", fm: { ratio: 2, index: 1.6, decay: 0.25 }, env: [0.002, 0.25, 0.2, 0.2], vol: 0.16 })
inst("teclas", { wave: "fm", fm: { ratio: 1, index: 2, decay: 0.35 }, env: [0.004, 0.4, 0.35, 0.3], vol: 0.15 })
inst("sino", { wave: "fm", fm: { ratio: 3.5, index: 3, decay: 0.6 }, env: [0.002, 0.6, 0.1, 0.6], vol: 0.12 })
inst("baixo", { wave: "triangle", env: [0.004, 0.08, 0.8, 0.06], vol: 0.5 })
inst("pad", { wave: "saw", env: [0.4, 0.3, 0.6, 0.8], vol: 0.05, filter: { type: "lp", cutoff: 1400 } })

const mel = (S, rows) => rows.map((r) => r.map((i) => (i === null ? "." : i === "-" ? "-" : S[i])).join(" ")).join(" | ")
const held = (prog, oct) => prog.map((c) => chord(c, oct) + " -".repeat(15)).join(" | ")
const strum = (prog, oct) => prog.map((c) => { const k = chord(c, oct); return `${k} . . ${k} . . ${k} . ${k} . . ${k} . . ${k} .` }).join(" | ")

// ---------- Primavera: Sol maior, 104 bpm ----------
{
  const P = ["G", "Em", "C", "D", "G", "Em", "Am", "D"], S = scale("G", "major", 5, 2)
  const rt = { G: "G2", Em: "E2", C: "C2", D: "D2", Am: "A1" }
  song("primavera", { bpm: 104, swing: 0.08, vol: 0.75, fx: [reverb({ size: 0.45, mix: 0.16 }), limiter()] },
    track("viola", strum(P, 4)),
    track("baixo", P.map((c) => `${rt[c]} . . . ${rt[c]} . . . ${rt[c]} . . . . . ${rt[c]} .`).join(" | ")),
    track("flauta", mel(S, [
      [4, "-", 2, "-", 4, 5, 7, "-", "-", "-", 5, 4, 2, "-", null, null], [2, "-", 4, "-", 3, 2, 0, "-", "-", "-", null, null, 1, 2, 3, null],
      [4, "-", 4, 5, 6, "-", 4, "-", 2, "-", 4, "-", 5, "-", null, null], [6, "-", 5, 4, 3, "-", 1, "-", "-", "-", null, null, null, null, null, null],
      [7, "-", 6, 5, 4, "-", 2, "-", 4, 5, 7, "-", 9, "-", null, null], [8, "-", 7, 6, 4, "-", "-", "-", 2, "-", 4, "-", null, null, null, null],
      [5, "-", 4, "-", 2, "-", 0, "-", 1, "-", 2, "-", 3, "-", 5, null], [4, "-", "-", "-", "-", "-", "-", "-", null, null, null, null, null, null, null, null]])),
    track("kick", "x . . . . . . . x . . . . . . ."), track("hat", ". . x . . . x . . . x . . . x .", { vol: 0.5 }))
}
// ---------- Verão: forró em Dó mixolídio, 124 bpm ----------
{
  const P = ["C", "Bb", "C", "G7", "C", "Bb", "F", "G7"], S = scale("C", "mixolydian", 5, 2)
  const rt = { C: ["C2", "G2"], Bb: ["Bb1", "F2"], G7: ["G1", "D2"], F: ["F1", "C2"] }
  song("verao", { bpm: 124, vol: 0.75, fx: [reverb({ size: 0.35, mix: 0.12 }), limiter()] },
    track("sanfona", mel(S, [
      [7, 7, 6, 7, 9, "-", 7, "-", 6, 4, 6, 7, 4, "-", null, null], [6, 6, 5, 6, 8, "-", 6, "-", 5, 3, 5, 6, 3, "-", null, null],
      [7, 7, 6, 7, 9, "-", 11, "-", 9, 7, 9, 10, 9, "-", 7, null], [8, "-", 6, "-", 4, "-", 5, 6, 4, "-", "-", "-", null, null, null, null],
      [4, 5, 7, "-", 4, 5, 7, "-", 9, 8, 7, 6, 7, "-", null, null], [6, 5, 4, "-", 6, 5, 4, "-", 3, 4, 5, 6, 5, "-", null, null],
      [3, 4, 5, "-", 7, "-", 5, 4, 3, "-", 1, "-", 3, 4, 5, null], [4, "-", 6, "-", 8, "-", 7, "-", "-", "-", null, null, null, null, null, null]])),
    track("baixo", P.map((c) => { const [r, f] = rt[c]; return `${r} . . ${f} . . ${r} . ${r} . . ${f} . . ${r} .` }).join(" | ")),
    track("viola", P.map((c) => { const k = chord(c, 4); return `. . ${k} . ${k} . . . . . ${k} . ${k} . . .` }).join(" | ")),
    track("kick", "x . . x . . x . x . . x . . x ."), track("snare", ". . . . x . . . . . . . x . . x", { vol: 0.5 }),
    track("hat", "x x x x x x x x x x x x x x x x", { vol: 0.35 }))
}
// ---------- Outono: Ré dórico, 90 bpm ----------
{
  const P = ["Dm9", "G7", "Cmaj7", "Am7", "Dm9", "G7", "Fmaj7", "Am7"], S = scale("D", "dorian", 5, 2)
  const rt = { Dm9: ["D2", "A2"], G7: ["G1", "D2"], Cmaj7: ["C2", "G2"], Am7: ["A1", "E2"], Fmaj7: ["F1", "C2"] }
  song("outono", { bpm: 90, swing: 0.14, vol: 0.75, fx: [chorus({ mix: 0.3 }), reverb({ size: 0.55, mix: 0.2 }), limiter()] },
    track("teclas", held(P, 3)),
    track("baixo", P.map((c) => { const [r, f] = rt[c]; return `${r} . . . ${f} . . . ${r} . . . ${f} . ${r} .` }).join(" | ")),
    track("flauta", mel(S, [
      [4, "-", 3, 2, 0, "-", "-", null, 2, 3, 4, "-", 6, "-", 5, null], [3, "-", "-", 2, 1, "-", 3, null, 4, "-", 3, null, 1, "-", "-", null],
      [2, "-", 4, "-", 6, "-", 7, "-", 6, 4, 2, null, 4, "-", "-", null], [0, "-", 2, "-", 4, "-", 3, 2, 0, "-", "-", "-", null, null, null, null],
      [7, "-", 6, 4, 2, "-", 4, null, 6, "-", 7, "-", 9, "-", 8, null], [7, "-", "-", 6, 4, "-", 3, null, 1, "-", 3, null, 4, "-", "-", null],
      [5, "-", 4, "-", 2, "-", 0, "-", 2, 3, 4, null, 2, "-", "-", null], [0, "-", "-", "-", "-", "-", null, null, null, null, null, null, null, null, null, null]])),
    track("kick", "x . . . . . . . x . . . . . . ."), track("hat", ". . x . . . x . . . x . . . x x", { vol: 0.4 }))
}
// ---------- Inverno: caixinha de música em Mi menor, 76 bpm ----------
{
  const P = ["Em", "Cmaj7", "Am7", "B7", "Em", "Cmaj7", "D", "B7"], S = scale("E", "harmonicMinor", 5, 2)
  song("inverno", { bpm: 76, vol: 0.75, fx: [reverb({ size: 0.75, mix: 0.3 }), limiter()] },
    track("pad", held(P, 3)),
    track("sino", mel(S, [
      [7, null, 4, null, 2, null, 4, null, 7, null, 9, null, 7, null, 4, null], [4, null, 2, null, 0, null, 2, null, 4, null, null, null, null, null, null, null],
      [5, null, 2, null, 0, null, 2, null, 5, null, 7, null, 5, null, 4, null], [3, null, 6, null, 8, null, 6, null, 4, null, null, null, null, null, null, null],
      [7, null, 4, null, 2, null, 4, null, 7, null, 9, null, 11, null, 9, null], [7, null, 4, null, 2, null, 4, null, 7, null, null, null, null, null, null, null],
      [8, null, 7, null, 5, null, 4, null, 3, null, 4, null, 5, null, 6, null], [7, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]])),
    track("baixo", P.map((c) => chord(c, 2).split("+")[0] + " -".repeat(15)).join(" | "), { vol: 0.6 }))
}
// ---------- Vila Pamonha: Fá maior, 112 bpm ----------
{
  const P = ["F", "Dm", "Bb", "C7", "F", "Dm", "Gm7", "C7"], S = scale("F", "major", 5, 2)
  const rt = { F: "F2", Dm: "D2", Bb: "Bb1", C7: "C2", Gm7: "G1" }
  song("vila", { bpm: 112, swing: 0.1, vol: 0.75, fx: [reverb({ size: 0.4, mix: 0.14 }), limiter()] },
    track("teclas", P.map((c) => { const k = chord(c, 4); return `. . ${k} . . . ${k} . . . ${k} . . . ${k} .` }).join(" | ")),
    track("baixo", P.map((c) => `${rt[c]} . . . ${rt[c]} . . . ${rt[c]} . . . ${rt[c]} . . .`).join(" | ")),
    track("sanfona", mel(S, [
      [0, 2, 4, "-", 4, "-", 5, 4, 2, "-", 0, "-", null, null, 4, null], [5, "-", 4, 2, 1, "-", 0, null, 1, 2, 3, null, 5, "-", null, null],
      [3, "-", 5, "-", 7, "-", 5, 3, 2, "-", 3, "-", null, null, 4, null], [4, 3, 2, "-", 1, "-", 2, null, 3, "-", "-", null, null, null, null, null],
      [7, 7, 6, "-", 5, "-", 4, 5, 6, "-", 4, "-", null, null, 7, null], [9, "-", 7, 5, 4, "-", 2, null, 4, 5, 6, null, 7, "-", null, null],
      [8, "-", 7, "-", 5, "-", 3, 2, 1, "-", 3, "-", null, null, 4, null], [2, 1, 0, "-", "-", "-", null, null, null, null, null, null, null, null, null, null]])),
    track("kick", "x . . . x . . . x . . . x . . ."), track("snare", ". . . . x . . . . . . . x . . .", { vol: 0.45 }),
    track("hat", ". . x . . . x . . . x . . . x .", { vol: 0.45 }))
}
