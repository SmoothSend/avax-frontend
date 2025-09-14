"use client"

import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { FeatureCard } from "@/components/ui/content-cards"

export function FeaturesSection() {
  const handleExploreTokens = () => {
    // Navigate to tokens page or scroll to swap widget
    const swapWidget = document.getElementById('swap-widget')
    if (swapWidget) {
      swapWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadWallet = () => {
    // Open wallet download page
    window.open('https://smoothsend.com/wallet', '_blank', 'noopener,noreferrer')
  }

  return (
    <Section ariaLabelledBy="features-heading">
      <Container>
        <SectionHeader 
          id="features-heading"
          title="Built for all the ways you swap"
        />

        <div className="features-grid">
          <FeatureCard
            icon={<div className="w-4 h-4 bg-white rounded-sm"></div>}
            badge="Web app"
            title="Permissionless swapping."
            description="Access deep liquidity, explore tokens, set limit orders, and provide liquidity for thousands of tokens across 14 chains."
            buttonText="Explore tokens"
            onButtonClick={handleExploreTokens}
            variant="teal"
          />
          
          <FeatureCard
            icon={<div className="w-4 h-4 bg-white rounded-sm"></div>}
            badge="SmoothSend wallet"
            title="Swap, store, explore."
            description="The trusted self-custody crypto wallet and extension with millions of downloads, support from real humans, and a 4.8 ⭐ rating."
            buttonText="Download SmoothSend Wallet"
            onButtonClick={handleDownloadWallet}
            variant="emerald"
          />
        </div>
      </Container>
    </Section>
  )
}
