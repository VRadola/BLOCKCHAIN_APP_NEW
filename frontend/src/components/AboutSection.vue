<script setup>
</script>

<template>
  <section class="about" id="o-nama">
    <div class="wrap">
      <div>
        <h2>Od none,<br>za cijeli kvart.</h2>
      </div>
      <div>
        <p class="quote">"Kava se ne žuri. Ni ljudi ne bi trebali."</p>
        <p>Kod none je nastao iz želje da se obiteljska kuhinja i stari recepti za kolače sačuvaju — ali u prostoru koji je ugodan za rad za laptopom, dug razgovor ili brzu kavu u prolazu. Drvo, tople boje i malo biljaka čine prostor, a sve ostalo rade miris svježe pečenog kruha i kave.</p>
        <p>Svaka šalica se radi ručno, svaki kolač peče se istog jutra. Nema žurbe — samo dobar razlog da ostanete malo duže.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about{padding:88px 0;}
.about .wrap{display:grid;grid-template-columns:0.85fr 1.15fr;gap:56px;align-items:start;}
.about h2{font-size:clamp(1.8rem,4vw,2.5rem);}
.about .quote{border-left:3px solid var(--accent);padding-left:20px;font-family:'Fraunces',serif;font-style:italic;font-size:1.2rem;color:var(--text-soft);}
.about p{color:var(--text-soft);}
@media (max-width:760px){
  .about{padding:64px 0;}
  .about .wrap{grid-template-columns:1fr;}
}
</style>
