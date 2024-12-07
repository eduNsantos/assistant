import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user?: {
    id: string,
    name: string,
    role: string
  } | null,
  setToken: (token: string | null) => void;
  setUser: (user: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(

        (set) => ({
            token: null,
            user: undefined,
            setToken: (token) => {
                return set({ token });
            },
            setUser: (user: any) => {
                console.log(user)
                return set({ user });
            }
        }),

        {
            name: 'auth-storage', // Chave usada no localStorage
        }
    )
)
;