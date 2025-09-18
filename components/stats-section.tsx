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
    <Section ariaLabelledBy="stats-heading">
      <Container>
        <SectionHeader 
          id="stats-heading"
          title="The Future of Crypto Transfers"
          subtitle="Experience gasless transfers powered by innovative relayer technology. Send USDC without needing AVAX for gas fees - our relayers handle the costs for you."
        />

        <div className="stats-grid" role="list" aria-label="Gasless transfer benefits">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
            />
          ))}
        </div>

        {/* Additional benefits section */}
        <div className="mt-16 bg-gradient-to-br from-emerald-950/40 to-teal-950/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Why Gasless Transfers Matter
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-emerald-400">Accessibility:</strong> No need to hold multiple tokens for gas fees across different chains</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-teal-400">Cost Efficiency:</strong> Pay only the transfer amount plus a small USDC fee</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-cyan-400">User Experience:</strong> Simplified workflow - just sign, don't worry about gas</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-green-400">Security:</strong> Maintain full control with cryptographic signatures</p>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text mb-2">
                    Try it now
                  </div>
                  <p className="text-gray-300">Experience the future of transfers</p>
                </div>
                
                <Button
                  onClick={handleTryTransfer}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Start Gasless Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-spacing mt-12">
          <Button 
            className="btn-primary hover-lift" 
            aria-label="Learn more about gasless transfer technology"
            onClick={() => window.open('https://github.com/yourusername/smoothsend', '_blank')}
          >
            Learn About the Technology →
          </Button>
        </div>
      </Container>
    </Section>
  )
}
