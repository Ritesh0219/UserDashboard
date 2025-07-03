"use client"

import { useState, useMemo } from "react"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown, Users } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface UserListProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

type SortField = "name" | "email" | "role" | "status"
type SortDirection = "asc" | "desc"

export default function UserList({ users, loading, onEdit, onDelete }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

    return filtered
  }, [users, searchTerm, statusFilter, roleFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-600" />
    )
  }

  const getRoleBadgeVariant = (role: string) => {
    return "outline" // All roles get colorless outline variant
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "active" ? "default" : "secondary"
  }

  const getStatusBadgeClass = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : "bg-red-100 text-red-800 hover:bg-red-100"
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-6">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 animate-pulse"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
        </div>
        <div className="border border-gray-200 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Clean Search and Filter Controls */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-10 border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32 h-10 border-gray-300">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {filteredAndSortedUsers.length} of {users.length} users
          </span>
          {(searchTerm || statusFilter !== "all" || roleFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setRoleFilter("all")
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Clean Users Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              <TableHead className="font-semibold text-gray-900 dark:text-white text-center">
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="h-auto p-0 font-semibold text-gray-900 dark:text-white hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                  >
                    Name {getSortIcon("name")}
                  </Button>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-center">
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="h-auto p-0 font-semibold text-gray-900 dark:text-white hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                  >
                    Email {getSortIcon("email")}
                  </Button>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-center">
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("role")}
                    className="h-auto p-0 font-semibold text-gray-900 dark:text-white hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                  >
                    Role {getSortIcon("role")}
                  </Button>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-center">
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto p-0 font-semibold text-gray-900 dark:text-white hover:bg-transparent hover:text-blue-600 flex items-center gap-2"
                  >
                    Status {getSortIcon("status")}
                  </Button>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-center">
                <div className="flex justify-center">Actions</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <Users className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Get started by creating your first user"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedUsers.map((user, index) => (
                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <TableCell className="font-medium text-gray-900 dark:text-white text-center">{user.name}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300 text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={getStatusBadgeVariant(user.status)}
                      className={`capitalize ${getStatusBadgeClass(user.status)}`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(user)}
                        className="h-8 w-8 p-0 text-gray-600 hover:text-blue-600 focus:outline-none"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 focus:outline-none"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{user.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(user.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
