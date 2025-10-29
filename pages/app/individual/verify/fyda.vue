<script setup>
import { Form, useForm } from "vee-validate";
const router = useRouter();
definePageMeta({
  layout: "registration",
});
const { handleSubmit } = useForm({});
const submit = handleSubmit(async (values) => {
  router.push("/individual/verify");
});
</script>

<template>
  <div class="flex justify-center font-poppins dark:bg-dark-secondary">
    <div class="2xl:w-[70%] lg:w-full min-h-screen dark:text-white">
      <div class="flex justify-center">
        <img
          src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
          alt=""
          srcset=""
         class="2xl:w-[400px] xl:[w-250px] w-[200px]"
        />
      </div>
      <div class="flex justify-center">
        <div class="2xl:w-[50%]  w-[80%] text-center space-y-4">
          <p class="2xl:text-4xl text-2xl">FYDA NUMBER</p>
          <p class="text-secondary-text 2xl:text-base text-sm dark:text-dark-text-secondary px-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eius fugit delectus ullam accusamus mollitia ea fuga! Optio,
            distinctio vel!
          </p>
        </div>
      </div>
      <div class="w-full 2xl:pt-40 xl:pt-16 pt-[30%] flex justify-center">
        <div class="xl:w-[50%] lg:w-[80%] px-4 ">
          <form @submit.prevent="submit" class="">
            <InputsTextfield
              name="Fyda number"
              rules="required"
              class="focus:border-primary 2xl:h-12 h-10 pl-[50px] dark:bg-dark-secondary"
              placeholder="Fyda number"
              placeholder-style="text-primary-text-light 2xl:text-base xl:text-sm"
            >
              <template #leading>
                <div
                  class="absolute 2xl:top-3 xl:top-[7px] top-[6px] left-2 text-primary-text-light font-poppins"
                >
                  <Icon name="ci:user-card-id" width="25" height="25"></Icon>
                </div>
              </template>
            </InputsTextfield>

            <button
              type="submit"
              class="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
            >
              confirm
            </button>
          </form>
          <NuxtLink to="/individual/registration">
            <InputsButton
              name="Register without FYDA ID"
              class="px-4 w-full h-[40px] cursor-pointer rounded-md border-primary border-2 text-primary mt-4"
            ></InputsButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
