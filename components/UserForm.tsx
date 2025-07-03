"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFormProps {
  user?: User | null
  onSubmit: (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || ("user" as "admin" | "user" | "manager"),
    status: user?.status || ("active" as "active" | "inactive"),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {user ? "Edit User" : "Add New User"}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {user ? "Update user information" : "Fill in the details to create a new user"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              className={`h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              className={`h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value: "admin" | "user" | "manager") => handleInputChange("role", value)}
            >
              <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") => handleInputChange("status", value)}
            >
              <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium bg-transparent"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700">
            {user ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  )
}
