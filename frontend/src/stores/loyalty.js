import { defineStore } from 'pinia'

/**
 * Store za buduci blockchain program vjernosti ("Kod none Coin").
 * Trenutno NE radi stvarnu wallet integraciju (vidi AGENTS.md - to ide od T4,
 * kad budu postojali pametni ugovori na Sepolia mrezi).
 *
 * Ovdje je samo pripremljeno stanje i mjesta gdje ce se kasnije
 * spojiti stvarna logika (npr. ethers v6 + wallet provider).
 */
export const useLoyaltyStore = defineStore('loyalty', {
  state: () => ({
    isWalletConnected: false,
    walletAddress: null,
    pointsBalance: 0,
  }),

  getters: {
    shortAddress(state) {
      if (!state.walletAddress) return null
      return `${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(-4)}`
    },
  },

  actions: {
    // Placeholder - stvarno spajanje wallet-a dolazi kasnije (T4+).
    // Namjerno ne implementirano: ne zelimo lazno povezivanje prije
    // nego pametni ugovor i mreza (Sepolia) budu spremni.
    connectWallet() {
      console.info('Wallet integracija jos nije implementirana (dolazi kasnije).')
    },

    disconnectWallet() {
      this.isWalletConnected = false
      this.walletAddress = null
      this.pointsBalance = 0
    },
  },
})
