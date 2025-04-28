"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceCard } from "./service-card"

export function DepartmentTab() {
  const [activeTab, setActiveTab] = useState("revenue")

  const departments = {
    revenue: [
      "Age Nationality Domicile",
      "Income Certificate",
      "Temporary Residence Certificate",
      "Senior Citizen Certificate",
      "Solvency Certificate",
      "Certified Copy",
      
    
    ],
    education: [
      "School Leaving Certificate",
      "Scholarship Application",
      "RTE Admission",
      "Hostel Admission",
      "Teacher Verification",
      "Student Verification",
    ],
    health: [
      "Birth Certificate",
      "Death Certificate",
      "Medical Certificate",
      "Hospital Registration",
      "Disability Certificate",
      "AYUSH Registration",
    ],
    urban: [
      "Property Tax Receipt",
      "Building Permission",
      "Trade License",
      "Water Connection",
      "Name Transfer of Property",
      "Land Use Certificate",
    ],
    rural: [
      "Gram Panchayat NOC",
      "Rural Development Scheme",
      "Social Security Pension",
      "MGNREGA Job Card",
      "Housing Scheme Application",
      "Water Supply Issues",
    ],
  }

  return (
    <Tabs defaultValue="revenue" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5">
        <TabsTrigger value="revenue" className="text-xs">
          Revenue
        </TabsTrigger>
        <TabsTrigger value="education" className="text-xs">
          Education
        </TabsTrigger>
        <TabsTrigger value="health" className="text-xs">
          Health
        </TabsTrigger>
        <TabsTrigger value="urban" className="text-xs">
          Urban Dev
        </TabsTrigger>
        <TabsTrigger value="rural" className="text-xs">
          Rural Dev
        </TabsTrigger>
      </TabsList>

      {Object.keys(departments).map((dept) => (
        <TabsContent key={dept} value={dept} className="mt-0">
          <div className="bg-gray-900 text-white p-3 mb-4">
            <h3 className="text-yellow-400">{dept.charAt(0).toUpperCase() + dept.slice(1)} Department</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments[dept as keyof typeof departments].map((service, index) => (
              <ServiceCard key={index} title={service} department={dept.charAt(0).toUpperCase() + dept.slice(1)} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

