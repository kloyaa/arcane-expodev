import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/client/apiClient';
import { zustandStorage } from '@/configs/zustand.storage.config';

interface IState {
    email?: string;
    username?: string;
    password?: string;
}

interface LoginPayload {
    identifier: string;
    password: string;
}

interface AuthState {
    token: string;
    state: IState;
    setState: (credentials: IState) => void;
    getState: () => IState;  // Make this async
    registration: () => Promise<any>; // Add an enroll function
    login: ({ identifier, password }: LoginPayload) => Promise<boolean>;
    clearCredenials: () => void;
    isLoading: boolean;
    error: string | null;
}

const useAuthStore = create<AuthState>()(persist(
    (set, get) => ({
        token: '',
        state: {
            email: '',
            username: '',
            password: '',
        },
        setState: (state) => set({ state }),
        getState: () => get().state,
        getToken: () => get().token,
        clearCredenials: () => set({ state: { email: '', username: '', password: '' } }),
        registration: async () => {
            set({ isLoading: true, error: null }); // Set loading state
            try {
                const credentials = get().getState();
                const response = await apiClient.post<{ accessToken: string }>('/auth/v1/register', credentials); // Using the API client
                set({ token: response.data.accessToken })
            } catch (error: any) { // Type the error
                set({ error: error.message || 'Enrollment failed' }); // Set error message
            } finally {
                set({ isLoading: false }); // Set loading state
            }
        },
        login: async (e) => {
            set({ isLoading: true, error: null }); // Set loading state
            try {
                const response = await apiClient.post<{ accessToken: string }>('/auth/v1/login', {
                    username: e.identifier,
                    password: e.password
                });
                set({ token: response.data.accessToken, error: null });

                return true;
            } catch (error: any) { // Type the error
                set({ error: error.response?.data?.message || 'Login failed' }); // Set error message
                return false;
            } finally {
                set({ isLoading: false }); // Set loading state
            }
        },
        isLoading: false,
        error: null,
    }),
    {
        name: 'enrollment', // Unique name for the store
        storage: zustandStorage,
        partialize: (prev) => ({
            token: prev.token,
            state: prev.state,
            // Exclude isLoading and error from persistence
        }),
    }
));


export default useAuthStore;