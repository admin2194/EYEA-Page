import { useUserStore } from "@/store/userStore";
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore();
    if (to.fullPath === '/app' && !!user?.users.individualMem) {
        console.log('individual is working ');
        return navigateTo({ path: '/app', hash: "#individual" });
        // navigateTo('/app#individual');
    } else if (to.fullPath === '/app' && !!user?.users.organizationMem) {
        console.log('organization');
        return navigateTo({ path: '/app', hash: '#organization' });
    } else if (to.fullPath === '/app' && to.fullPath !== from.fullPath) {
        console.log('where am i')
        return navigateTo({ path: '/app/membership', hash: '#individual' });
    }
    // if (to.params.id === '1') {
    //   return abortNavigation()
    // }
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
    console.log('route direction', from.fullPath, to.fullPath);
    // if (from.fullPath != to.fullPath) {
    //     return navigateTo(to);
    // }
})