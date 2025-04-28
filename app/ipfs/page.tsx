"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  ExternalLink,
  Database,
  HardDrive,
  Network,
  Lock,
  Globe,
  Shield,
  Server,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"

export default function IPFSPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">IPFS Storage</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-700">IPFS Decentralized Storage</h1>
          <p className="text-gray-600">Secure, permanent, and decentralized document storage</p>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-600">What is IPFS?</h2>
                <p className="text-gray-700 mb-4">
                  The InterPlanetary File System (IPFS) is a protocol and peer-to-peer network for storing and sharing
                  data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a
                  global namespace connecting all computing devices.
                </p>
                <p className="text-gray-700 mb-4">
                NexCat uses IPFS to store your documents securely and permanently, ensuring they cannot be tampered
                  with or removed. This makes it ideal for important documents that need to be preserved with integrity.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <Link href="/upload">
                    <Button className="w-full md:w-auto">Upload to IPFS</Button>
                  </Link>
                  <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full md:w-auto flex items-center gap-2" className="text-black">
                      Learn More
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative h-60 md:h-full">
                <Image
                  src="data:image/svg+xml,%3csvg%20fill='none'%20height='233'%20viewBox='0%200%20202%20233'%20width='202'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m100.845%20232.993%20100.727-58.198v-116.3132l-100.727%2058.1152z'%20fill='%2335777a'/%3e%3cpath%20d='m100.845%20232.993v-116.509l-100.727324-58.0022v116.3132z'%20fill='%2343979b'/%3e%3cpath%20d='m.117676%2058.4815%20100.727324%2058.1155%20100.727-58.1155-100.727-58.115045z'%20fill='%233f898d'/%3e%3cpath%20d='m90.4824%2014.3445-73.0376%2042.1976c.1658%201.3264.1658%202.57%200%203.8964l73.0376%2042.1975c6.1348-4.5595%2014.5906-4.5595%2020.7256%200l73.038-42.1975c-.166-1.3264-.166-2.57%200-3.8964l-73.038-42.1976c-6.218%204.5596-14.5908%204.5596-20.7256%200z'%20fill='%2351b8bc'/%3e%3cpath%20d='m191.209%2072.0448-73.12%2042.6122c.829%207.627-3.316%2014.84-10.363%2017.907l.083%2083.898c1.161.497%202.321%201.16%203.399%201.99l73.038-42.198c-.829-7.627%203.316-14.84%2010.362-17.907v-84.3125c-1.16-.4974-2.321-1.1607-3.399-1.9897z'%20fill='%23459da2'/%3e%3cpath%20d='m10.4808%2072.542c-1.07773.7461-2.15547%201.4094-3.39901%201.9897v84.3123c7.04671%203.067%2011.19191%2010.363%2010.36291%2017.907l73.0375%2042.198c1.0778-.746%202.1555-1.41%203.399-1.99v-84.312c-7.0467-3.068-11.1919-10.363-10.3628-17.907z'%20fill='%2364c1c8'/%3e%3cg%20fill='%23fff'%3e%3cpath%20d='m31.5317%2084.4706h-13.4094v64.8674h13.4094z'/%3e%3cpath%20d='m54.9143%20149.338v-23.801c3.2685.251%206.6209.251%209.3865.251%2019.1084%200%2024.6398-9.47%2024.6398-21.12%200-14.1632-10.1409-20.1974-25.7293-20.1974h-21.7064v64.8674zm7.2075-32.936c-2.5143%200-6.118%200-7.2913-.084v-22.0418h8.3808c8.0457%200%2012.6551%203.8552%2012.6551%2010.8948v.168c.0838%205.531-1.9276%2011.063-13.7446%2011.063z'/%3e%3cpath%20d='m134.783%2084.4706h-40.7308v64.8674h13.4098v-28.578h25.477v-9.722h-25.561v-16.678h26.483z'/%3e%3cpath%20d='m178.699%2097.2101%203.52-8.9675c-5.196-3.7714-12.32-5.1124-21.204-5.1124-12.99%200-23.634%206.0343-23.634%2018.4378%200%2011.147%208.214%2015.505%2016.343%2018.187l8.213%202.765c5.615%201.928%2010.225%203.772%2010.225%209.806%200%205.531-4.777%207.71-12.069%207.71-7.375%200-15.253-2.179-19.778-5.028l-3.52%209.722c5.866%203.771%2013.325%205.615%2023.298%205.615%2014.248%200%2025.227-6.286%2025.227-19.528%200-12.403-9.47-16.342-19.025-19.527l-8.883-2.933c-3.856-1.257-6.789-3.017-6.789-7.962%200-5.0287%204.107-7.0401%2010.309-7.0401%207.542-.2514%2013.409%201.1733%2017.767%203.8552z'/%3e%3c/g%3e%3c/svg%3e"
                  alt="IPFS Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 text-gray-600">Key Benefits of IPFS Storage</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-blue-500">Decentralized Storage</h3>
                  <p className="text-sm text-gray-600">
                    Files are stored across multiple nodes, eliminating single points of failure and censorship.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <HardDrive className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-purple-500">Content-Addressed Storage</h3>
                  <p className="text-sm text-gray-600">
                    Files are identified by their content, not location, ensuring data integrity and deduplication.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Network className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-green-500">Peer-to-Peer Network</h3>
                  <p className="text-sm text-gray-600">
                    Direct file sharing between peers improves speed, efficiency, and reduces bandwidth costs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 text-gray-600">IPFS Integration with Blockchain</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                NexCat combines IPFS storage with blockchain technology to provide a complete document management
                  solution:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Secure Storage:</strong> Documents are stored on IPFS with encryption, ensuring they
                      remain private and secure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Blockchain Verification:</strong> Document hashes are stored on the blockchain, providing
                      tamper-proof verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Permanent Storage:</strong> Once stored on IPFS, documents remain accessible as long as at
                      least one node in the network has a copy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="how-to-use" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <h2 className="text-xl font-bold mb-6 text-gray-700">How to Use IPFS Storage in NexCat</h2>

            <div className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center text-blue-700 ">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-blue-800 font-bold">
                    1
                  </div>
                  Create an Account
                </h3>
                <div className="ml-10">
                  <p className="text-gray-700 mb-3">
                    Before you can use IPFS storage, you need to create an account on NexCat. This ensures that your
                    documents are securely associated with your identity.
                  </p>
                  <Link href="/register">
                    <Button variant="outline" size="sm" className="text-black">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center text-blue-700">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-blue-800 font-bold ">
                    2
                  </div>
                  Connect Your Wallet
                </h3>
                <div className="ml-10">
                  <p className="text-gray-700 mb-3">
                    Connect your MetaMask or other Ethereum wallet to NexCat. This wallet will be used to sign
                    transactions that record your document hashes on the blockchain.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Shield className="h-4 w- 4" />
                    <span>Your private keys remain in your wallet and are never shared with NexCat</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center text-blue-700">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-blue-800 font-bold">
                    3
                  </div>
                  Upload Your Document
                </h3>
                <div className="ml-10">
                  <p className="text-gray-700 mb-3">
                    Navigate to the Upload page and select the document you want to store. Add metadata like title,
                    description, and document type to make it easier to find later.
                  </p>
                  <div className="bg-white p-4 rounded-md mb-3">
                    <h4 className="font-medium mb-2 text-blue-700">Supported File Types:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-blue-700">
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="h-4 w-4 text-red-500 text-blue-700" />
                        <span>PDF</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Image className="h-4 w-4 text-purple-500" />
                        <span>JPG/PNG</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>DOC/DOCX</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span>XLS/XLSX</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/upload">
                    <Button size="sm">Upload Document</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center text-blue-700">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-blue-800 font-bold">
                    4
                  </div>
                  Confirm Transaction
                </h3>
                <div className="ml-10">
                  <p className="text-gray-700 mb-3">
                    After uploading, you'll need to confirm a blockchain transaction to store the document's hash. This
                    creates a permanent, tamper-proof record of your document.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Server className="h-4 w-4" />
                    <span>Small gas fee may apply for Ethereum transactions</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center text-blue-700">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-blue-800 font-bold">
                    5
                  </div>
                  Access and Share
                </h3>
                <div className="ml-10">
                  <p className="text-gray-700 mb-3">
                    Once uploaded, you can access your document from the Documents page. You can also share it with
                    others by providing them with the document's IPFS hash or through the sharing feature.
                  </p>
                  <Link href="/documents">
                    <Button variant="outline" size="sm" className="text-black">
                      View My Documents
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-4 text-red-700">Tips for Using IPFS Storage</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Keep a backup of your IPFS hashes in a secure location</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Add detailed metadata to make documents easier to find and verify
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    For sensitive documents, use the private option to restrict access
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Verify your documents periodically to ensure they remain accessible
                  </span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}