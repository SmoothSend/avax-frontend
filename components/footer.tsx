import { Github, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-white">Socials</h3>
          </div>
          <p className="text-gray-400 mb-6">Follow Smoothsend Labs on X, Farcaster, LinkedIn, and TikTok</p>
          <div className="flex space-x-4" role="list" aria-label="Social media links">
            <div role="listitem">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-white/50 focus:outline-none rounded-lg p-1"
                aria-label="Follow us on GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
            <div role="listitem">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-white/50 focus:outline-none rounded-lg p-1"
                aria-label="Follow us on X (formerly Twitter)"
              >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            </div>
            <div role="listitem">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-white/50 focus:outline-none rounded-lg p-1"
                aria-label="Join our Discord community"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-pink-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Wallet
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-pink-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  SmoothsendX
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-pink-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  API
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-pink-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Smoothchain
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Protocol</h4>
            <ul className="space-y-3" role="list">
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-purple-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Vote
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-purple-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Governance
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-purple-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Developers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3" role="list">
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-blue-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  About
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-blue-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Careers
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-blue-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Blog
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-blue-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Brand assets
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Need help?</h4>
            <ul className="space-y-3" role="list">
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-green-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Help center
                </a>
              </li>
              <li >
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-all duration-200 hover:translate-x-1 focus:ring-2 focus:ring-green-400/50 focus:outline-none rounded px-1 py-0.5"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 - Smoothsend Labs</p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-all duration-200 hover:underline focus:ring-2 focus:ring-white/50 focus:outline-none rounded px-1 py-0.5"
              aria-label="Read our Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-all duration-200 hover:underline focus:ring-2 focus:ring-white/50 focus:outline-none rounded px-1 py-0.5"
              aria-label="Read our Trademark Policy"
            >
              Trademark Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
