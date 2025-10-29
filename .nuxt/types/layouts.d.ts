import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "memberregister" | "members" | "registration"
declare module "C:/Users/aman2/eyea-pubilic-page/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}