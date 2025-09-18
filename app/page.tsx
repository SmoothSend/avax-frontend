import { Navigation } from "@/components/navigation"
import { FloatingBackground } from "@/components/floating-background"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { ProtocolStats } from "@/components/protocol-stats"
import { Footer } from "@/components/footer"
import { ClientOnly } from "@/components/ui/client-only"
import { StatusNotification } from "@/components/status-notification"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden gradient-mesh noise-bg relative" suppressHydrationWarning>
      <ClientOnly>
        <FloatingBackground />
        <StatusNotification />
      </ClientOnly>
      <Navigation />
      
      <main className="relative z-10" role="main" id="main-content">
        {/* Hero Section - Full viewport focus */}
        <HeroSection />
        
        {/* Main Content - Reduced spacing for better flow */}
        <div className="relative">
          {/* Stats Section - Immediate value proposition */}
          <section className="py-8 md:py-12">
            <StatsSection />
          </section>
          
          {/* Features Section - Detailed benefits */}
          <section className="py-8 md:py-12">
            <FeaturesSection />
          </section>
          
          {/* Protocol Stats - Technical credibility */}
          <section className="py-8 md:py-12 bg-gradient-to-b from-transparent via-black/20 to-transparent">
            <ProtocolStats />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
