import { create } from "zustand";

export const useChatMsgsStore = create((set) => ({
  chatMsgs: [],
  updateChatMsgs: (newMsgs) => set({ chatMsgs: newMsgs }),
}));
