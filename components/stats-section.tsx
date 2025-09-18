"use client"

import { Button } from "@/components/ui/button"
import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { StatsCard } from "@/components/ui/content-cards"

export function StatsSection() {
  const statsData = [
    {
      value: "0%",
      label: "Gas fees for users",
      ariaLabel: "Zero percent gas fees"
    },
    {
      value: "~$0.10", 
      label: "Average relayer fee",
      ariaLabel: "Ten cents average fee"
    },
    {
      value: "2-5 sec",
      label: "Transaction speed", 
      ariaLabel: "Two to five seconds"
    },
    {
      value: "100%",
      label: "Decentralized",
      ariaLabel: "One hundred percent decentralized"
    }
  ]

  const handleTryTransfer = () => {
    const transferWidget = document.getElementById('gasless-transfer-widget')
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section ariaLabelledBy="stats-heading" className="py-12">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionHeader 
            id="stats-heading"
            title="The Future of Crypto Transfers"
            subtitle="Experience gasless transfers powered by innovative relayer technology. Send USDC without needing AVAX for gas fees - our relayers handle the costs for you."
          />
        </div>

        {/* Stats Grid with improved spacing */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16" role="list" aria-label="Gasless transfer benefits">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
            />
          ))}
        </div>

        {/* Benefits section with enhanced layout */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 backdrop-blur-sm rounded-3xl border border-emerald-500/20 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Why Gasless Transfers Matter
                </h3>
                <div className="space-y-6 text-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-emerald-400 font-semibold">Accessibility:</strong> No need to hold multiple tokens for gas fees across different chains
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-teal-400 font-semibold">Cost Efficiency:</strong> Pay only the transfer amount plus a small USDC fee
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-cyan-400 font-semibold">User Experience:</strong> Simplified workflow - just sign, don't worry about gas
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-green-400 font-semibold">Security:</strong> Maintain full control with cryptographic signatures
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={handleTryTransfer}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-10 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Start Gasless Transfer
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
