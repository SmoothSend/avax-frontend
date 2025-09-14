import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export function GradientBackground({ variant = "primary", className }: GradientBackgroundProps) {
  const variants = {
    primary: "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.03) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(5, 150, 105, 0.02) 0%, transparent 35%), linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 10, 0.9) 100%)",
    secondary: "radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 40%), linear-gradient(135deg, rgba(5, 5, 15, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)",
    accent: "radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.06) 0%, transparent 45%), radial-gradient(circle at 60% 40%, rgba(5, 150, 105, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 35%), linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(5, 10, 5, 0.95) 100%)"
  }

  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ background: variants[variant] }}
      aria-hidden="true"
    />
  )
}

interface NoiseTextureProps {
  intensity?: "light" | "medium" | "heavy"
  className?: string
}

export function NoiseTexture({ intensity = "medium", className }: NoiseTextureProps) {
  const intensities = {
    light: "opacity-6",
    medium: "opacity-12",
    heavy: "opacity-20"
  }

  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none z-1 mix-blend-overlay", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' seed='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.${intensities[intensity].replace('opacity-', '')}'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: "300px 300px, 150px 150px",
        backgroundRepeat: "repeat"
      }}
      aria-hidden="true"
    />
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FloatingElement({ children, className, delay = 0, duration = 6 }: FloatingElementProps) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  )
}