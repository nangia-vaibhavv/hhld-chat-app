import { create } from 'zustand'


export const useUsersStore = create((set) => ({
    users: [],
    updateUsers: (user) => set({users: user})
}))