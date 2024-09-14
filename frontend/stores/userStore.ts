export const useUserStore = defineStore("user", {
  state: () => ({
    username: null,
    user_id: null,
    full_name: null,
    email: null,
    address: null,
    phone_number: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await $fetch("/api/user");
        this.username = response.username;
        this.user_id = response.user_id;
        this.full_name = response.full_name;
        this.email = response.email;
        this.address = response.address;
        this.phone_number = response.phone_number;
      } catch (err) {
        // user is not logged-in
      }
    },
  },
});
