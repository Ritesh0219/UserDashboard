import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { User, CreateUserRequest, UpdateUserRequest } from "@/types/user"

const USERS_COLLECTION = "users"

class FirestoreService {
  async getUsers(): Promise<User[]> {
    try {
      const usersRef = collection(db, USERS_COLLECTION)
      const q = query(usersRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as User[]
    } catch (error) {
      console.error("Error fetching users:", error)
      throw new Error("Failed to fetch users")
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const userRef = doc(db, USERS_COLLECTION, id)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        throw new Error("User not found")
      }

      const userData = userSnap.data()
      return {
        id: userSnap.id,
        ...userData,
        createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: userData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as User
    } catch (error) {
      console.error("Error fetching user:", error)
      throw new Error("Failed to fetch user")
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const now = Timestamp.now()
      const userDoc = {
        ...userData,
        createdAt: now,
        updatedAt: now,
      }

      const docRef = await addDoc(collection(db, USERS_COLLECTION), userDoc)

      return {
        id: docRef.id,
        ...userData,
        createdAt: now.toDate().toISOString(),
        updatedAt: now.toDate().toISOString(),
      }
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user")
    }
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const userRef = doc(db, USERS_COLLECTION, id)
      const updateData = {
        ...userData,
        updatedAt: Timestamp.now(),
      }

      await updateDoc(userRef, updateData)

      // Fetch and return updated user
      return await this.getUserById(id)
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user")
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, id)
      await deleteDoc(userRef)
    } catch (error) {
      console.error("Error deleting user:", error)
      throw new Error("Failed to delete user")
    }
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    try {
      const usersRef = collection(db, USERS_COLLECTION)
      const querySnapshot = await getDocs(usersRef)

      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as User[]

      // Client-side filtering for search
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    } catch (error) {
      console.error("Error searching users:", error)
      throw new Error("Failed to search users")
    }
  }
}

export const firestoreService = new FirestoreService()
