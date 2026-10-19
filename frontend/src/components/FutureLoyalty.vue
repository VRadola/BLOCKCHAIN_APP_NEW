<script setup>
import { useLoyaltyStore } from '../stores/loyalty'

// Store je spreman za kasniju wallet integraciju (vidi stores/loyalty.js
// i AGENTS.md - pametni ugovori dolaze od T4). Ovdje ga samo koristimo
// da prikazemo da je sekcija vec spojena na buduce stanje, bez da
// sada nudimo gumb za povezivanje walleta korisniku.
const loyaltyStore = useLoyaltyStore()
</script>

<template>
  <section class="future">
    <div class="wrap">
      <div class="badge">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" stroke-width="1.6">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"/>
          <path d="M12 2v18M4 6.5l8 4.5 8-4.5"/>
        </svg>
      </div>
      <div>
        <h3>Uskoro: Kod none kartica vjernosti</h3>
        <p>Pripremamo program vjernosti na blockchain tehnologiji za praćenje popusta i nagrada — bez potrebe za digitalnim novčanikom (wallet integracija dolazi u kasnijoj fazi).</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.future{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:40px 0;}
.future .wrap{display:flex;gap:24px;align-items:center;flex-wrap:wrap;}
.future .badge{
  flex-shrink:0;width:54px;height:54px;border-radius:50%;
  background:var(--surface);display:flex;align-items:center;justify-content:center;
  border:1px solid var(--line);
}
.future h3{font-size:1.2rem;}
.future p{color:var(--text-soft);margin:6px 0 0;font-size:0.95rem;}
</style>
