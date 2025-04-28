"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, FileText, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { uploadToIPFS, storeDocumentReference } from "@/lib/ipfs-service"

// Form schema
const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  aadhaarNumber: z.string().length(12, { message: "Aadhaar number must be 12 digits" }),
  mobileNumber: z.string().min(10, { message: "Mobile number must be at least 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),

  // Address Information
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  district: z.string().min(1, { message: "District is required" }),
  taluka: z.string().min(1, { message: "Taluka is required" }),
  village: z.string().min(1, { message: "Village/City is required" }),
  pincode: z.string().length(6, { message: "Pincode must be 6 digits" }),

  // Income Information
  incomeSource: z.enum(["salary", "business", "agriculture", "pension", "other"]),
  annualIncome: z.string().min(1, { message: "Annual income is required" }),
  familyMembers: z.string().min(1, { message: "Number of family members is required" }),
  purpose: z.string().min(5, { message: "Purpose must be at least 5 characters" }),

  // Declaration
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration",
  }),
})

export default function IncomeCertificatePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    aadhaar: null,
    incomeProof: null,
    addressProof: null,
    additional: null,
  })
  const [ipfsHashes, setIpfsHashes] = useState<{ [key: string]: string }>({})
  const [uploadProgress, setUploadProgress] = useState(0)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: "male",
      dateOfBirth: "",
      aadhaarNumber: "",
      mobileNumber: "",
      email: "",
      address: "",
      district: "",
      taluka: "",
      village: "",
      pincode: "",
      incomeSource: "salary",
      annualIncome: "",
      familyMembers: "",
      purpose: "",
      declaration: false,
    },
  })

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles({
        ...uploadedFiles,
        [fileType]: e.target.files[0],
      })
    }
  }

  // Upload files to IPFS
  const uploadFilesToIPFS = async () => {
    const fileTypes = ["aadhaar", "incomeProof", "addressProof", "additional"]
    const hashes: { [key: string]: string } = {}
    let progress = 0

    for (const fileType of fileTypes) {
      const file = uploadedFiles[fileType]
      if (file) {
        try {
          // Upload to IPFS
          const hash = await uploadToIPFS(file)
          hashes[fileType] = hash

          // Update progress
          progress += 25
          setUploadProgress(progress)
        } catch (error) {
          console.error(`Error uploading ${fileType}:`, error)
          throw error
        }
      } else if (fileType !== "additional") {
        // Additional is optional
        throw new Error(`${fileType} file is required`)
      }
    }

    return hashes
  }

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // Check required files
      if (!uploadedFiles.aadhaar || !uploadedFiles.incomeProof || !uploadedFiles.addressProof) {
        throw new Error("Please upload all required documents")
      }

      // Upload files to IPFS
      const hashes = await uploadFilesToIPFS()
      setIpfsHashes(hashes)

      // Prepare metadata
      const metadata = {
        ...values,
        documentHashes: hashes,
        timestamp: new Date().toISOString(),
        status: "Pending",
        type: "Income Certificate",
      }

      // Store reference on blockchain (mock)
      const mainDocHash = hashes.incomeProof
      const { transactionHash } = await storeDocumentReference(mainDocHash, metadata)

      // Generate random application ID
      const randomId = Math.floor(100000 + Math.random() * 900000).toString()
      setApplicationId(`IC-${randomId}`)
      setIsSuccess(true)

      console.log("Form submitted:", values)
      console.log("IPFS Hashes:", hashes)
      console.log("Transaction Hash:", transactionHash)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error instanceof Error ? error.message : "Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle tab navigation
  const nextTab = () => {
    if (activeTab === "personal") {
      // Validate personal fields before proceeding
      form.trigger(["fullName", "gender", "dateOfBirth", "aadhaarNumber", "mobileNumber", "email"]).then((isValid) => {
        if (isValid) setActiveTab("address")
      })
    } else if (activeTab === "address") {
      // Validate address fields before proceeding
      form.trigger(["address", "district", "taluka", "village", "pincode"]).then((isValid) => {
        if (isValid) setActiveTab("income")
      })
    } else if (activeTab === "income") {
      // Validate income fields before proceeding
      form.trigger(["incomeSource", "annualIncome", "familyMembers", "purpose"]).then((isValid) => {
        if (isValid) setActiveTab("documents")
      })
    } else if (activeTab === "documents") {
      setActiveTab("review")
    }
  }

  const prevTab = () => {
    if (activeTab === "address") setActiveTab("personal")
    else if (activeTab === "income") setActiveTab("address")
    else if (activeTab === "documents") setActiveTab("income")
    else if (activeTab === "review") setActiveTab("documents")
  }

  // If application is successfully submitted
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto py-2 px-4">
            <div className="flex items-center text-sm">
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
              <ChevronRight size={12} className="mx-2" />
              <Link href="/services" className="text-blue-600 hover:underline">
                Services
              </Link>
              <ChevronRight size={12} className="mx-2" />
              <span className="text-gray-600">Income Certificate</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-green-50 border-b border-green-100 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-green-800">Application Submitted Successfully</h1>
                    <p className="text-green-700">Your income certificate application has been received</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-green-50 p-4 rounded-md mb-6">
                  <p className="text-green-800 font-medium">Application ID: {applicationId}</p>
                  <p className="text-sm text-green-700 mt-1">Please save this application ID for future reference</p>
                </div>

                <div className="space-y-4">
                  <p  className="text-orange-700" >
                    Your application for an Income Certificate has been successfully submitted. Our team will review
                    your application and supporting documents.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-blue-700">
                      <li>Verification of your documents will be conducted</li>
                      <li>You may be contacted for additional information if required</li>
                      <li>Once approved, you will receive an SMS notification</li>
                      <li>You can download your blockchain-verified certificate from your dashboard</li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-md">
                    <h3 className="font-medium text-yellow-800 mb-2">IPFS Document Storage:</h3>
                    <p className="text-sm text-yellow-700 mb-2">
                      Your documents have been securely stored on IPFS with the following hashes:
                    </p>
                    <div className="space-y-1 text-xs font-mono">
                      {Object.entries(ipfsHashes).map(([key, hash]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-gray-600">{key}:</span>
                          <span className="text-blue-600 break-all">{hash}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    The processing typically takes 7 working days. You can check the status of your application using
                    your Application ID.
                  </p>
                </div>
              </div>
              <div className="flex justify-between border-t p-6">
                <Link href="/services">
                  <Button  className="text-gray-700"  variant="outline">Back to Services</Button>
                </Link>
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-2 px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <ChevronRight size={12} className="mx-2" />
            <Link href="/services" className="text-blue-600 hover:underline">
              Services
            </Link>
            <ChevronRight size={12} className="mx-2" />
            <span className="text-gray-600">Income Certificate</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-orange-500 text-white p-4">
                <h1 className="text-xl font-bold">Income Certificate Application</h1>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <Image
                      src="/income_certi.jpg"
                      alt="Income Certificate"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-lg font-semibold mb-2">About this service</h2>
                    <p className="text-gray-700 mb-4">
                      This online service allows citizens to apply for Income Certificate without visiting government
                      offices. The certificate will be digitally signed, stored on IPFS, and verified on blockchain.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                          1
                        </div>
                        <div>
                          <h3 className="text-sm text-black">Application</h3>
                          <p className="text-sm text-gray-600">
                            Fill the online application form and submit required documents
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                          2
                        </div>
                        <div>
                          <h3 className="text-sm text-black">IPFS Storage</h3>
                          <p className="text-sm text-gray-600">
                            Your documents are securely stored on IPFS with blockchain verification
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                          3
                        </div>
                        <div>
                          <h3 className="text-sm text-black">Certificate Issuance</h3>
                          <p className="text-sm text-gray-600">Certificate will be issued and digitally signed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-lg font-semibold mb-4 text-black">Application Form</h2>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-5 mb-8">
                          <TabsTrigger value="personal">Personal</TabsTrigger>
                          <TabsTrigger value="address">Address</TabsTrigger>
                          <TabsTrigger value="income">Income</TabsTrigger>
                          <TabsTrigger value="documents">Documents</TabsTrigger>
                          <TabsTrigger value="review">Review</TabsTrigger>
                        </TabsList>

                        {/* Personal Information Tab */}
                        <TabsContent value="personal">
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-black">Full Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        className="text-gray-700" 
                                        placeholder="Enter your full name" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />


                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-black">Gender</FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-4"
                                      >
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem value="male" />
                                          </FormControl>
                                          <FormLabel className="text-gray-700">Male</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem value="female" />
                                          </FormControl>
                                          <FormLabel className="text-gray-700">Female</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem value="other" />
                                          </FormControl>
                                          <FormLabel className="text-gray-700">Other</FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Date of Birth</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"  type="date"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="aadhaarNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Aadhaar Number</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"  placeholder="12-digit Aadhaar number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="mobileNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Mobile Number</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"  placeholder="Your mobile number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Email Address</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"  placeholder="Your email address"  className="text-gray-700" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end mt-8">
                            <Button type="button" onClick={nextTab}>
                              Next: Address Information
                            </Button>
                          </div>
                        </TabsContent>

                        {/* Address Information Tab */}
                        <TabsContent value="address">
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">Full Address</FormLabel>
                                  <FormControl>
                                    <Textarea  className="text-gray-700" placeholder="Enter your full address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">District</FormLabel>
                                    <Select className="text-gray-700"  onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue className="text-gray-700"  placeholder="Select district" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="mumbai">Mumbai</SelectItem>
                                        <SelectItem value="pune">Pune</SelectItem>
                                        <SelectItem value="nagpur">Nagpur</SelectItem>
                                        <SelectItem value="thane">Thane</SelectItem>
                                        <SelectItem value="nashik">Nashik</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="taluka"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Taluka</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700" placeholder="Enter taluka" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="village"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Village/City</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"  placeholder="Enter village or city" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Pincode</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700" placeholder="6-digit pincode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between mt-8">
                            <Button className="text-gray-700" type="button" variant="outline" onClick={prevTab}>
                              Back: Personal Information
                            </Button>
                            <Button type="button" onClick={nextTab}>
                              Next: Income Information
                            </Button>
                          </div>
                        </TabsContent>

                        {/* Income Information Tab */}
                        <TabsContent value="income">
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="incomeSource"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Primary Source of Income</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select income source" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="salary">Salary/Wages</SelectItem>
                                        <SelectItem value="business">Business/Self-employed</SelectItem>
                                        <SelectItem value="agriculture">Agriculture</SelectItem>
                                        <SelectItem value="pension">Pension</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="annualIncome"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700" >Annual Income (in ₹)</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700"placeholder="Enter annual income" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="familyMembers"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Number of Family Members</FormLabel>
                                    <FormControl>
                                      <Input className="text-gray-700" type="number" min="1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="purpose"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-gray-700">Purpose of Certificate</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue className="text-gray-700"placeholder="Select purpose" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="education">Educational Scholarship</SelectItem>
                                        <SelectItem value="government">Government Scheme</SelectItem>
                                        <SelectItem value="loan">Bank Loan</SelectItem>
                                        <SelectItem value="job">Job Application</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between mt-8">
                            <Button className="text-gray-700"type="button" variant="outline" onClick={prevTab}>
                              Back: Address Information
                            </Button>
                            <Button type="button" onClick={nextTab}>
                              Next: Upload Documents
                            </Button>
                          </div>
                        </TabsContent>

                        {/* Documents Upload Tab */}
                        <TabsContent value="documents">
                          <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-md mb-6">
                              <div className="flex items-start gap-2">
                                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm text-blue-700 font-medium">IPFS Document Storage</p>
                                  <p className="text-sm text-blue-700">
                                    Your documents will be securely stored on IPFS (InterPlanetary File System) and
                                    verified on blockchain for tamper-proof storage and verification.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <h3 className="text-gray-700">Aadhaar Card</h3>
                                  </div>
                                  <span className="text-red-500 text-xs font-medium">Required</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Upload front and back sides of your Aadhaar card
                                </p>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    id="aadhaar"
                                    className="text-sm"
                                    onChange={(e) => handleFileChange(e, "aadhaar")}
                                  />
                                </div>
                                {uploadedFiles.aadhaar && (
                                  <p className="text-xs text-green-600 mt-2">
                                    File selected: {uploadedFiles.aadhaar.name}
                                  </p>
                                )}
                              </div>

                              <div className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <h3 className="text-gray-700">Income Proof</h3>
                                  </div>
                                  <span className="text-red-500 text-xs font-medium">Required</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Salary slips, IT returns, or business income proof
                                </p>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    id="incomeProof"
                                    className="text-sm"
                                    onChange={(e) => handleFileChange(e, "incomeProof")}
                                  />
                                </div>
                                {uploadedFiles.incomeProof && (
                                  <p className="text-xs text-green-600 mt-2">
                                    File selected: {uploadedFiles.incomeProof.name}
                                  </p>
                                )}
                              </div>

                              <div className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <h3 className="text-gray-700">Address Proof</h3>
                                  </div>
                                  <span className="text-red-500 text-xs font-medium">Required</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Utility bill, rent agreement, or property tax receipt
                                </p>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    id="addressProof"
                                    className="text-sm"
                                    onChange={(e) => handleFileChange(e, "addressProof")}
                                  />
                                </div>
                                {uploadedFiles.addressProof && (
                                  <p className="text-xs text-green-600 mt-2">
                                    File selected: {uploadedFiles.addressProof.name}
                                  </p>
                                )}
                              </div>

                              <div className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <h3 className="text-gray-700" >Additional Documents</h3>
                                  </div>
                                  <span className="text-gray-500 text-xs font-medium">Optional</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Any other supporting documents</p>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    id="additional"
                                    className="text-sm"
                                    onChange={(e) => handleFileChange(e, "additional")}
                                  />
                                </div>
                                {uploadedFiles.additional && (
                                  <p className="text-xs text-green-600 mt-2">
                                    File selected: {uploadedFiles.additional.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between mt-8">
                            <Button  className="text-gray-700" type="button" variant="outline" onClick={prevTab}>
                              Back: Income Information
                            </Button>
                            <Button type="button" onClick={nextTab}>
                              Next: Review Application
                            </Button>
                          </div>
                        </TabsContent>

                        {/* Review Tab */}
                        <TabsContent value="review">
                          <div className="space-y-6">
                            <div className="bg-yellow-50 p-4 rounded-md mb-6">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <p className="text-sm text-yellow-800">
                                  Please review your application carefully before submission. Once submitted, you cannot
                                  edit the information.
                                </p>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-50 px-4 py-2 font-medium border-b text-gray-700">Personal Information</div>
                                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500">Full Name</p>
                                    <p  className="text-gray-900">{form.getValues("fullName")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Gender</p>
                                    <p className="text-gray-900">{form.getValues("gender")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Date of Birth</p>
                                    <p className="text-gray-900">{form.getValues("dateOfBirth")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Aadhaar Number</p>
                                    <p className="text-gray-900">{form.getValues("aadhaarNumber")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Mobile Number</p>
                                    <p className="text-gray-900">{form.getValues("mobileNumber")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="text-gray-900">{form.getValues("email")}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-50 px-4 py-2 font-medium border-b text-gray-600">Address Information</div>
                                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                                  <div className="col-span-2">
                                    <p className="text-gray-500">Address</p>
                                    <p className="text-gray-900">{form.getValues("address")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">District</p>
                                    <p className="text-gray-900">{form.getValues("district")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Taluka</p>
                                    <p className="text-gray-900">{form.getValues("taluka")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Village/City</p>
                                    <p className="text-gray-900">{form.getValues("village")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Pincode</p>
                                    <p className="text-gray-900">{form.getValues("pincode")}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-50 px-4 py-2 font-medium border-b text-gray-600">Income Information</div>
                                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500">Income Source</p>
                                    <p className="text-gray-900">{form.getValues("incomeSource")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Annual Income</p>
                                    <p className="text-gray-900">₹{form.getValues("annualIncome")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Family Members</p>
                                    <p className="text-gray-900">{form.getValues("familyMembers")}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Purpose</p>
                                    <p className="text-gray-900">{form.getValues("purpose")}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border rounded-md overflow-hidden">
                                <div className="bg-gray-50 px-4 py-2 font-medium border-b text-gray-600 text-gray-600">Uploaded Documents</div>
                                <div className="p-4 space-y-2 text-sm">
                                  {uploadedFiles.aadhaar && (
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-600" />
                                      <p>Aadhaar Card: {uploadedFiles.aadhaar.name}</p>
                                    </div>
                                  )}
                                  {uploadedFiles.incomeProof && (
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-600" />
                                      <p>Income Proof: {uploadedFiles.incomeProof.name}</p>
                                    </div>
                                  )}
                                  {uploadedFiles.addressProof && (
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-600" />
                                      <p>Address Proof: {uploadedFiles.addressProof.name}</p>
                                    </div>
                                  )}
                                  {uploadedFiles.additional && (
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-600" />
                                      <p>Additional Document: {uploadedFiles.additional.name}</p>
                                    </div>
                                  )}

                                  {(!uploadedFiles.aadhaar ||
                                    !uploadedFiles.incomeProof ||
                                    !uploadedFiles.addressProof) && (
                                    <div className="text-red-500">
                                      Please upload all required documents before submission
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <FormField
                              control={form.control}
                              name="declaration"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel  className="text-gray-600">
                                      I hereby declare that all the information provided by me is true and correct to
                                      the best of my knowledge.
                                    </FormLabel>
                                    <FormDescription  className="text-red-500">
                                      Any false information may lead to rejection of application and legal action.
                                    </FormDescription>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-between mt-8">
                            <Button  className="text-gray-900" type="button" variant="outline" onClick={prevTab}>
                              Back: Upload Documents
                            </Button>
                            <Button
                              type="submit"
                              disabled={
                                isSubmitting ||
                                !uploadedFiles.aadhaar ||
                                !uploadedFiles.incomeProof ||
                                !uploadedFiles.addressProof
                              }
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  {uploadProgress < 100 ? `Uploading to IPFS (${uploadProgress}%)` : "Processing..."}
                                </>
                              ) : (
                                "Submit Application"
                              )}
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">Required Documents</h2>
              </div>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Aadhaar Card (front and back)</li>
                  <li>Income Proof (salary slips, IT returns, etc.)</li>
                  <li>Address Proof (utility bill, rent agreement)</li>
                  <li>Passport Size Photograph (optional)</li>
                  <li>Bank Statement (optional)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">Processing Time</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700">1 working days from the date of submission</p>
                <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm">
                  Your application will be processed on the blockchain for tamper-proof verification
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">IPFS Storage Benefits</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Tamper-proof:</strong> Documents cannot be altered once stored
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Decentralized:</strong> No single point of failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Permanent:</strong> Documents remain accessible indefinitely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Verifiable:</strong> Blockchain verification ensures authenticity
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">Fees</h2>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-gray-700">Application Fee</span>
                  <span className="font-medium">₹100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Processing Fee</span>
                  <span className="font-medium">₹50</span>
                </div>
                <div className="mt-3 border-t pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>₹150</span>
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

