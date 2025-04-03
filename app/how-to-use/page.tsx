"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Upload, FileText, Shield, User, Settings, Search, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowToUsePage() {
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
            <span className="text-blue-600 font-medium">How To Use</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-700">How To Use NexCat</h1>
          <p className="text-gray-600">A comprehensive guide to using our blockchain document management platform</p>
        </div>

        <Tabs defaultValue="getting-started">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
        
            <TabsTrigger value="verification">Verification</TabsTrigger>
            
          </TabsList>

          <TabsContent value="getting-started" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Getting Started with NexCat</h2>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/account-creation.svg"
                        alt="Create Account"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500">1. Create an Account</h3>
                    <p className="text-gray-700 mb-4">
                      Start by creating a NexCat account. This will allow you to securely store, manage, and verify
                      your documents using blockchain technology.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span className="text-gray-700">Click on the "Register" button in the top navigation bar</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span className="text-gray-700">Fill in your details and create a strong password</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span className="text-gray-700">
                          Verify your email address by clicking the link sent to your inbox
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="/register">
                        <Button size="sm">Create Account</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/wallet-connection.svg"
                        alt="Connect Wallet"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500">2. Connect Your Wallet</h3>
                    <p className="text-gray-700 mb-4">
                      Connect your Ethereum wallet (like MetaMask) to enable blockchain verification for your documents.
                      This step is essential for creating tamper-proof records.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span className="text-gray-700">Click on "Connect Blockchain" in the bottom right corner</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span className="text-gray-700">Select MetaMask or another compatible wallet</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span className="text-gray-700">Approve the connection request in your wallet</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                      <strong>Note:</strong> If you don't have a wallet yet, we recommend installing MetaMask, which is
                      available as a browser extension.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/dashboard-navigation.svg"
                        alt="Navigate Dashboard"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500">3. Explore Your Dashboard</h3>
                    <p className="text-gray-700 mb-4">
                      After logging in, you'll be taken to your dashboard. This is your central hub for managing
                      documents, checking verification status, and accessing all NexCat features.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span className="text-gray-700">View your document statistics and recent activity</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span className="text-gray-700">
                          Access quick links to upload, verify, and manage documents
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span className="text-gray-700">
                          Check your blockchain verification status and storage usage
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="/dashboard">
                        <Button size="sm" variant="outline" className="text-black">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold mb-4 text-gray-700">Ready to Get Started?</h3>
                <p className="text-gray-700 mb-4">
                  Now that you understand the basics, you're ready to start using NexCat for secure document
                  management. Follow the links below to begin:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/register">
                    <Button className="w-full">Create Account</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full text-black" >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="document-management" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Document Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      Uploading Documents
                    </CardTitle>
                    <CardDescription>Store documents securely on IPFS</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">
                        Upload your documents to store them securely on IPFS with blockchain verification:
                      </p>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            1
                          </div>
                          <span className="text-gray-700">
                            Navigate to the Upload page from your dashboard or the navigation menu
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            2
                          </div>
                          <span className="text-gray-700">
                            Select your document file by clicking the upload area or dragging and dropping
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            3
                          </div>
                          <span className="text-gray-700">Add title, description, and select document type</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            4
                          </div>
                          <span className="text-gray-700">Choose privacy settings (public or private)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            5
                          </div>
                          <span className="text-gray-700">
                            Click "Upload to IPFS" and confirm the blockchain transaction
                          </span>
                        </li>
                      </ol>
                      <div className="mt-4">
                        <Link href="/upload">
                          <Button size="sm">Upload Document</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Managing Documents
                    </CardTitle>
                    <CardDescription>Organize and access your documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">
                        Access and manage all your documents from the Documents page:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">View all your documents in list or grid view</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Search and filter documents by type, status, or date</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">
                            View document details, including IPFS hash and blockchain verification
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">
                            Download, share, or verify documents with a single click
                          </span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <Link href="/documents">
                          <Button size="sm" variant="outline">
                            View Documents
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-blue-600" />
                      Sharing Documents
                    </CardTitle>
                    <CardDescription>Share documents securely with others</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Share your documents securely with specific recipients:</p>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            1
                          </div>
                          <span className="text-gray-700">Navigate to the document details page</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            2
                          </div>
                          <span className="text-gray-700">Click the "Share" button</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            3
                          </div>
                          <span className="text-gray-700">Enter the recipient's wallet address or email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            4
                          </div>
                          <span className="text-gray-700">Set permissions and expiration date (optional)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            5
                          </div>
                          <span className="text-gray-700">Confirm the sharing transaction on the blockchain</span>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-blue-600" />
                      Downloading Documents
                    </CardTitle>
                    <CardDescription>Access your stored documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Download your documents from IPFS storage:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Navigate to the Documents page or Dashboard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Find the document you want to download</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">
                            Click the download button or open the document details and click download
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">
                            The document will be decrypted and downloaded to your device
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Document Verification</h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold mb-4 text-blue-500">Understanding Blockchain Verification</h3>
                <p className="text-gray-700 mb-4">
                NexCat uses blockchain technology to create tamper-proof records of your documents. When a document
                  is uploaded, its cryptographic hash is stored on the blockchain, creating an immutable timestamp and
                  proof of existence.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Shield className="h-4 w-4" />
                  <span>
                    Blockchain verification ensures that documents haven't been modified since they were uploaded
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/verification-process.svg"
                        alt="Verify Document"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500">Verifying a Document by Hash</h3>
                    <p className="text-gray-700 mb-4">
                      If you have a document's IPFS hash (CID), you can verify its authenticity on the blockchain:
                    </p>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span className="text-gray-700">Navigate to the Verify page</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span className="text-gray-700">Select the "Verify by IPFS Hash" tab</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span className="text-gray-700">Enter the document's IPFS hash (CID)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          4
                        </div>
                        <span className="text-gray-700">Click "Verify" to check the document's blockchain record</span>
                      </li>
                    </ol>
                    <div className="mt-4">
                      <Link href="/verify">
                        <Button size="sm">Verify Document</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/file-verification.svg"
                        alt="Verify by File"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500
                    ">Verifying a Document by File Upload</h3>
                    <p className="text-gray-700 mb-4">You can also verify a document by uploading the file directly:</p>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span className="text-gray-700">Navigate to the Verify page</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span className="text-gray-700">Select the "Verify by File Upload" tab</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span className="text-gray-700">Upload the document file you want to verify</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          4
                        </div>
                        <span className="text-gray-700">
                          Click "Verify Document" to check if it matches any records on the blockchain
                        </span>
                      </li>
                    </ol>
                    <div className="mt-4 bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                      <strong>Note:</strong> The file must be identical to the original uploaded file for verification
                      to succeed. Any changes, even minor ones, will result in a different hash.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/images/illustrations/verification-certificate.svg"
                        alt="Verification Certificate"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-500">Understanding Verification Results</h3>
                    <p className="text-gray-700 mb-4">
                      After verification, you'll see detailed results about the document's blockchain record:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">
                          <strong>Verified Status:</strong> Whether the document was found on the blockchain
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">
                          <strong>Timestamp:</strong> When the document was registered on the blockchain
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">
                          <strong>Owner:</strong> The wallet address that registered the document
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">
                          <strong>Metadata:</strong> Additional information about the document
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">
                        You can download a verification certificate for verified documents, which serves as proof of the
                        document's blockchain registration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="p-6 bg-white rounded-md shadow-sm mt-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Advanced Features</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Account Management
                    </CardTitle>
                    <CardDescription>Manage your profile and security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Access and update your account settings:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Update your profile information and preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Change your password and security settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Manage connected wallets and authentication methods</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">View account activity and login history</span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <Link href="/dashboard/profile">
                          <Button size="sm" variant="outline">
                            Manage Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription>Customize your NexCat experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Configure advanced settings for your account:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Set default privacy settings for uploaded documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Configure notification preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Manage API keys for programmatic access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Set up two-factor authentication for enhanced security</span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <Link href="/dashboard/settings">
                          <Button size="sm" variant="outline">
                            Advanced Settings
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-blue-600" />
                      Advanced Search
                    </CardTitle>
                    <CardDescription>Find documents quickly and efficiently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Use advanced search features to find your documents:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Search by document content (for supported file types)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Filter by multiple criteria (date, type, status, etc.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Save and reuse search queries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Export search results to CSV or PDF</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Blockchain Explorer
                    </CardTitle>
                    <CardDescription>View blockchain transactions and records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Explore the blockchain records for your documents:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">View transaction details for document registrations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Track document verification history</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Monitor gas costs and transaction status</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-gray-700">Link directly to public blockchain explorers</span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <Link href="/blockchain">
                          <Button size="sm" variant="outline">
                            Blockchain Explorer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

