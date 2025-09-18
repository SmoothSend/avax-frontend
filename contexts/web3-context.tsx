"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { ethers } from 'ethers'

// Configuration - matches the prototype
const CONFIG = {
  RELAYER_API: 'https://smoothsendevm.onrender.com',
  CHAIN_ID: 43113, // Avalanche Fuji
  CHAIN_NAME: 'avalanche-fuji',
  USDC_ADDRESS: '0x5425890298aed601595a70AB815c96711a31Bc65',
  CONTRACT_ADDRESS: '0xDaDbcb45964551DD45c0917029CC21882d31EC3B',
  EXPLORER_URL: 'https://testnet.snowtrace.io'
} as const

// Types
interface Web3ContextType {
  // Connection state
  provider: any | null
  signer: any | null
  userAddress: string | null
  isConnected: boolean
  isConnecting: boolean
  
  // Balances
  avaxBalance: string
  usdcBalance: string
  
  // Actions
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  loadBalances: () => Promise<void>
  
  // Transaction state
  isTransacting: boolean
  setIsTransacting: (value: boolean) => void
  
  // Status updates
  status: { message: string; type: 'info' | 'success' | 'error' | 'warning' }
  showStatus: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void
  clearStatus: () => void
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

// Custom hook to use Web3 context
export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

// Utility functions
function formatUsdc(amount: string | any): string {
  const amountBN = typeof amount === 'string' ? (ethers as any).BigNumber.from(amount) : amount
  return (ethers as any).utils.formatUnits(amountBN, 6)
}

function formatAvax(amount: string | any): string {
  const amountBN = typeof amount === 'string' ? (ethers as any).BigNumber.from(amount) : amount
  return (ethers as any).utils.formatEther(amountBN)
}

// Provider component
export function Web3Provider({ children }: { children: ReactNode }) {
  // Connection state
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isTransacting, setIsTransacting] = useState(false)
  
  // Balances
  const [avaxBalance, setAvaxBalance] = useState('0.0000')
  const [usdcBalance, setUsdcBalance] = useState('0.000000')
  
  // Status
  const [status, setStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' | 'warning' }>({
    message: 'Connect your wallet to start using SmoothSend',
    type: 'info'
  })

  const isConnected = !!provider && !!signer && !!userAddress

  // Status management
  const showStatus = useCallback((message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setStatus({ message, type })
    
    // Auto-clear success/error messages after 5 seconds
    if (type === 'success' || type === 'error') {
      setTimeout(() => {
        setStatus(prev => 
          prev.type === type ? { message: '', type: 'info' } : prev
        )
      }, 5000)
    }
  }, [])

  const clearStatus = useCallback(() => {
    setStatus({ message: '', type: 'info' })
  }, [])

  // Load balances
  const loadBalances = useCallback(async () => {
    if (!provider || !userAddress) return

    try {
      // Get AVAX balance
      const avaxBalanceBN = await provider.getBalance(userAddress)
      setAvaxBalance(parseFloat(formatAvax(avaxBalanceBN)).toFixed(4))

      // Get USDC balance
      const usdcContract = new ethers.Contract(CONFIG.USDC_ADDRESS, [
        'function balanceOf(address owner) view returns (uint256)'
      ], provider)
      
      const usdcBalanceBN = await usdcContract.balanceOf(userAddress)
      setUsdcBalance(parseFloat(formatUsdc(usdcBalanceBN)).toFixed(6))

    } catch (error) {
      console.error('Error loading balances:', error)
      setAvaxBalance('Error')
      setUsdcBalance('Error')
    }
  }, [provider, userAddress])

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      showStatus('Connecting to MetaMask...', 'info')
      
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask and try again.')
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      // Create provider and signer
      const newProvider = new (ethers as any).providers.Web3Provider(window.ethereum)
      const newSigner = newProvider.getSigner()
      const address = await newSigner.getAddress()

      // Check if we're on the right network
      const network = await newProvider.getNetwork()
      if (network.chainId !== CONFIG.CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xA869' }], // Avalanche Fuji
          })
        } catch (switchError: any) {
          // Network doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xA869',
                chainName: 'Avalanche Fuji Testnet',
                nativeCurrency: {
                  name: 'AVAX',
                  symbol: 'AVAX',
                  decimals: 18
                },
                rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                blockExplorerUrls: ['https://testnet.snowtrace.io/']
              }]
            })
          }
        }
        // Refresh provider after network switch
        const refreshedProvider = new (ethers as any).providers.Web3Provider(window.ethereum)
        const refreshedSigner = refreshedProvider.getSigner()
        
        setProvider(refreshedProvider)
        setSigner(refreshedSigner)
        setUserAddress(address)
      } else {
        setProvider(newProvider)
        setSigner(newSigner)
        setUserAddress(address)
      }

      showStatus('Wallet connected successfully!', 'success')

    } catch (error: any) {
      console.error('Wallet connection error:', error)
      showStatus(`Connection failed: ${error.message}`, 'error')
    } finally {
      setIsConnecting(false)
    }
  }, [showStatus])

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    try {
      // Reset state
      setProvider(null)
      setSigner(null)
      setUserAddress(null)
      setAvaxBalance('0.0000')
      setUsdcBalance('0.000000')
      
      showStatus('Wallet disconnected. Connect to start using SmoothSend.', 'info')
      
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      showStatus('Error disconnecting wallet', 'error')
    }
  }, [showStatus])

  // Load balances when connected
  useEffect(() => {
    if (isConnected) {
      loadBalances()
    }
  }, [isConnected, loadBalances])

  // Handle MetaMask events
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          // Account switched, reconnect
          window.location.reload()
        }
      }

      const handleChainChanged = () => {
        // Reload when network changes
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [disconnectWallet])

  const value: Web3ContextType = {
    // Connection state
    provider,
    signer,
    userAddress,
    isConnected,
    isConnecting,
    
    // Balances
    avaxBalance,
    usdcBalance,
    
    // Actions
    connectWallet,
    disconnectWallet,
    loadBalances,
    
    // Transaction state
    isTransacting,
    setIsTransacting,
    
    // Status
    status,
    showStatus,
    clearStatus
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

// Export configuration for use in other components
export { CONFIG }