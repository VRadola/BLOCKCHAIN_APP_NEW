<script setup>
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <div>
        <h1>Kava kakvu je nona<br>uvijek pravila.</h1>
        <p class="tagline">Samo malo moderniji stolci.</p>
        <p class="lede">Kod none je mjesto gdje se stari recepti susreću s novim navikama — domaći kolači, pažljivo pečena kava i kutak u kojem vrijeme usporava.</p>
        <div class="hero-meta">
          <div><strong>Svaki dan</strong>07:00 – 20:00</div>
          <div><strong>Gdje smo</strong>Centar grada</div>
          <div><strong>Za koga</strong>Jutarnju kavu i popodnevni predah</div>
        </div>
      </div>
      <svg class="cup" viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Šalica kave">
        <g class="steam" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round">
          <path d="M100 70 C 90 55, 110 45, 100 30"/>
          <path d="M140 70 C 130 55, 150 45, 140 30"/>
          <path d="M180 70 C 170 55, 190 45, 180 30"/>
        </g>
        <ellipse cx="140" cy="200" rx="90" ry="14" fill="var(--line)"/>
        <path d="M60 95 h160 l-14 100 a20 20 0 0 1-20 18 H94 a20 20 0 0 1-20-18 Z" fill="var(--surface)" stroke="var(--accent-2)" stroke-width="3"/>
        <path d="M220 115 q34 2 34 34 q0 32-38 32" fill="none" stroke="var(--accent-2)" stroke-width="7" stroke-linecap="round"/>
        <rect x="60" y="88" width="160" height="16" rx="8" fill="var(--accent-2)"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero{padding:88px 0 88px;position:relative;overflow:hidden;}
.hero .wrap{display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center;}
.hero h1{font-size:clamp(2.6rem,6vw,4.4rem);line-height:1.04;}
.hero .tagline{font-style:italic;color:var(--accent-2);font-size:1.15rem;margin-top:14px;}
.hero p.lede{margin-top:20px;color:var(--text-soft);}
.hero-meta{display:flex;gap:28px;margin-top:32px;flex-wrap:wrap;}
.hero-meta div{font-size:0.9rem;color:var(--text-soft);}
.hero-meta strong{display:block;font-family:'Fraunces',serif;font-weight:600;color:var(--text);font-size:1.05rem;}
.cup{width:100%;max-width:340px;justify-self:center;}
@keyframes steam{
  0%{transform:translateY(0) scaleX(1);opacity:.55;}
  50%{transform:translateY(-14px) scaleX(1.25);opacity:.85;}
  100%{transform:translateY(-30px) scaleX(0.9);opacity:0;}
}
.steam path{animation:steam 3.6s ease-in-out infinite;transform-origin:bottom center;}
.steam path:nth-child(2){animation-delay:.9s;}
.steam path:nth-child(3){animation-delay:1.8s;}
@media (prefers-reduced-motion: reduce){.steam path{animation:none;}}
@media (max-width:760px){
  .hero .wrap{grid-template-columns:1fr;}
  .cup{order:-1;max-width:220px;}
  .hero{padding:64px 0;}
}
</style>
