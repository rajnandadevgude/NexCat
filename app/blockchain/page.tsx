"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Database, Shield, Clock, Link2, ExternalLink, Code, Server, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlockchainPage() {
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
            <span className="text-blue-600 font-medium">Blockchain</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Blockchain Technology</h1>
          <p className="text-gray-600">Understanding how blockchain secures your documents</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="overview">What is Blockchain?</TabsTrigger>
            <TabsTrigger value="documents">Blockchain & Documents</TabsTrigger>
            
          </TabsList>

          <TabsContent value="overview" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4 text">What is Blockchain?</h2>
                <p className="text-gray-700 mb-4">
                  Blockchain is a distributed, decentralized, and immutable digital ledger that records transactions
                  across many computers. Once recorded, the data in a block cannot be altered retroactively without
                  altering all subsequent blocks, which requires consensus of the network majority.
                </p>
                <p className="text-gray-700 mb-4">
                  Think of blockchain as a chain of blocks, where each block contains a list of transactions. These
                  blocks are linked using cryptography, creating a secure and transparent record of all transactions.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full md:w-auto flex items-center gap-2 text-black" style={{ borderRadius: '8px' }}>
                      Learn More
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative h-60 md:h-full">
                <Image
                  src="https://images.unsplash.com/photo-1639815189096-f75717eaecfe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Blockchain Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 text-black">Key Features of Blockchain</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-blue-700">Decentralization</h3>
                  <p className="text-sm text-gray-600">
                    No single entity controls the blockchain. It operates on a peer-to-peer network where data is
                    distributed across multiple nodes.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-green-600">Immutability</h3>
                  <p className="text-sm text-gray-600">
                    Once data is recorded on the blockchain, it cannot be altered or deleted without consensus from the
                    network, ensuring data integrity.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2 text-purple-600">Security</h3>
                  <p className="text-sm text-gray-600">
                    Cryptographic techniques secure transactions and control access, making blockchain highly resistant
                    to fraud and tampering.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 text-black">How Blockchain Works</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-blue-100 rounded-full p-4 flex-shrink-0">
                      <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center text-blue-800 font-bold text-2xl">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-500">Transaction Initiation</h3>
                      <p className="text-gray-700">
                        A user initiates a transaction, such as uploading a document. This transaction is broadcast to a
                        network of computers (nodes).
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-green-100 rounded-full p-4 flex-shrink-0">
                      <div className="bg-green-200 rounded-full w-16 h-16 flex items-center justify-center text-green-800 font-bold text-2xl">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-green-700">Verification</h3>
                      <p className="text-gray-700">
                        The network of nodes validates the transaction using known algorithms. For document
                        verification, this involves checking the document's hash and digital signatures.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-purple-100 rounded-full p-4 flex-shrink-0">
                      <div className="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center text-purple-800 font-bold text-2xl">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-purple-700">Block Creation</h3>
                      <p className="text-gray-700">
                        Verified transactions are combined with other transactions to create a new block of data for the
                        ledger.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-orange-100 rounded-full p-4 flex-shrink-0">
                      <div className="bg-orange-200 rounded-full w-16 h-16 flex items-center justify-center text-orange-800 font-bold text-2xl">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-orange-700">Consensus</h3>
                      <p className="text-gray-700">
                        The network reaches consensus on the validity of the block through mechanisms like Proof of Work
                        or Proof of Stake.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="bg-red-100 rounded-full p-4 flex-shrink-0">
                      <div className="bg-red-200 rounded-full w-16 h-16 flex items-center justify-center text-red-800 font-bold text-2xl">
                        5
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-red-700">Chain Addition</h3>
                      <p className="text-gray-700">
                        The new block is added to the existing blockchain, creating a permanent, immutable record of the
                        transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6 text-orange-600">Blockchain for Document Management</h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold mb-4 text-black">Why Use Blockchain for Documents?</h3>
                <p className="text-gray-700 mb-4">
                  Traditional document management systems rely on central authorities to verify document authenticity.
                  Blockchain removes this dependency by creating a decentralized, tamper-proof system for document
                  verification.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Tamper-Proof Records:</strong> Once recorded, document information cannot be altered
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Timestamping:</strong> Precise record of when documents were created or modified
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Link2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Transparent History:</strong> Complete audit trail of document activities
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Server className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Decentralized Storage:</strong> No single point of failure for document records
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}