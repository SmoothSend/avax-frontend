import { Section, Container } from "@/components/ui/layout"
import { StatsCard } from "@/components/ui/content-cards"

export function ProtocolStats() {
  const protocolStats = [
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
    <Section>
      <Container maxWidth="4xl">
        <div className="flex items-center justify-center space-x-2 text-spacing">
          <div 
            className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" 
            aria-hidden="true"
          ></div>
          <span className="text-emerald-300/80 font-medium">
            SmoothSend Protocol stats
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Protocol statistics">
          {protocolStats.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
              className={index === 3 ? "md:col-span-2 lg:col-span-1" : ""}
              valueClassName={index === 3 ? "text-emerald-400" : ""}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
