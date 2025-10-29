import { useUserStore } from "@/store/userStore";
import login_composable from "@/composable/query/lists.js";
import custom_token_query from "@/API/mutation/third_customToken.gql";
import memberships_query from "@/API/queries/membership/hasMembership.gql";
import lists_composable from "@/composable/query/lists";
export default defineNuxtRouteMiddleware((to, from) => {
  // write comment

  const userStore = useUserStore();
  const custom_cookie = useCookie("custom_token");
  const access_cookie = useCookie("access_token");
  const route = useRoute();
  const enabled = ref(false);
  const membershipEnabled = ref(false);
  const clientId = ref("third_party");
  const role = ref("");
  if (to.query.access_token) {
    access_cookie.value = "Bearer " + route.query.access_token;
    enabled.value = true;
    console.log(route.query.access_token);
  }
  const {
    onResult: onTokenResult,
    loading: onTokenLoading,
    refetch,
  } = login_composable(custom_token_query, {
    clientId,
    enabled: enabled,
    role,
  });

  const {
    onResult: onMembershipResult,
    loading: onMembershipLoading,
    refetch: refetchMembership,
  } = lists_composable(memberships_query, { enabled: membershipEnabled });

  onTokenResult((result) => {
    custom_cookie.value =
      "Bearer " + result.data?.third_party_auth?.custom_access_token;

    if (custom_cookie.value) {
      const data = {};
      // data.access_token = access_cookie.value;
      data.custom_token = custom_cookie.value;
      userStore.set(data);

      if (userStore.users.metadata.roles.includes("super:admin")) {
        access_cookie.value = "";
        custom_cookie.value = "";
        userStore.unset();
        notify({
          title: "Invalid password or email",
          description: "insert correct user password or email",
          cardClass: "bg-red-100",
        });
        return navigateTo({ path: "/login" });
      }
      membershipEnabled.value = true;
    }

    onMembershipResult(({ data }) => {
      let membershipState = {
        individualMem: data.individual_membership?.length,
        organizationMem: data.organization_membership?.length,
      };
      userStore.setMembershipStat(membershipState);
      if (membershipState.individualMem > 0) {
        return navigateTo({ path: "/app#individual" });
      } else if (membershipState.organizationMem > 0) {
        return navigateTo({ path: "/app#organization" });
      } else {
        return navigateTo({ path: "/" });
      }
    });
    return;
    // console.log(result.data.third_party_auth.custom_access_token );
  });
});
