import { defineStore } from "pinia";
import { router } from "@/router";
import { fetchWrapper } from "@/utils/fetchWrapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(email, password) {
      this.user = await fetchWrapper.post(
        `${baseUrl}/auth`,
        { email, password },
        { credentials: "include" }
      );

      console.log("LOGIN", this.user);
      router.push("/");
      //   this.startRefreshTokenTimer();
    },
    logout() {
      fetchWrapper.post(`${baseUrl}/logout`, {}, { credentials: "include" });
      //   this.stopRefreshTokenTimer();
      this.user = null;
      router.push("/login");
    },
    async rehydrateSession() {
      try {
        const response = await fetchWrapper.get(`${baseUrl}/profile`);
        console.log("rehydrateSession", response)
        if (!response._id) throw new Error("Session validation failed");

        const userData = {...response};
        this.isLoggedIn = true;
        this.user = userData; // Assume userData contains relevant user info
      } catch (error) {
        this.isLoggedIn = false;
        this.user = null;
        console.error(error);
      }
    },
    // async refreshToken() {
    //   this.user = await fetchWrapper.post(
    //     `${baseUrl}/refresh-token`,
    //     {},
    //     { credentials: "include" }
    //   );
    // //   this.startRefreshTokenTimer();
    // },
    startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtBase64 = this.user.jwtToken.split(".")[1];
      const jwtToken = JSON.parse(atob(jwtBase64));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    },
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    },
  },
});
