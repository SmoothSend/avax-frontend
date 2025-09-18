"use client"

import { ChevronDown, ArrowRight, Zap, Shield, DollarSign } from "lucide-react"
import { GaslessTransferWidget } from "./gasless-transfer-widget"
import { Section, Container } from "./ui/layout"
import { Button } from "./ui/button"

export function HeroSection() {
  const handleScrollToContent = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
  }

  const handleGetStarted = () => {
    const transferWidget = document.getElementById('gasless-transfer-widget')
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section 
      className="flex flex-col items-center justify-center min-h-[85vh] pt-8 md:pt-12"
      id="main-content"
      ariaLabel="Hero section with main heading and gasless transfer interface"
    >
      <Container className="text-center">
        <header className="content-spacing max-w-5xl mx-auto">
          <h1 className="hero-text text-balance text-white mb-6" id="main-heading">
            Send crypto
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
              without gas fees.
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
            Transfer USDC on <strong className="text-emerald-400 font-semibold">Avalanche Fuji</strong> without 
            paying gas fees. Our relayer handles the transaction costs for a small USDC fee.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 mb-8">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-500/20">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">No Gas Required</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-teal-500/20">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-teal-300 text-sm font-medium">Secure Signatures</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/20">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Low Fees</span>
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              className="btn-primary group flex items-center gap-2"
              aria-label="Get started with gasless transfers"
            >
              Start Transfer
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => window.open('https://github.com/yourusername/smoothsend', '_blank')}
              className="btn-secondary group flex items-center gap-2"
              aria-label="View source code"
            >
              View on GitHub
            </Button>
          </div>
        </header>

        <div className="mt-12 md:mt-16" id="gasless-transfer-widget">
          <GaslessTransferWidget />
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-400 mb-4 text-sm md:text-base font-medium">
            Learn more about gasless transfers
          </p>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-emerald-400 transition-all duration-300 focus-visible-emerald rounded-lg p-3 hover:scale-110 group"
            onClick={handleScrollToContent}
            aria-label="Scroll down to learn more about SmoothSend gasless transfer features"
          >
            <ChevronDown className="w-6 h-6 mx-auto animate-bounce group-hover:animate-pulse" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
