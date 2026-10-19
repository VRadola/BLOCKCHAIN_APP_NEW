<script setup>
</script>

<template>
  <section class="visit" id="posjeti">
    <div class="wrap">
      <div>
        <h2>Radno vrijeme</h2>
        <ul class="hours-list">
          <li><span>Ponedjeljak – Nedjelja</span><span>07:00 – 20:00</span></li>
        </ul>
        <p class="note">Otvoreno svaki dan u godini, uključujući blagdane.</p>
      </div>
      <div class="contact-block">
        <h2>Kontakt</h2>
        <p>Ulica placeholder 12, Zagreb</p>
        <p>info@kod-none.hr</p>
        <p>+385 1 234 5678</p>
        <div class="map-ph">mapa — dodati kasnije</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.visit{padding:88px 0;}
.visit .wrap{display:grid;grid-template-columns:1fr 1fr;gap:56px;}
.hours-list{list-style:none;margin:18px 0 0;padding:0;}
.hours-list li{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line);font-size:0.95rem;}
.hours-list li:first-child{border-top:1px solid var(--line);}
.note{color:var(--text-soft);font-size:0.9rem;margin-top:10px;}
.contact-block p{color:var(--text-soft);margin:4px 0;}
.map-ph{
  margin-top:22px;height:180px;border-radius:4px;
  background: repeating-linear-gradient(45deg, var(--line) 0 1px, transparent 1px 14px);
  border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;
  color:var(--text-soft);font-size:0.85rem;
}
@media (max-width:760px){
  .visit{padding:64px 0;}
  .visit .wrap{grid-template-columns:1fr;}
}
</style>
