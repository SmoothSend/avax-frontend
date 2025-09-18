import { ExternalLink, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500"></div>
              <h3 className="text-xl font-bold text-white">SmoothSend</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Gasless transfers powered by decentralized microservices hosted on Akash Network. 
              Experience truly decentralized infrastructure on the blockchain.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <Globe className="w-4 h-4" />
              <span>Powered by Akash Network</span>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Networks</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-400">Avalanche Fuji (EVM)</span>
                </li>
                <li>
                  <a
                    href="https://www.smoothsend.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                  >
                    Aptos Network
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://x.com/smoothsend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Follow on X
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/smoothsendlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-gray-400">© 2025 SmoothSend Labs</p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Proof of Concept</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500">
              Multi-chain microservice architecture
            </p>
            <p className="text-xs text-gray-500">
              Decentralized relayers on blockchain infrastructure
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
