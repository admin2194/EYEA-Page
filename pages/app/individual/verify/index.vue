<script setup >
definePageMeta({
  layout: "registration",
});
import VOtpInput from "vue3-otp-input";
const router = useRouter();
const otpInput = ref(null);
const bindModal = ref("");
const disabled = ref(true);


const handleOnChange = (value) => {
  bindModal.value = value;
  if (bindModal.value.length < 6) {
    disabled.value = true;
  }
  else
  {
    disabled.value = false;
  }
 
};

const confirm = () => {
  router.push("/individual/registration");
};

</script> 

<template>
  <div class="flex justify-center font-poppins dark:bg-dark-secondary">
    <div class="w-[70%]  min-h-screen space-y-10">
      <div class="flex justify-center">
        <img
          src="@/assets/images/logos/EYEA_logos/EYEA_logo_color.svg"
          alt=""
          srcset=""
          width="400"
        />
      </div>
      <div class="flex justify-center dark:text-white">
        <div class="w-[50%] text-center space-y-4">
          <p class="text-4xl">FYDA NUMBER</p>
          <p class="text-secondary-text dark:text-dark-text-secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            eius fugit delectus ullam accusamus mollitia ea fuga! Optio,
            distinctio vel!
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="w-[50%] flex items-center flex-col">
          <div>
            <v-otp-input
              ref="otpInput"
              v-model:value="bindModal"
              input-classes="otp-input dark:bg-dark-secondary dark:text-white"
              separator=" "
              :num-inputs="6"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :conditionalClass="['one', 'two', 'three', 'four']"
              @on-change="handleOnChange"
            />
          </div>
          <!-- <button @click="clearInput()">Clear Input</button>
          <button @click="fillInput('2929')">Fill Input</button> -->
         
          <InputsButton
            name="Verify"
            @click="confirm"
            :disabled="disabled"
            disabled-class="px-4 w-full h-[40px] rounded-md bg-[#FFDA92] text-white mt-4"
            inputClass="px-4 w-full h-[40px] rounded-md bg-primary text-white mt-4"
          ></InputsButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  outline-style: none;
  text-align: center;
  @apply border-2 border-primary-light  focus:border-primary focus:outline-0;
  
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  @apply  border-primary;
}
/* .otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */

</style>
