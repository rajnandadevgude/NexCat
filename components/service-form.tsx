"use client"

import { useState } from "react"
import { useWeb3Connector } from "@/hooks/use-web3-connector"
import { requestService } from "@/lib/web3/contracts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Upload } from "lucide-react"

interface ServiceFormProps {
  serviceType: string
}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  district: z.string({
    required_error: "Please select a district.",
  }),
  purpose: z.string().min(5, {
    message: "Purpose must be at least 5 characters.",
  }),
})

export function ServiceForm({ serviceType }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const { account, signer } = useWeb3Connector()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      purpose: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account || !signer) {
      alert("Please connect your wallet first")
      return
    }

    setIsSubmitting(true)

    try {
      // Call the blockchain request service function
      const receipt = await requestService(signer, serviceType)
      setTransactionHash(receipt.hash)
      setIsSuccess(true)

      // In a real application, we would also send the form data to our backend
      console.log("Form submitted:", values)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="text-green-800 font-medium text-lg">Application Submitted Successfully!</h3>
        <p className="text-green-700 mt-2">
          Your application has been recorded on the blockchain for transparent processing.
        </p>
        {transactionHash && (
          <div className="mt-2">
            <p className="text-sm text-green-700">Transaction Hash:</p>
            <p className="text-xs bg-white p-2 rounded mt-1 font-mono break-all">{transactionHash}</p>
          </div>
        )}
        <p className="mt-4 text-green-700">You will receive updates about your application status via email and SMS.</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-900">Full Name</FormLabel>
                <FormControl>
                <Input className="text-black" placeholder="Enter your full name" {...field} />
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
                <FormLabel className="text-blue-900">Email</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-900">District</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="text-black" placeholder="Select your district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai City</SelectItem>
                    <SelectItem value="thane">Thane</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="nagpur">Nagpur</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-blue-900">Address</FormLabel>
              <FormControl>
                <Textarea className="text-black" placeholder="Enter your full address" {...field} />
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
              <FormLabel className="text-blue-900">Purpose for {serviceType}</FormLabel>
              <FormControl>
                <Textarea className="text-black" placeholder={`Enter purpose for ${serviceType}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border rounded-md p-4 bg-blue-50">
          <h3 className="font-medium mb-3 text-black">Upload Required Documents</h3>

          <div className="space-y-3">
            {["Identity Proof", "Address Proof", "Photograph", "Supporting Documents"].map((doc, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-00 text-blue-600 flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">{doc}</p>
                </div>
                <Button type="button" variant="outline" size="sm" className="text-xs flex items-center gap-1 text-black">                  <Upload size={12} />
                  Upload
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-black mt-3">Accepted formats: PDF, JPG, PNG (Max size: 2MB per file)</p>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="rounded text-blue-600" />
          <label htmlFor="terms" className=" text-sm text-gray-500" >
            I hereby declare that all the information provided is true to the best of my knowledge
          </label>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Application will be recorded on blockchain for transparency</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

