import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/client/apiClient';
import { zustandStorage } from '@/configs/zustand.storage.config';

interface Credentials {
    email?: string;
    username?: string;
    password?: string;
}

interface EnrollmentState {
    credentials: Credentials;
    setCredentials: (credentials: Credentials) => void;
    getCredentials: () => Credentials;  // Make this async
    enroll: () => Promise<any>; // Add an enroll function
    clearCredenials: () => void;
    isLoading: boolean;
    error: string | null;
}

const useEnrollmentStore = create<EnrollmentState>()(persist(
    (set, get) => ({
        credentials: {
            email: '',
            username: '',
            password: '',
        },
        setCredentials: (credentials) => set({ credentials }),
        getCredentials: () => get().credentials,
        clearCredenials: () => set({ credentials: { email: '', username: '', password: '' } }),
        enroll: async () => {
            set({ isLoading: true, error: null }); // Set loading state
            try {
                const credentials = get().getCredentials();
                const response = await apiClient.post('/auth/v1/register', credentials); // Using the API client
                // Handle successful enrollment (e.g., store token, redirect, etc.)
                console.log('Enrollment successful:', response.data);
                return response.data; // Return the response data
            } catch (error: any) { // Type the error
                console.log(error?.response?.data);
                set({ error: error.message || 'Enrollment failed' }); // Set error message
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
    }
));


export default useEnrollmentStore;