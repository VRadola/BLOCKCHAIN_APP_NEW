<script setup>
import { ref, computed, watch } from 'vue'
import { useLoyaltyStore } from '../stores/loyalty'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const loyaltyStore = useLoyaltyStore()

const toAddress = ref('')
const amount = ref('')
const toAddressError = ref('')
const amountError = ref('')
const isSending = ref(false)
const status = ref(null) // { kind: 'pending' | 'ok' | 'err', message, txHash? }

const explorerLink = computed(() =>
  status.value?.txHash ? `https://sepolia.etherscan.io/tx/${status.value.txHash}` : null
)

watch(() => props.open, (isOpen) => {
  if (!isOpen) {
    status.value = null
    toAddressError.value = ''
    amountError.value = ''
  }
})

function closeModal() {
  emit('close')
}

async function handleConnect() {
  await loyaltyStore.connectWallet()
}

function validate() {
  toAddressError.value = ''
  amountError.value = ''
  let ok = true
  if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress.value.trim())) {
    toAddressError.value = 'Unesi ispravnu Ethereum adresu (0x...).'
    ok = false
  }
  const normalized = amount.value.trim().replace(',', '.')
  if (!normalized || Number.isNaN(Number(normalized)) || Number(normalized) <= 0) {
    amountError.value = 'Unesi iznos veci od 0.'
    ok = false
  }
  return ok
}

async function handleSend() {
  if (!validate()) return
  isSending.value = true
  status.value = null
  try {
    const txHash = await loyaltyStore.sendEth(toAddress.value.trim(), amount.value.trim())
    status.value = { kind: 'pending', message: 'Transakcija poslana, ceka potvrdu...', txHash }

    const receipt = await loyaltyStore.waitForReceipt(txHash)
    if (receipt && receipt.status === '0x1') {
      status.value = { kind: 'ok', message: 'Transakcija potvrdjena.', txHash }
    } else if (receipt) {
      status.value = { kind: 'err', message: 'Transakcija nije uspjela on-chain.', txHash }
    } else {
      status.value = { kind: 'err', message: 'Potvrda nije stigla na vrijeme - provjeri na Etherscanu.', txHash }
    }
    await loyaltyStore.refreshBalance()
    toAddress.value = ''
    amount.value = ''
  } catch (err) {
    const message = err?.code === 4001
      ? 'Transakcija odbijena u MetaMasku.'
      : (err?.message || 'Slanje nije uspjelo.')
    status.value = { kind: 'err', message }
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div v-if="open" class="overlay" @click.self="closeModal">
    <div class="modal" role="dialog" aria-modal="true" aria-label="Kod none Coin wallet">
      <div class="modal-head">
        <span class="net-tag">Sepolia</span>
        <button class="icon-btn" @click="closeModal" aria-label="Zatvori">&times;</button>
      </div>

      <h2>Kod none Coin wallet</h2>
      <p class="sub">Posalji test ETH kolegi preko MetaMaska, na Sepolia testnoj mrezi.</p>

      <div v-if="!loyaltyStore.isWalletConnected">
        <button class="btn-primary" :disabled="loyaltyStore.isConnecting" @click="handleConnect">
          {{ loyaltyStore.isConnecting ? 'Spajanje...' : 'Dodaj wallet' }}
        </button>
        <p v-if="loyaltyStore.connectError" class="field-err">{{ loyaltyStore.connectError }}</p>
      </div>

      <div v-else>
        <div class="wallet-row">
          <div>
            <div class="addr">{{ loyaltyStore.shortAddress }}</div>
            <div class="bal">{{ loyaltyStore.ethBalance ?? '...' }} ETH (Sepolia)</div>
          </div>
          <button class="btn-ghost" @click="loyaltyStore.disconnectWallet">Odspoji</button>
        </div>

        <label for="toAddr">Adresa primatelja</label>
        <input id="toAddr" v-model="toAddress" type="text" placeholder="0x..." autocomplete="off" spellcheck="false">
        <p class="field-err">{{ toAddressError }}</p>

        <label for="amount">Iznos (ETH)</label>
        <input id="amount" v-model="amount" type="text" inputmode="decimal" placeholder="0.01">
        <p class="field-err">{{ amountError }}</p>

        <button class="btn-primary" :disabled="isSending" @click="handleSend">
          {{ isSending ? 'Slanje...' : 'Posalji ETH' }}
        </button>

        <div v-if="status" class="status" :class="status.kind">
          {{ status.message }}
          <template v-if="explorerLink">
            <br>
            <a :href="explorerLink" target="_blank" rel="noopener">{{ status.txHash }}</a>
          </template>
        </div>
      </div>

      <p class="hint">Sepolia test ETH nabavi besplatno na nekom faucetu (npr. sepoliafaucet.com).</p>
    </div>
  </div>
</template>

<style scoped>
.overlay{
  position:fixed;inset:0;z-index:50;
  background:rgba(43,29,20,0.45);
  display:flex;align-items:center;justify-content:center;
  padding:20px;
}
.modal{
  width:100%;max-width:420px;max-height:90vh;overflow-y:auto;
  background:var(--surface);border:1px solid var(--line);border-radius:18px;
  padding:26px;
}
.modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.net-tag{
  display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;
  font-family:ui-monospace,Consolas,monospace;color:var(--accent-2);
  border:1px solid var(--accent-2);border-radius:999px;padding:3px 11px;
}
.net-tag::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent-2);}
.icon-btn{
  background:transparent;border:none;font-size:1.4rem;line-height:1;
  color:var(--text-soft);cursor:pointer;padding:2px 6px;
}
.icon-btn:focus-visible{outline:2px solid var(--accent-2);outline-offset:2px;}
h2{font-size:1.25rem;}
.sub{color:var(--text-soft);font-size:0.9rem;margin:8px 0 20px;}

.wallet-row{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  border:1px solid var(--line);border-radius:12px;padding:13px 16px;margin-bottom:18px;
  background:var(--bg);
}
.wallet-row .addr{font-family:ui-monospace,Consolas,monospace;font-size:13px;color:var(--text);}
.wallet-row .bal{font-family:ui-monospace,Consolas,monospace;font-size:12px;color:var(--text-soft);margin-top:3px;}

label{display:block;font-size:0.85rem;color:var(--text-soft);margin:16px 0 6px;}
input{
  width:100%;font-family:ui-monospace,Consolas,monospace;font-size:0.95rem;color:var(--text);
  background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:12px 14px;
}
input:focus-visible{outline:2px solid var(--accent-2);outline-offset:1px;}
.field-err{font-size:0.78rem;color:var(--accent-2);margin:6px 0 0;min-height:16px;}

.btn-primary{
  width:100%;background:var(--accent-2);color:var(--cream, var(--bg));
  font-family:'Work Sans',sans-serif;font-weight:600;font-size:0.95rem;
  border:none;border-radius:10px;padding:12px 18px;cursor:pointer;margin-top:8px;
}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;}
.btn-primary:focus-visible{outline:2px solid var(--accent-2);outline-offset:2px;}
.btn-ghost{
  background:transparent;border:1px solid var(--line);color:var(--text);
  border-radius:10px;padding:9px 14px;cursor:pointer;font-size:0.85rem;
}

.status{margin-top:18px;border-radius:12px;padding:13px 15px;font-size:0.86rem;line-height:1.6;}
.status.pending{background:color-mix(in srgb, var(--accent) 16%, transparent);}
.status.ok{background:color-mix(in srgb, #4F7A3C 20%, transparent);}
.status.err{background:color-mix(in srgb, var(--accent-2) 16%, transparent);}
.status a{color:var(--accent-2);font-family:ui-monospace,Consolas,monospace;word-break:break-all;}

.hint{margin-top:16px;font-size:0.8rem;color:var(--text-soft);line-height:1.6;}
</style>
