import {create} from "zustand";
import {IUser} from "../types/user.type";

export interface UserStore {
  userName: string;
  systemName: string;
  isAdmin: boolean;
  token: string;
  setUser: (user: IUser) => void;
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
      systemName: user.id,
    })),
  logout: () =>
    set((state) => ({
      ...state,
      userName: undefined,
      isAdmin: undefined,
      token: undefined,
    })),
}));
