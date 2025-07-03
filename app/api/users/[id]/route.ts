import { type NextRequest, NextResponse } from "next/server"
import type { User, UpdateUserRequest } from "@/types/user"

// Mock database - In production, this would be Firestore
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    address: "123 Main St, New York, NY 10001",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    status: "active",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1-555-0125",
    address: "789 Pine Rd, Chicago, IL 60601",
    status: "inactive",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
]

// GET /api/users/[id] - Fetch user by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = users.find((u) => u.id === params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userData: UpdateUserRequest = await request.json()
    const userIndex = users.findIndex((u) => u.id === params.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if email is being updated and already exists
    if (userData.email && userData.email !== users[userIndex].email) {
      const existingUser = users.find((user) => user.email === userData.email)
      if (existingUser) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
      }
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userIndex = users.findIndex((u) => u.id === params.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users.splice(userIndex, 1)

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
