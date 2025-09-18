"use client"

import { Zap, Shield, DollarSign, Clock, Users, CheckCircle } from "lucide-react"
import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  const handleGetStarted = () => {
    const transferWidget = document.getElementById('gasless-transfer-widget')
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLearnMore = () => {
    window.open('https://github.com/yourusername/smoothsend', '_blank', 'noopener,noreferrer')
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Gas Fees",
      description: "Send USDC without needing AVAX for gas. Our relayer covers all transaction costs.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Signatures",
      description: "Uses EIP-712 typed signatures and permit functions for maximum security without gas.",
      gradient: "from-blue-500/20 to-cyan-500/20", 
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Low Fees",
      description: "Pay only a small USDC fee to the relayer. Much cheaper than gas fees on most networks.",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30", 
      iconColor: "text-green-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Transactions",
      description: "Fast execution on Avalanche Fuji testnet with transaction confirmation in seconds.",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Friendly",
      description: "Simple interface - just connect wallet, enter recipient and amount, then sign two messages.",
      gradient: "from-orange-500/20 to-yellow-500/20",
      border: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Reliable Service", 
      description: "Robust relayer infrastructure ensures your transactions are processed quickly and reliably.",
      gradient: "from-teal-500/20 to-cyan-500/20",
      border: "border-teal-500/30",
      iconColor: "text-teal-400"
    }
  ]

  return (
    <Section ariaLabelledBy="features-heading" className="bg-gradient-to-b from-transparent to-black/20">
      <Container>
        <SectionHeader 
          id="features-heading"
          title="Why Choose Gasless Transfers?"
          subtitle="Experience the future of crypto payments with our innovative gasless transfer system"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border ${feature.border} hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
            >
              <div className="p-6 space-y-4">
                <div className={`${feature.iconColor} bg-black/20 w-12 h-12 rounded-xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">How Gasless Transfers Work</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our innovative system eliminates the need for gas fees while maintaining full security and decentralization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto">
                1
              </div>
              <h4 className="text-lg font-semibold text-white">Connect & Sign</h4>
              <p className="text-gray-400 text-sm">
                Connect your MetaMask wallet and sign two secure messages: USDC permit and transfer authorization.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto">
                2
              </div>
              <h4 className="text-lg font-semibold text-white">Relayer Executes</h4>
              <p className="text-gray-400 text-sm">
                Our relayer uses your signatures to execute the transaction on-chain, paying all gas fees for you.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto">
                3
              </div>
              <h4 className="text-lg font-semibold text-white">Transfer Complete</h4>
              <p className="text-gray-400 text-sm">
                USDC is transferred to the recipient minus a small relayer fee. No AVAX required from you!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Ready to try gasless transfers?</h3>
            <p className="text-gray-400">Start sending USDC without gas fees in just a few clicks.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Start Transfer
              </Button>
              <Button
                onClick={handleLearnMore}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
