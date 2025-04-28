"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FileText, Download, Share2, Shield, Clock, User, ChevronRight, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useWeb3Connector } from "@/hooks/use-web3-connector"
import { getDocumentFromIPFS, verifyDocumentOnChain, shareDocument } from "@/lib/ipfs-service"

export default function DocumentPage() {
  const params = useParams()
  const { toast } = useToast()
  const { account, signer } = useWeb3Connector()
  const ipfsHash = params.hash as string

  const [isLoading, setIsLoading] = useState(true)
  const [document, setDocument] = useState<any>(null)
  const [verification, setVerification] = useState<any>(null)
  const [recipientAddress, setRecipientAddress] = useState("")
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setIsLoading(true)

        // Get document metadata from IPFS
        const metadata = await getDocumentFromIPFS(ipfsHash)
        setDocument(metadata)

        // Verify document on blockchain
        const verificationResult = await verifyDocumentOnChain(ipfsHash)
        setVerification(verificationResult)
      } catch (error) {
        console.error("Error loading document:", error)
        toast({
          title: "Error",
          description: "Failed to load document",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (ipfsHash) {
      loadDocument()
    }
  }, [ipfsHash, toast])

  const handleShare = async () => {
    if (!signer || !recipientAddress) return

    try {
      setIsSharing(true)

      // Share document on blockchain
      await shareDocument(signer, ipfsHash, recipientAddress)

      toast({
        title: "Document shared",
        description: `Document has been shared with ${recipientAddress}`,
      })

      setRecipientAddress("")
    } catch (error) {
      console.error("Error sharing document:", error)
      toast({
        title: "Error",
        description: "Failed to share document",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (!document || !verification) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-red-600 p-6 text-white">
              <h1 className="text-2xl font-bold">Document Not Found</h1>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                The document with IPFS hash {ipfsHash} could not be found or has been revoked.
              </p>
              <Link href="/documents">
                <Button>Back to Documents</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/documents" className="hover:text-blue-600">
              Documents
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Document Details</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{document.title}</h1>
                {verification.verified && (
                  <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
                    {document.fileType?.startsWith("image/") ? (
                      <div className="relative w-full h-[300px]">
                        <Image
                          src={`https://ipfs.io/ipfs/${ipfsHash}`}
                          alt={document.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileText className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium">{document.fileName}</h3>
                        <p className="text-gray-500 text-sm">
                          {document.fileType} • {(document.fileSize / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-blue-800 mb-3">Document Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Uploaded</p>
                          <p className="text-xs text-gray-600">{new Date(document.timestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Owner</p>
                          <p className="text-xs text-gray-600 break-all">{verification.owner || "Unknown"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Visibility</p>
                          <p className="text-xs text-gray-600">{document.isPublic ? "Public" : "Private"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Document
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Share Document
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Share Document</DialogTitle>
                          <DialogDescription>
                            Enter the wallet address of the recipient to share this document.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500">Recipient Address</label>
                            <Input
                              value={recipientAddress}
                              onChange={(e) => setRecipientAddress(e.target.value)}
                              placeholder="0x..."
                            />
                          </div>

                          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                            <p>
                              The recipient will be able to view and download this document, but cannot modify or delete
                              it.
                            </p>
                          </div>
                        </div>

                        <Button onClick={handleShare} disabled={isSharing || !recipientAddress} className="w-full">
                          {isSharing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sharing...
                            </>
                          ) : (
                            "Share Document"
                          )}
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <Link href={`/verify?hash=${ipfsHash}`} className="block">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        Verify Document
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Description</h2>
                  <p className="text-gray-700">{document.description || "No description provided."}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-2">Blockchain Verification</h2>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">IPFS Hash (CID)</h3>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm break-all">{ipfsHash}</p>
                          <a
                            href={`https://ipfs.io/ipfs/${ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Blockchain Timestamp</h3>
                        <p className="text-sm">
                          {verification.timestamp ? new Date(verification.timestamp).toLocaleString() : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

