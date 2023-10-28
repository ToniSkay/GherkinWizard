import {create} from "zustand";

export interface UserStore {
  userName: string;
  systemName: string;
  isAdmin: boolean;
  token: string;
  setUser: (user: { name: string; isAdmin: boolean; token: string }) => void;
  logout: () => void;
}

const user = JSON.parse(localStorage.getItem("user"));

export const useUserStore = create<UserStore>((set) => ({
  systemName: user?.id || '',
  userName: user?.name || "",
  isAdmin: user?.isAdmin || false,
  token: user?.token || "",
  setUser: (user) =>
    set((state) => ({
      ...state,
      userName: user.name,
      isAdmin: user.isAdmin,
      token: user.token,
    })),
  logout: () =>
    set((state) => ({
      ...state,
      userName: undefined,
      isAdmin: undefined,
      token: undefined,
    })),
}));
