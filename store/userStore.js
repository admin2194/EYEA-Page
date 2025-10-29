import { defineStore, skipHydrate } from "pinia";
import { useStorage } from "@vueuse/core";
// const router = useRouter()

export const useUserStore = defineStore("users", {
  state: () => ({
    users: useStorage("session", {}),
  }),
  persist: true,
  getters: {
    isLoggedIn: (state) => {
      return !!state.users?.custom_token;
    },
    email: (state) => state.users?.email,
    given_name: (state) => state.users?.given_name,
    custom_access_token: (state) => state.users?.custom_access_token,
    authorizer_token: (state) => state.users?.authorizer_token,
    buildings: (state) => state.users?.metadata?.buildings,
  },
  actions: {
    unset() {
      localStorage.removeItem("session");
      this.users = {};
      // router.push({ name: "/" });
    },
    set(data) {
      //   console.log(data);
      let access_token = data.access_token;
      let custom_token = data.custom_token;
      let session = custom_token.split(".")[1];
      session = JSON.parse(window.atob(session));
      session.access_token = access_token;
      session.custom_token = custom_token;
      localStorage.setItem("session", JSON.stringify(session));
      this.users = session;
      // console.log(this.users);
    },
    setMembershipStat(data) {
      this.users = { ...this.users, ...data };
    }
  },

  hydrate(state, initialState) {
    state.users = useStorage("session", {});
  },
});
