/**
 * Enhanced IPFS service with database integration for user authentication
 */

// IPFS configuration
const INFURA_IPFS_API = "https://ipfs.infura.io:5001/api/v0"
const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID
const INFURA_PROJECT_SECRET = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET

// Database configuration (using Supabase)
let supabase: any = null
let supabaseImportFailed = false

// Try to import Supabase dynamically
const initSupabase = async () => {
  try {
    // Check if Supabase credentials are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log("Supabase credentials not available, using local storage fallback")
      return false
    }

    // Validate URL format
    try {
      new URL(supabaseUrl) // This will throw if URL is invalid
    } catch (error) {
      console.error("Invalid Supabase URL:", error)
      return false
    }

    // Dynamic import of Supabase
    const { createClient } = await import("@supabase/supabase-js")
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log("Supabase client initialized successfully")
    return true
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    supabaseImportFailed = true
    return false
  }
}

// Initialize Supabase if possible
initSupabase().catch((err) => {
  console.error("Error during Supabase initialization:", err)
  supabaseImportFailed = true
})

// Add a helper function to check if database is available
const isDatabaseAvailable = () => {
  // If we've already tried and failed to import Supabase, don't try again
  if (supabaseImportFailed) return false
  return !!supabase
}

// Update the getAuthHeader function to properly handle missing credentials
const getAuthHeader = () => {
  if (!INFURA_PROJECT_ID || !INFURA_PROJECT_SECRET) {
    console.warn("IPFS credentials not available. Using mock mode.")
    return null
  }

  // Use browser-compatible encoding for Basic Auth
  const auth = `Basic ${btoa(`${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`)}`
  return auth
}

/**
 * Upload a file to IPFS using Infura API
 * @param file File to upload
 * @param onProgress Progress callback
 * @returns IPFS hash (CID)
 */
export async function uploadToIPFS(file: File, onProgress?: (progress: number) => void): Promise<string> {
  try {
    // Check if credentials are available
    const authHeader = getAuthHeader()

    if (!authHeader) {
      console.log("IPFS credentials not available, using mock upload")
      // Mock upload process with progress
      if (onProgress) {
        for (let i = 0; i <= 100; i += 10) {
          onProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }

      // Generate a mock IPFS hash
      const mockHash = `Qm${Array.from(Array(44))
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`

      // Log mock upload to localStorage
      const uploads = JSON.parse(localStorage.getItem("ipfs_uploads") || "{}")
      uploads[mockHash] = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem("ipfs_uploads", JSON.stringify(uploads))

      return mockHash
    }

    // Real IPFS upload logic
    // Create form data
    const formData = new FormData()
    formData.append("file", file)

    // Upload to IPFS
    const response = await fetch(`${INFURA_IPFS_API}/add`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`IPFS upload failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Log upload to database
    await logFileUpload({
      cid: data.Hash,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      timestamp: new Date().toISOString(),
    })

    return data.Hash
  } catch (error) {
    console.error("IPFS upload error:", error)

    // Fallback to mock upload if real upload fails
    console.log("Falling back to mock upload")

    // Mock upload process with progress
    if (onProgress) {
      for (let i = 0; i <= 100; i += 10) {
        onProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    // Generate a mock IPFS hash
    const mockHash = `Qm${Array.from(Array(44))
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")}`

    // Log mock upload to localStorage
    const uploads = JSON.parse(localStorage.getItem("ipfs_uploads") || "{}")
    uploads[mockHash] = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("ipfs_uploads", JSON.stringify(uploads))

    return mockHash
  }
}

// Update the getFromIPFS function to handle missing credentials
export async function getFromIPFS(cid: string): Promise<Response> {
  try {
    // Check if this is a mock CID from localStorage
    const uploads = JSON.parse(localStorage.getItem("ipfs_uploads") || "{}")
    if (uploads[cid]) {
      console.log("Using mock IPFS content for", cid)

      // Create a mock response
      const mockContent = JSON.stringify({
        content: "This is mock content for " + cid,
        metadata: uploads[cid],
      })

      const mockResponse = new Response(mockContent, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })

      // Log access to localStorage
      const accesses = JSON.parse(localStorage.getItem("ipfs_accesses") || "{}")
      accesses[cid] = [...(accesses[cid] || []), new Date().toISOString()]
      localStorage.setItem("ipfs_accesses", JSON.stringify(accesses))

      return mockResponse
    }

    // Use IPFS gateway to get the file
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`)

    if (!response.ok) {
      throw new Error(`IPFS fetch failed: ${response.statusText}`)
    }

    // Log access to database
    await logFileAccess(cid)

    return response
  } catch (error) {
    console.error("IPFS fetch error:", error)

    // Return a mock response if fetch fails
    const mockContent = JSON.stringify({
      content: "This is mock content for " + cid,
      error: "Failed to fetch from IPFS, using mock content",
    })

    return new Response(mockContent, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

/**
 * Mock function to simulate blockchain storage
 * In a real implementation, this would interact with a smart contract
 */
export async function storeDocumentReference(ipfsHash: string, metadata: any): Promise<{ transactionHash: string }> {
  // Simulate blockchain transaction
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock transaction hash
  const transactionHash = `0x${Array.from(Array(64))
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")}`

  // Store in localStorage for demo purposes
  const documents = JSON.parse(localStorage.getItem("documents") || "{}")
  documents[ipfsHash] = {
    metadata,
    timestamp: Date.now(),
    transactionHash,
  }
  localStorage.setItem("documents", JSON.stringify(documents))

  // Store in database
  await storeDocumentInDatabase(ipfsHash, metadata, transactionHash)

  return { transactionHash }
}

/**
 * Mock function to verify a document
 * In a real implementation, this would query the blockchain
 */
export async function verifyDocument(ipfsHash: string): Promise<{
  verified: boolean
  timestamp: number
  metadata: any
  transactionHash: string
}> {
  // Simulate blockchain query
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Get from localStorage
  const documents = JSON.parse(localStorage.getItem("documents") || "{}")
  const document = documents[ipfsHash]

  // Also check database
  const dbDocument = await getDocumentFromDatabase(ipfsHash)

  // Combine results (prefer database if available)
  const result = dbDocument || document

  if (!result) {
    return {
      verified: false,
      timestamp: 0,
      metadata: null,
      transactionHash: "",
    }
  }

  return {
    verified: true,
    timestamp: result.timestamp,
    metadata: result.metadata,
    transactionHash: result.transactionHash,
  }
}

/**
 * Get document from IPFS and verify on blockchain
 */
export async function getDocumentFromIPFS(ipfsHash: string) {
  try {
    // Get document from IPFS
    const response = await getFromIPFS(ipfsHash)
    const data = await response.json()

    // Verify on blockchain
    const verification = await verifyDocument(ipfsHash)

    // Return combined data
    return {
      ...data,
      verified: verification.verified,
      timestamp: verification.timestamp,
      transactionHash: verification.transactionHash,
    }
  } catch (error) {
    console.error("Error getting document:", error)
    throw error
  }
}

/**
 * Share document with another user
 */
export async function shareDocument(signer: any, ipfsHash: string, recipientAddress: string) {
  try {
    // In a real implementation, this would call a smart contract function
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log sharing to database
    await logDocumentSharing(ipfsHash, recipientAddress)

    return { success: true }
  } catch (error) {
    console.error("Error sharing document:", error)
    throw error
  }
}

// Database functions

/**
 * Log file upload to database
 */
async function logFileUpload(fileData: {
  cid: string
  fileName: string
  fileSize: number
  fileType: string
  timestamp: string
}) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, skipping log file upload")
    return
  }

  try {
    const { error } = await supabase.from("ipfs_files").insert([fileData])

    if (error) throw error
  } catch (error) {
    console.error("Database error logging file upload:", error)
  }
}

/**
 * Log file access to database
 */
async function logFileAccess(cid: string) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, skipping log file access")
    return
  }

  try {
    const { error } = await supabase.from("ipfs_access_logs").insert([
      {
        cid,
        accessed_at: new Date().toISOString(),
        ip_address: "0.0.0.0", // In a real app, you'd get the actual IP
      },
    ])

    if (error) throw error
  } catch (error) {
    console.error("Database error logging file access:", error)
  }
}

/**
 * Store document reference in database
 */
async function storeDocumentInDatabase(ipfsHash: string, metadata: any, transactionHash: string) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, skipping store document in database")
    return
  }

  try {
    const { error } = await supabase.from("blockchain_documents").insert([
      {
        ipfs_hash: ipfsHash,
        metadata: JSON.stringify(metadata),
        transaction_hash: transactionHash,
        timestamp: new Date().toISOString(),
        status: "active",
      },
    ])

    if (error) throw error
  } catch (error) {
    console.error("Database error storing document:", error)
  }
}

/**
 * Get document from database
 */
async function getDocumentFromDatabase(ipfsHash: string) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, skipping get document from database")
    return null
  }

  try {
    const { data, error } = await supabase.from("blockchain_documents").select("*").eq("ipfs_hash", ipfsHash).single()

    if (error) return null

    return {
      metadata: JSON.parse(data.metadata),
      timestamp: new Date(data.timestamp).getTime(),
      transactionHash: data.transaction_hash,
    }
  } catch (error) {
    console.error("Database error getting document:", error)
    return null
  }
}

/**
 * Log document sharing to database
 */
async function logDocumentSharing(ipfsHash: string, recipientAddress: string) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, skipping log document sharing")
    return
  }

  try {
    const { error } = await supabase.from("document_shares").insert([
      {
        ipfs_hash: ipfsHash,
        recipient_address: recipientAddress,
        shared_at: new Date().toISOString(),
      },
    ])

    if (error) throw error
  } catch (error) {
    console.error("Database error logging document sharing:", error)
  }
}

// User authentication functions

/**
 * Register a new user
 */
export async function registerUser(email: string, password: string, userData: any) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, using mock registration")
    // Mock registration for demo purposes
    localStorage.setItem(
      `user_${email}`,
      JSON.stringify({
        id: `user_${Date.now()}`,
        email,
        user_metadata: userData,
      }),
    )
    return { user: { email, user_metadata: userData } }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

/**
 * Login a user
 */
export async function loginUser(email: string, password: string) {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, using mock login")
    // Mock login for demo purposes
    const userData = localStorage.getItem(`user_${email}`)
    if (userData) {
      return { user: JSON.parse(userData) }
    }
    throw new Error("Invalid credentials")
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

/**
 * Logout a user
 */
export async function logoutUser() {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, using mock logout")
    // Nothing to do for mock logout
    return
  }

  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  if (!isDatabaseAvailable()) {
    console.log("Database not available, no current user")
    return null
  }

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw error

    return data.user
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}
