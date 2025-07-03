import type { User, CreateUserRequest, UpdateUserRequest } from "@/types/user"

// Mock API service that simulates Google Cloud Functions
class UserService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`)
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    return response.json()
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }
    return response.json()
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error("Failed to create user")
    }
    return response.json()
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error("Failed to update user")
    }
    return response.json()
  }

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete user")
    }
  }
}

export const userService = new UserService()
