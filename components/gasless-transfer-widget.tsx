"use client"

import React, { useState, useCallback, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Wallet, 
  ArrowRight, 
  TrendingUp, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  ExternalLink,
  RefreshCw
} from "lucide-react"
import { useWeb3, CONFIG } from '@/contexts/web3-context'
import { ethers } from 'ethers'

// Types
interface Quote {
  amount: string
  relayerFee: string
  total: string
}

interface TransferResult {
  success: boolean
  txHash: string
  blockNumber: number
  gasUsed: string
  transferDetails: {
    from: string
    to: string
    amount: string
    relayerFee: string
  }
  explorerUrl: string
  error?: string
  details?: string[]
}

export function GaslessTransferWidget() {
  const {
    provider,
    signer,
    userAddress,
    isConnected,
    isConnecting,
    avaxBalance,
    usdcBalance,
    connectWallet,
    disconnectWallet,
    loadBalances,
    isTransacting,
    setIsTransacting,
    showStatus
  } = useWeb3()

  // Form state
  const [recipientAddress, setRecipientAddress] = useState('0x65De77117Fe7212aA0CfD8b2F97116deC4aAdE47')
  const [transferAmount, setTransferAmount] = useState('')
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isGettingQuote, setIsGettingQuote] = useState(false)
  const [transferResult, setTransferResult] = useState<TransferResult | null>(null)

  // Validation
  const isValidRecipient = useMemo(() => {
    if (!recipientAddress) return false
    try {
      return (ethers as any).utils.isAddress(recipientAddress)
    } catch {
      return false
    }
  }, [recipientAddress])

  const isValidAmount = useMemo(() => {
    if (!transferAmount) return false
    const amount = parseFloat(transferAmount)
    return !isNaN(amount) && amount > 0
  }, [transferAmount])

  const hasValidInputs = isValidRecipient && isValidAmount

  // Utility functions
  const parseUsdc = (amount: string): string => {
    return Math.floor(parseFloat(amount) * 1000000).toString()
  }

  const formatUsdc = (amount: string): string => {
    return (parseInt(amount) / 1000000).toFixed(6)
  }

  // Get transfer quote
  const getQuote = useCallback(async () => {
    if (!hasValidInputs || !isConnected) return

    try {
      setIsGettingQuote(true)
      showStatus('Getting transfer quote...', 'info')

      const amountWei = parseUsdc(transferAmount)
      const response = await fetch(`${CONFIG.RELAYER_API}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainName: CONFIG.CHAIN_NAME,
          token: 'USDC',
          amount: amountWei
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get quote')
      }

      const quote = await response.json()
      setCurrentQuote(quote)
      showStatus('Quote received! Ready to transfer.', 'success')

    } catch (error: any) {
      console.error('Quote error:', error)
      showStatus(`Quote failed: ${error.message}`, 'error')
      setCurrentQuote(null)
    } finally {
      setIsGettingQuote(false)
    }
  }, [transferAmount, hasValidInputs, isConnected, showStatus])

  // Execute gasless transfer
  const executeTransfer = useCallback(async () => {
    if (!currentQuote || !hasValidInputs || !isConnected || !signer) return

    try {
      setIsTransacting(true)
      showStatus('Preparing gasless transfer...', 'info')

      // Step 1: Get user nonce
      showStatus('Getting user nonce...', 'info')
      const nonceResponse = await fetch(
        `${CONFIG.RELAYER_API}/nonce?chainName=${CONFIG.CHAIN_NAME}&userAddress=${userAddress}`
      )
      const { nonce } = await nonceResponse.json()

      // Step 2: Get USDC permit nonce
      showStatus('Getting USDC permit nonce...', 'info')
      const usdcContract = new ethers.Contract(CONFIG.USDC_ADDRESS, [
        'function nonces(address owner) view returns (uint256)'
      ], provider)
      const permitNonce = await usdcContract.nonces(userAddress)

      // Step 3: Generate permit signature
      showStatus('Please sign the USDC permit in your wallet...', 'info')
      const permitDeadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour
      const totalRequired = (ethers as any).BigNumber.from(currentQuote.amount).add(currentQuote.relayerFee)

      const permitTypedData = {
        domain: {
          name: 'USD Coin',
          version: '2',
          chainId: CONFIG.CHAIN_ID,
          verifyingContract: CONFIG.USDC_ADDRESS
        },
        types: {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Permit',
        message: {
          owner: userAddress,
          spender: CONFIG.CONTRACT_ADDRESS,
          value: totalRequired.toString(),
          nonce: permitNonce.toString(),
          deadline: permitDeadline.toString()
        }
      }

      const permitSignature = await (signer as any)._signTypedData(
        permitTypedData.domain,
        permitTypedData.types,
        permitTypedData.message
      )

      const permitSig = (ethers as any).utils.splitSignature(permitSignature)

      // Step 4: Generate transfer authorization signature
      showStatus('Please sign the transfer authorization in your wallet...', 'info')
      const transferDeadline = Math.floor(Date.now() / 1000) + 3600

      const transferTypedData = {
        domain: {
          name: 'PurelyGaslessTransfer',
          version: '1',
          chainId: CONFIG.CHAIN_ID,
          verifyingContract: CONFIG.CONTRACT_ADDRESS
        },
        types: {
          Transfer: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'token', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'relayerFee', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Transfer',
        message: {
          from: userAddress,
          to: recipientAddress,
          token: CONFIG.USDC_ADDRESS,
          amount: currentQuote.amount,
          relayerFee: currentQuote.relayerFee,
          nonce: nonce,
          deadline: transferDeadline
        }
      }

      const transferSignature = await (signer as any)._signTypedData(
        transferTypedData.domain,
        transferTypedData.types,
        transferTypedData.message
      )

      // Step 5: Execute transfer via relayer
      showStatus('Executing gasless transfer... This may take 10-15 seconds.', 'info')

      const transferResponse = await fetch(`${CONFIG.RELAYER_API}/relay-transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainName: CONFIG.CHAIN_NAME,
          from: userAddress,
          to: recipientAddress,
          tokenSymbol: 'USDC',
          amount: currentQuote.amount,
          relayerFee: currentQuote.relayerFee,
          nonce: nonce,
          deadline: transferDeadline,
          signature: transferSignature,
          permitData: {
            value: totalRequired.toString(),
            deadline: permitDeadline,
            v: permitSig.v,
            r: permitSig.r,
            s: permitSig.s
          }
        })
      })

      const result = await transferResponse.json()

      if (!result.success) {
        let errorMessage = result.error || 'Transfer failed'
        if (result.details && result.details.length > 0) {
          errorMessage += ':\\n' + result.details.join('\\n')
        }
        throw new Error(errorMessage)
      }

      // Success!
      setTransferResult(result)
      showStatus('🎉 Gasless transfer completed successfully!', 'success')

      // Refresh balances after a short delay
      setTimeout(() => loadBalances(), 2000)

    } catch (error: any) {
      console.error('Transfer error:', error)
      showStatus(`Transfer failed: ${error.message}`, 'error')
    } finally {
      setIsTransacting(false)
    }
  }, [
    currentQuote, 
    hasValidInputs, 
    isConnected, 
    signer, 
    recipientAddress, 
    userAddress, 
    provider, 
    setIsTransacting, 
    showStatus, 
    loadBalances
  ])

  // Reset form for new transfer
  const resetForm = useCallback(() => {
    setTransferAmount('')
    setCurrentQuote(null)
    setTransferResult(null)
    showStatus('Ready for new transfer', 'info')
  }, [showStatus])

  // If transfer was successful, show result
  if (transferResult) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Transfer Complete!</h3>
            <p className="text-gray-300">Your gasless USDC transfer was successful</p>
          </div>

          <div className="space-y-4 bg-emerald-950/30 rounded-xl p-4 border border-emerald-500/20">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Amount:</span>
                <p className="text-white font-semibold">{formatUsdc(transferResult.transferDetails.amount)} USDC</p>
              </div>
              <div>
                <span className="text-gray-400">Fee:</span>
                <p className="text-white font-semibold">{formatUsdc(transferResult.transferDetails.relayerFee)} USDC</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">To:</span>
                <p className="text-white font-mono text-xs break-all">{transferResult.transferDetails.to}</p>
              </div>
              <div>
                <span className="text-gray-400">Block:</span>
                <p className="text-white">{transferResult.blockNumber}</p>
              </div>
              <div>
                <span className="text-gray-400">Gas:</span>
                <p className="text-white">{transferResult.gasUsed} (paid by relayer)</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.open(transferResult.explorerUrl, '_blank')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              View Transaction
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              New Transfer
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/50 hover:border-emerald-500/30 transition-all duration-300">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Gasless USDC Transfer</h2>
          <p className="text-gray-400">Send USDC without paying gas fees</p>
        </div>

        {/* Connection Status */}
        {!isConnected ? (
          <div className="text-center space-y-4">
            <Wallet className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="space-y-2">
              <p className="text-white font-semibold">Connect Your Wallet</p>
              <p className="text-gray-400 text-sm">Connect MetaMask to start sending USDC without gas fees</p>
            </div>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Connected Wallet</h3>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  Disconnect
                </Button>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-3">{userAddress}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">AVAX Balance:</span>
                  <p className="text-white font-semibold">{avaxBalance} AVAX</p>
                </div>
                <div>
                  <span className="text-gray-400">USDC Balance:</span>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold">{usdcBalance} USDC</p>
                    <Button
                      onClick={loadBalances}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-gray-400 hover:text-white"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Form */}
            <div className="space-y-4">
              {/* Recipient Address */}
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm text-gray-400 font-medium">
                  Recipient Address
                </label>
                <div className="relative">
                  <Input
                    id="recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:ring-emerald-400/20"
                  />
                  {recipientAddress && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValidRecipient ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  )}
                </div>
                {recipientAddress && !isValidRecipient && (
                  <p className="text-yellow-400 text-xs">Please enter a valid Ethereum address</p>
                )}
              </div>

              {/* Transfer Amount */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="amount" className="text-sm text-gray-400 font-medium">
                    Amount (USDC)
                  </label>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>Balance: {usdcBalance} USDC</span>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:ring-emerald-400/20 text-lg font-semibold"
                    min="0"
                    step="0.000001"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                    USDC
                  </div>
                </div>
              </div>

              {/* Quote Info */}
              {currentQuote && (
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Info className="w-4 h-4" />
                    Transfer Quote
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">{formatUsdc(currentQuote.amount)} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Relayer Fee:</span>
                      <span className="text-white">{formatUsdc(currentQuote.relayerFee)} USDC</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-emerald-500/20 pt-1 mt-2">
                      <span className="text-emerald-400">Total Deducted:</span>
                      <span className="text-emerald-400">{formatUsdc(currentQuote.total)} USDC</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={getQuote}
                  disabled={!hasValidInputs || isGettingQuote}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                >
                  {isGettingQuote ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Getting Quote...
                    </>
                  ) : (
                    'Get Quote'
                  )}
                </Button>

                {currentQuote && (
                  <Button
                    onClick={executeTransfer}
                    disabled={isTransacting}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                  >
                    {isTransacting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Transferring...
                      </>
                    ) : (
                      <>
                        Send USDC
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Info Footer */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-4 text-sm">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-300">
                  <p className="font-semibold mb-1">How it works:</p>
                  <p className="text-blue-200 text-xs">
                    You'll sign two messages: one to approve USDC spending, and one to authorize the transfer. 
                    Our relayer pays the gas fees and deducts a small fee from your USDC.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}