"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"
import { firestoreService } from "@/services/firestoreService"
import UserList from "./UserList"
import UserForm from "./UserForm"
import { Button } from "@/components/ui/button"
import { Plus, Users, UserCheck, UserX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await firestoreService.getUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newUser = await firestoreService.createUser(userData)
      setUsers((prev) => [newUser, ...prev])
      setShowForm(false)
      toast({
        title: "Success",
        description: "User created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUser = async (id: string, userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    try {
      const updatedUser = await firestoreService.updateUser(id, userData)
      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      setEditingUser(null)
      setShowForm(false)
      toast({
        title: "Success",
        description: "User updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await firestoreService.deleteUser(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  const activeUsers = users.filter((user) => user.status === "active").length
  const inactiveUsers = users.filter((user) => user.status === "inactive").length

  return (
    <div className="space-y-6">
      {/* Colorful Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Active Users</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">{activeUsers}</p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Inactive Users</p>
              <p className="text-2xl font-bold text-red-900 dark:text-red-100 mt-1">{inactiveUsers}</p>
            </div>
            <div className="p-3 bg-red-500 rounded-xl shadow-lg">
              <UserX className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage user accounts and permissions</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r w-fit text-sm sm:text-base sm:px-4 from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
        <div className="p-6">
          {showForm ? (
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? (userData) => handleUpdateUser(editingUser.id, userData) : handleCreateUser}
              onCancel={handleCancelForm}
            />
          ) : (
            <UserList users={users} loading={loading} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          )}
        </div>
      </div>
    </div>
  )
}
