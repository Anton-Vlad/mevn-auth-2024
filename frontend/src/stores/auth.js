import { defineStore } from "pinia";
import { router } from "@/router";
import { fetchWrapper } from "@/utils/fetchWrapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    isLoggedIn: false,
    refreshTokenTimeout: null,
  }),
  actions: {
    async login(email, password) {
      this.user = await fetchWrapper.post(
        `${baseUrl}/auth`,
        { email, password },
        { credentials: "include" }
      );
      this.isLoggedIn = true;
      this.startRefreshTokenTimer();
      router.push("/");
    },
    logout() {
      fetchWrapper.post(`${baseUrl}/logout`, {}, { credentials: "include" });
      this.stopRefreshTokenTimer();
      this.user = null;
      this.isLoggedIn = false;
      router.push("/auth/login");
    },
    async rehydrateSession() {
      try {
        const response = await fetchWrapper.get(`${baseUrl}/profile`);
        // console.log("Rehydrate Session", response)
        if (!response._id) throw new Error("Session validation failed");

        const userData = {...response};
        this.isLoggedIn = true;
        this.user = userData;
        this.startRefreshTokenTimer();
      } catch (error) {
        this.isLoggedIn = false;
        this.user = null;
        console.error(error);
      }
    },
    async refreshToken() {
      this.user = await fetchWrapper.post(
        `${baseUrl}/refresh-token`,
        {},
        { credentials: "include" }
      );
      this.startRefreshTokenTimer();
    },
    startRefreshTokenTimer() {
      // set a timeout to refresh the token at 1 minute before it expires
      const timeout = 30 * 60 * 1000;//expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    },
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
      }
    },
  },
});
