import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ServiceForm } from "@/components/service-form"

export default function ServicePage({ params }: { params: { slug: string } }) {
  // In a real app, we would fetch the service details from an API
  const serviceTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

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
            <span className="text-gray-600">{serviceTitle}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-orange-500 text-white p-4">
                <h1 className="text-xl font-bold">{serviceTitle}</h1>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1679496825832-3fbe8974055b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY3fHx8ZW58MHx8fHx8"
                      alt={serviceTitle}
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-lg font-semibold mb-2 text-black">About this service</h2>
                    <p className="text-gray-700 mb-4">
                      This online service allows citizens to apply for {serviceTitle} without visiting government
                      offices. The certificate will be digitally signed and can be downloaded from your account after
                      approval.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700">Application</h3>
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
                          <h3 className="font-medium text-black">Verification</h3>
                          <p className="text-sm text-gray-600">
                            Your application will be verified by the concerned department
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium text-black">Certificate Issuance</h3>
                          <p className="text-sm text-gray-600">Certificate will be issued and digitally signed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-lg font-semibold mb-4 text-black">Application Form</h2>
                  <ServiceForm serviceType={serviceTitle} />
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
                  <li>Identity Proof (Aadhaar/PAN/Voter ID)</li>
                  <li>Address Proof</li>
                  <li>Passport Size Photograph</li>
                  <li>Previous Certificates (if applicable)</li>
                  <li>Supporting Evidence Documents</li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">Processing Time</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700">2 working days from the date of submission</p>
                <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm">
                  Your application will be processed on the blockchain for tamper-proof verification
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <h2 className="font-semibold">Fees</h2>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-gray-700">Application Fee</span>
                  <span className="font-medium text-sm text-gray-500">₹100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Processing Fee</span>
                  <span className="font-medium text-sm text-gray-500">₹50</span>
                </div>
                <div className="mt-3 border-t pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>₹150</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-100 p-4 rounded-md">
              <h3 className="font-semibold text-orange-800">Help & Support</h3>
              <p className="text-sm text-orange-700 mt-2">
                Need assistance with your application? Contact our helpdesk:
              </p>
              <div className="mt-2 text-sm">
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <span>📞</span>
                  <span>1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <span>✉️</span>
                  <span >help@maharashtra.gov.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

