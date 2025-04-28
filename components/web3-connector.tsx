"use client"

import { useWeb3Connector } from "@/hooks/use-web3-connector"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

export function Web3Connector() {
  const { account, connect, disconnect, isConnecting, error } = useWeb3Connector()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg font-medium" style={{ borderRadius: '8px' }}>
            {account ? "Wallet Connected" : "Connect Blockchain"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maharashtra Government Blockchain Connection</DialogTitle>
            <DialogDescription>
              Connect your wallet to access decentralized government services with enhanced security and transparency
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {account ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h4 className="font-medium text-green-800 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Wallet Connected
                </h4>
                <p className="text-sm text-green-700 break-all mt-1">{account}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                  <Image src="/blockchain-badge.png" alt="Verified" width={24} height={24} />
                  Connected to Maharashtra Government Blockchain
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={disconnect}>
                  Disconnect
                </Button>
                <Button>Access Services</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">Benefits of Blockchain-Enabled Services</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-xs">✓</span>
                    Tamper-proof document verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-xs">✓</span>
                    Transparent processing of applications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-xs">✓</span>
                    Enhanced security for your data
                  </li>
                </ul>
              </div>

              <Button onClick={connect} disabled={isConnecting} className="w-full">
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Image src="/metamask.png" alt="MetaMask" width={24} height={24} className="mr-2" />
                    Connect with MetaMask
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

