<script setup>
import { ref } from 'vue'
import WalletModal from './WalletModal.vue'

const isWalletModalOpen = ref(false)
</script>

<template>
  <header>
    <nav class="wrap">
      <span class="logo">Kod none</span>
      <ul class="navlinks">
        <li><a href="#o-nama">O nama</a></li>
        <li><a href="#meni">Meni</a></li>
        <li><a href="#posjeti">Kontakt</a></li>
        <li><button class="wallet-btn" @click="isWalletModalOpen = true">Dodaj wallet</button></li>
      </ul>
    </nav>
  </header>
  <WalletModal :open="isWalletModalOpen" @close="isWalletModalOpen = false" />
</template>

<style scoped>
header{
  position:sticky;
  top: env(safe-area-inset-top,0px);
  z-index:11;
  height:72px;
  display:flex;align-items:center;
  background:var(--bg);
  border-bottom:1px solid var(--line);
}
nav.wrap{display:flex;align-items:center;justify-content:space-between;width:100%;}
.logo{font-family:'Fraunces',serif;font-style:italic;font-size:1.4rem;}
.navlinks{display:flex;gap:28px;list-style:none;margin:0;padding:0;}
.navlinks a{text-decoration:none;font-size:0.95rem;color:var(--text-soft);transition:color .2s;}
.navlinks a:hover,.navlinks a:focus-visible{color:var(--accent-2);}
.wallet-btn{
  font-family:'Work Sans',sans-serif;font-size:0.88rem;font-weight:600;
  background:var(--accent-2);color:var(--cream, var(--bg));
  border:none;border-radius:999px;padding:9px 18px;cursor:pointer;
}
.wallet-btn:hover{opacity:.92;}
.wallet-btn:focus-visible{outline:2px solid var(--accent-2);outline-offset:2px;}
@media (max-width:760px){
  .navlinks{gap:16px;}
  .navlinks li:nth-child(3){display:none;}
}
</style>
