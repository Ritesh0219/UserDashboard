export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "manager"
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  role: "admin" | "user" | "manager"
  status: "active" | "inactive"
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  role?: "admin" | "user" | "manager"
  status?: "active" | "inactive"
}
