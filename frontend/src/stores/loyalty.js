import { defineStore } from 'pinia'

/**
 * Store za buduci blockchain program vjernosti ("Kod none Coin").
 *
 * Wallet dio (spajanje, stanje, slanje ETH-a) je implementiran ovdje
 * koristeci samo window.ethereum (MetaMask) - bez dodatnih biblioteka
 * (vidi AGENTS.md - ne dodajemo nove pakete bez pitanja).
 *
 * Program vjernosti (pametni ugovori, bodovi na chainu) ostaje
 * placeholder do T4 faze - vidi AGENTS.md.
 */

const SEPOLIA_CHAIN_ID = '0xaa36a7' // 11155111
const SEPOLIA_PARAMS = {
  chainId: SEPOLIA_CHAIN_ID,
  chainName: 'Sepolia',
  nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://rpc.sepolia.org'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
}

function weiHexToEth(hexWei) {
  const wei = BigInt(hexWei)
  const whole = wei / 10n ** 18n
  const frac = (wei % 10n ** 18n).toString().padStart(18, '0').slice(0, 6).replace(/0+$/, '')
  return frac ? `${whole}.${frac}` : `${whole}`
}

function ethToWeiHex(ethAmount) {
  const [wholeStr, fracStr = ''] = String(ethAmount).trim().replace(',', '.').split('.')
  const fracPadded = (fracStr + '0'.repeat(18)).slice(0, 18)
  const wei = BigInt(wholeStr || '0') * 10n ** 18n + BigInt(fracPadded || '0')
  return '0x' + wei.toString(16)
}

export const useLoyaltyStore = defineStore('loyalty', {
  state: () => ({
    isWalletConnected: false,
    walletAddress: null,
    ethBalance: null,
    pointsBalance: 0,
    isConnecting: false,
    connectError: null,
    listenersAttached: false,
  }),

  getters: {
    shortAddress(state) {
      if (!state.walletAddress) return null
      return `${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(-4)}`
    },
  },

  actions: {
    async connectWallet() {
      if (!window.ethereum) {
        this.connectError = 'MetaMask nije pronadjen. Instaliraj ekstenziju i osvjezi stranicu.'
        return false
      }
      this.isConnecting = true
      this.connectError = null
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const onSepolia = await this.ensureSepolia()
        if (!onSepolia) return false

        this.walletAddress = accounts[0]
        this.isWalletConnected = true
        await this.refreshBalance()
        this.attachListeners()
        return true
      } catch (err) {
        this.connectError = err?.code === 4001
          ? 'Zahtjev za spajanje je odbijen u MetaMasku.'
          : (err?.message || 'Spajanje nije uspjelo.')
        return false
      } finally {
        this.isConnecting = false
      }
    },

    async ensureSepolia() {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId === SEPOLIA_CHAIN_ID) return true
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        })
        return true
      } catch (switchErr) {
        if (switchErr?.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [SEPOLIA_PARAMS],
            })
            return true
          } catch {
            this.connectError = 'Nije uspjelo dodavanje Sepolia mreze u MetaMask.'
            return false
          }
        }
        this.connectError = 'Molim rucno prebaci MetaMask na Sepolia testnu mrezu.'
        return false
      }
    },

    attachListeners() {
      if (this.listenersAttached || !window.ethereum?.on) return
      window.ethereum.on('accountsChanged', (accounts) => {
        if (!accounts.length) {
          this.disconnectWallet()
        } else {
          this.walletAddress = accounts[0]
          this.refreshBalance()
        }
      })
      window.ethereum.on('chainChanged', () => window.location.reload())
      this.listenersAttached = true
    },

    async refreshBalance() {
      if (!this.walletAddress) return
      try {
        const hexWei = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [this.walletAddress, 'latest'],
        })
        this.ethBalance = weiHexToEth(hexWei)
      } catch {
        this.ethBalance = null
      }
    },

    // Obicna wallet-to-wallet uplata ETH-a (nema pametnog ugovora pa se
    // pravilo "call s provjerom, nikad transfer" iz AGENTS.md ovdje ne
    // primjenjuje - ono vrijedi za Solidity kod od T4 nadalje).
    async sendEth(toAddress, amountEth) {
      const valueHex = ethToWeiHex(amountEth)
      return window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{ from: this.walletAddress, to: toAddress, value: valueHex }],
      })
    },

    async waitForReceipt(txHash, { intervalMs = 2500, timeoutMs = 180000 } = {}) {
      const start = Date.now()
      while (Date.now() - start < timeoutMs) {
        const receipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        })
        if (receipt) return receipt
        await new Promise((resolve) => setTimeout(resolve, intervalMs))
      }
      return null
    },

    disconnectWallet() {
      this.isWalletConnected = false
      this.walletAddress = null
      this.ethBalance = null
      this.pointsBalance = 0
      this.connectError = null
    },
  },
})
