import { type NextRequest, NextResponse } from "next/server"
import type { User, CreateUserRequest } from "@/types/user"

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

// GET /api/users - Fetch all users
export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const userData: CreateUserRequest = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.phone || !userData.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = users.find((user) => user.email === userData.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
