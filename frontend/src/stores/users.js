import { defineStore } from "pinia";

import { fetchWrapper } from "@/utils/fetchWrapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        profile: {},
    }),
    actions: {
        async getProfile() {
            this.profile = { loading: true };
            fetchWrapper.get(`${baseUrl}/profile`)
                .then(profile => this.profile = profile)
                .catch(error => this.profile = { error })
        },
        async updateProfile(name, email, password) {
            this.profile = await fetchWrapper.put(
              `${baseUrl}/profile`,
              { name, email, password },
              { credentials: "include" }
            );
            
            console.log('USER UPDATED', this.profile)
          },
    }
});