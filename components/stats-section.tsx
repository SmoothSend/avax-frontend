"use client"

import { Button } from "@/components/ui/button"
import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { StatsCard } from "@/components/ui/content-cards"

export function StatsSection() {
  const statsData = [
    {
      value: "$3.3T",
      label: "All time volume",
      ariaLabel: "3.3 trillion dollars"
    },
    {
      value: "$4.7B", 
      label: "Total value locked",
      ariaLabel: "4.7 billion dollars"
    },
    {
      value: "119.0M",
      label: "All time swappers", 
      ariaLabel: "119 million"
    },
    {
      value: "$2.9B",
      label: "24H swap volume",
      ariaLabel: "2.9 billion dollars"
    }
  ]

  return (
    <Section ariaLabelledBy="stats-heading">
      <Container>
        <SectionHeader 
          id="stats-heading"
          title="Trusted by millions"
          subtitle="SmoothSend Labs powers some of the most used products in crypto. Experience permissionless access, proven security, and dedicated support."
        />

        <div className="stats-grid" role="list" aria-label="Platform statistics">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
            />
          ))}
        </div>

        <div className="text-center text-spacing">
          <Button 
            className="btn-primary hover-lift" 
            aria-label="Start trading on SmoothSend DEX"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Trade on the world's largest DEX →
          </Button>
        </div>
      </Container>
    </Section>
  )
}
