import { Navigation } from "@/components/navigation"
import { FloatingBackground } from "@/components/floating-background"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { ProtocolStats } from "@/components/protocol-stats"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden gradient-mesh noise-bg relative">
      <FloatingBackground />
      <Navigation />
      
      <main className="relative z-10" role="main" id="main-content">
        <HeroSection />
        
        {/* Better visual rhythm and spacing between sections */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          <StatsSection />
          
          {/* Visual separator with subtle gradient */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent h-px"></div>
            <FeaturesSection />
          </div>
          
          <ProtocolStats />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
