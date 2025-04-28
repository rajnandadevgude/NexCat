import Image from "next/image"
import Link from "next/link"
import { Upload, Shield, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FontSizeSelector } from "@/components/font-size-selector"
import { LanguageSelector } from "@/components/language-selector"
import { IntegrationCard } from "@/components/integration-card"
import { DepartmentTab } from "@/components/department-tab"
import { NoticeCarousel } from "@/components/notice-carousel"
import { FeatureCard } from "@/components/feature-card"
import { StatCard } from "@/components/stat-card"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-xs text-blue-900 font-bold">D</span>
          </div>
          <span className="text-sm text-white">Nexus catena portal</span>
        </div>
        <div className="flex items-center gap-2">
          <FontSizeSelector />
          <LanguageSelector />
        </div>
      </div>

      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <Image src="/n.png" alt="NexCat Logo" fill className="object-contain" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-blue-600 text-3xl font-bold">NexCat</h1>
              <p className="text-emerald-600 font-medium">Secure Document Management on Blockchain</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
  <Link href="/dashboard">
    <Button variant="outline" className="border-blue-300 text-blue-600" style={{ borderRadius: '8px' }}>
      Dashboard
    </Button>
  </Link>

            <Link href="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700" style={{ borderRadius: '8px' }}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <MainNav />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Pattern" fill className="object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Secure Your Documents with Blockchain Technology</h2>
              <p className="text-lg mb-6 text-blue-100">
              NexCat provides tamper-proof document storage, verification, and management using IPFS and blockchain
                technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/upload">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white" style={{ borderRadius: '8px' }}>
                    Upload Document
                  </Button>
                </Link>
                <Link href="/verify">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white hover:text-blue-900"style={{ borderRadius: '8px' }}
                  >
                    Verify Document
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-64 w-full md:h-96 md:w-96">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Document Security"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Carousel */}
      <NoticeCarousel />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Platform Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
              NexCat combines blockchain technology with IPFS storage to provide secure, transparent, and efficient
                document management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <FeatureCard
                icon={<Image src="/g1.png" alt="Secure Storage" width={40} height={40} />}
                title ={<span style={{ color: 'black' }}>Secure Storage</span>}
                description="Documents are stored on IPFS with encryption and accessible only to authorized users."
                link="/ipfs"
              />
              <FeatureCard
                icon={
                  <Image
                    src="/verification.png"
                    alt="Blockchain Verification"
                    width={40}
                    height={40}
                  />
                }
                title ={<span style={{ color: 'black' }}>Blockchain Verification</span>}
                description="Every document is hashed and recorded on blockchain for tamper-proof verification."
                link="/blockchain"
              />
              <FeatureCard
                icon={
                  <Image
                    src="/timeline.png"
                    alt="Timestamped Records"
                    width={40}
                    height={40}
                  />
                }
                
                title ={<span style={{ color: 'black' }}>Timestamped Records</span>}
                description="All document activities are timestamped and recorded for complete audit trail."
                link="/verification"
              />
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl"></div>
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Background Pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative p-8 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">NexCat in Numbers</h2>
                <p className="text-blue-100">Growing ecosystem of secure document management</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard number="10,000+" label="Documents Stored" />
                <StatCard number="5,000+" label="Verified Users" />
                <StatCard number="25,000+" label="Blockchain Verifications" />
                <StatCard number="99.9%" label="Uptime" />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Document Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our range of document management services powered by blockchain technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="text-xl font-bold">Document Management</h3>
                </div>
                <div className="p-6">
                  <DepartmentTab />
                </div>
              </div>

              <div className="space-y-6">
                {/* Login Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4">
                    <h3 className="text-xl font-bold">User Account</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      
                      <p>Create your profile to access document management services</p>
                    </div>

                    <div className="mb-4">
  <Link href="/register">
    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3" style={{ borderRadius: '8px' }}>
      New User? Register Here
    </Button>
  </Link>

  <Link href="/login">
    <Button variant="outline" className="w-full border-blue-300 text-blue-600" style={{ borderRadius: '8px' }}>
      Already Registered? Login
    </Button>
  </Link>
</div>

                    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Benefits of Registration</h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </span>
                          <span>Access to secure document storage on IPFS</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </span>
                          <span>Blockchain verification for all your documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </span>
                          <span>Share documents securely with authorized parties</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/verify" className="block">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="bg-blue-600 text-white p-3 flex items-center gap-3">
                        <Shield className="h-5 w-5" />
                        <h3 className="font-bold">Verify Document</h3>
                      </div>
                      <div className="p-4 flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image src="/check.png" alt="Verify" fill className="object-contain" />
                        </div>
                        <div className="text-sm text-gray-600">
                          Check authenticity of any document using our blockchain verification
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/ipfs" className="block">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="bg-purple-600 text-white p-3 flex items-center gap-3">
                        <Upload className="h-5 w-5" />
                        <h3 className="font-bold">IPFS Storage</h3>
                      </div>
                      <div className="p-4 flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image
                            src="/g1.png"
                            alt="IPFS Storage"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          Store documents securely on decentralized IPFS network
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/blockchain" className="block">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="bg-emerald-600 text-white p-3 flex items-center gap-3">
                        <Award className="h-5 w-5" />
                        <h3 className="font-bold">Certificates</h3>
                      </div>
                      <div className="p-4 flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image
                            src="/certificate.png"
                            alt="Certificates"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          Issue and verify digital certificates with blockchain proof
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/contact" className="block">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="bg-orange-500 text-white p-3 flex items-center gap-3">
                        <Clock className="h-5 w-5" />
                        <h3 className="font-bold">Support</h3>
                      </div>
                      <div className="p-4 flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <Image src="/customer-service.png" alt="Support" fill className="object-contain" />
                        </div>
                        <div className="text-sm text-gray-600">Get help with document management and verification</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Integrated Technologies</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
              NexCat leverages cutting-edge technologies for secure document management
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <IntegrationCard
                title="IPFS Storage"
                imgSrc="/g1.png"
                bgColor="bg-blue-100"
                textColor="text-blue-800"
              />
              <IntegrationCard
                title="Ethereum Blockchain"
                imgSrc="/ethereum.png"
                bgColor="bg-purple-100"
                textColor="text-purple-800"
              />
              <IntegrationCard
                title="Digital Signatures"
                imgSrc="/signature.png"
                bgColor="bg-emerald-100"
                textColor="text-emerald-800"
              />
              <IntegrationCard
                title="Metamask Integration"
                imgSrc="/metamask.png"
                bgColor="bg-orange-100"
                textColor="text-orange-800"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Pattern" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
             
                
                <h3 className="text-xl font-bold">NexCat</h3>
              
              <p className="text-blue-200 mb-4">
                Secure document management platform powered by blockchain technology and IPFS storage.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-white hover:text-blue-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-blue-200">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-blue-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-200 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="text-blue-200 hover:text-white">
                    Documents
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="text-blue-200 hover:text-white">
                    Verification
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-blue-200 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/ipfs" className="text-blue-200 hover:text-white">
                    IPFS Storage
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-blue-200 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-blue-200 hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-blue-200 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-blue-200 hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-blue-200 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-blue-200">
                  <svg className="h-5 w-5 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@NexCat.com</span>
                </li>
                <li className="flex items-start gap-2 text-blue-200">
                  <svg className="h-5 w-5 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+91 7498031556</span>
                </li>
                <li className="flex items-start gap-2 text-blue-200">
                  <svg className="h-5 w-5 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Triputi asdfghjk</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-300 text-sm mb-4 md:mb-0">&copy; 2025 NexCat. All rights reserved.</p>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy" className="text-blue-300 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-blue-300 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-blue-300 hover:text-white">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

