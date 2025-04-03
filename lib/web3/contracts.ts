import { ethers } from "ethers"

// ABI for the Document Registry Smart Contract
export const documentRegistryABI = [
  // Events
  "event DocumentRegistered(address indexed owner, string ipfsHash, uint256 timestamp)",
  "event DocumentShared(address indexed owner, address indexed recipient, string ipfsHash, uint256 timestamp)",
  "event DocumentRevoked(address indexed owner, string ipfsHash, uint256 timestamp)",
  "event ServiceRequested(address indexed requester, string serviceType, uint256 timestamp)",

  // Read functions
  "function verifyDocument(string ipfsHash) view returns (bool verified, uint256 timestamp, address owner)",
  "function getDocumentsByOwner(address owner) view returns (string[] memory)",
  "function getSharedDocuments(address recipient) view returns (string[] memory)",
  "function getDocumentMetadata(string ipfsHash) view returns (string metadata)",
  "function getServiceRequests(address requester) view returns (string[] memory)",

  // Write functions
  "function registerDocument(string ipfsHash, string metadata)",
  "function shareDocument(string ipfsHash, address recipient)",
  "function revokeDocument(string ipfsHash)",
  "function revokeSharing(string ipfsHash, address recipient)",
  "function requestService(string serviceType)",
]

// Sample contract address - would be replaced with actual deployed contract
export const documentRegistryAddress = "0x0000000000000000000000000000000000000000"

// Function to get contract instance
export function getDocumentRegistryContract(provider: ethers.Provider | ethers.Signer) {
  return new ethers.Contract(documentRegistryAddress, documentRegistryABI, provider)
}

// Function to register a document
export async function registerDocument(signer: ethers.Signer, ipfsHash: string, metadata: string) {
  const contract = getDocumentRegistryContract(signer)
  const tx = await contract.registerDocument(ipfsHash, metadata)
  return await tx.wait()
}

// Function to verify a document
export async function verifyDocument(provider: ethers.Provider, ipfsHash: string) {
  const contract = getDocumentRegistryContract(provider)
  return await contract.verifyDocument(ipfsHash)
}

// Function to get user's documents
export async function getUserDocuments(provider: ethers.Provider, userAddress: string) {
  const contract = getDocumentRegistryContract(provider)
  return await contract.getDocumentsByOwner(userAddress)
}

// Function to share a document
export async function shareDocument(signer: ethers.Signer, ipfsHash: string, recipientAddress: string) {
  const contract = getDocumentRegistryContract(signer)
  const tx = await contract.shareDocument(ipfsHash, recipientAddress)
  return await tx.wait()
}

// Function to request a service
export async function requestService(signer: ethers.Signer, serviceType: string) {
  // For demo purposes, we'll simulate the transaction with a delay
  // In a real app, you would call the contract method to request the service
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate a mock transaction hash
  const mockTxHash = `0x${Array.from(Array(64))
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")}`

  return {
    hash: mockTxHash,
  }

  // Real implementation would be:
  // const contract = getDocumentRegistryContract(signer)
  // const tx = await contract.requestService(serviceType)
  // return await tx.wait()
}

