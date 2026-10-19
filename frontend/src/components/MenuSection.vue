<script setup>
import { ref, computed } from 'vue'

const categories = [
  { id: 'kava', label: 'Kava' },
  { id: 'hrana', label: 'Hrana' },
  { id: 'kolaci', label: 'Kolači' },
]

const menu = {
  kava: [
    { name: 'Espresso', desc: 'Naša kućna mješanja, srednje pečena.', price: '1,80 €' },
    { name: 'Flat white', desc: 'Dvostruki espresso, baršunasto mlijeko.', price: '2,90 €' },
    { name: 'Filter kava noneina mješavina', desc: 'Polagano prelivena, dan po dan.', price: '2,50 €' },
    { name: 'Kakao s cimetom', desc: 'Za dane kad treba malo više topline.', price: '2,70 €' },
  ],
  hrana: [
    { name: 'Domaća štrukla', desc: 'Topla, sa sirom, po noneinom receptu.', price: '4,20 €' },
    { name: 'Avokado tost', desc: 'Kiseli kruh, limun, chilli pahuljice.', price: '5,80 €' },
    { name: 'Jutarnja zdjelica', desc: 'Jogurt, domaća granola, sezonsko voće.', price: '4,90 €' },
  ],
  kolaci: [
    { name: 'Makovnjača', desc: 'Tanki listovi tijesta, puno maka.', price: '3,00 €' },
    { name: 'Orahnjača', desc: 'Klasika, uvijek svježa.', price: '3,00 €' },
    { name: 'Kremšnita', desc: 'Vanilija, lisnato tijesto, po starom receptu.', price: '3,50 €' },
  ],
}

const activeCat = ref('kava')
const currentItems = computed(() => menu[activeCat.value])
</script>

<template>
  <section class="menu" id="meni">
    <div class="wrap">
      <div class="menu-head">
        <h2>Meni</h2>
        <div class="tabs" role="tablist">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="{ active: activeCat === cat.id }"
            role="tab"
            :aria-selected="activeCat === cat.id"
            @click="activeCat = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
      <div class="menu-list">
        <div class="menu-item" v-for="item in currentItems" :key="item.name">
          <div>
            <div class="name">{{ item.name }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
          <div class="price">{{ item.price }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu{background:var(--surface);padding:88px 0;}
.menu-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:36px;}
.tabs{display:flex;gap:8px;flex-wrap:wrap;}
.tabs button{
  font-family:'Work Sans',sans-serif;font-size:0.92rem;font-weight:500;
  background:transparent;border:1px solid var(--line);color:var(--text-soft);
  padding:9px 18px;border-radius:999px;cursor:pointer;transition:.2s;
}
.tabs button:hover{border-color:var(--accent-2);}
.tabs button.active{background:var(--accent-2);border-color:var(--accent-2);color:var(--cream);}
.tabs button:focus-visible{outline:2px solid var(--accent-2);outline-offset:2px;}
.menu-list{display:grid;gap:0;}
.menu-item{display:flex;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--line);}
.menu-item:first-child{border-top:1px solid var(--line);}
.menu-item .name{font-family:'Fraunces',serif;font-size:1.08rem;}
.menu-item .desc{color:var(--text-soft);font-size:0.9rem;margin-top:4px;max-width:46ch;}
.menu-item .price{font-family:'Fraunces',serif;color:var(--accent-2);white-space:nowrap;align-self:flex-start;}
@media (max-width:760px){.menu{padding:64px 0;}}
</style>
