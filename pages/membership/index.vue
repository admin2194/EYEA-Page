<script setup></script>

<template>
  <div class="dark:bg-dark-primary">
    <NavBar navClass="dark:bg-dark-primary"></NavBar>
    <div
      class="relative flex items-center justify-between w-screen pt-10 pb-6 dark:bg-dark-secondary px-4 lg:px-24"
    >
      <!-- Call to action line button -->
      <div class="absolute bottom-0 hidden lg:inline right-16">
        <img
          src="@/assets/images/shapes/why-you-should-join.png"
          alt=""
          class="w-[160px]"
        />
      </div>

      <div
        class="max-w-[600px] font-poppins space-y-4 text-dark-primary dark:text-secondary"
      >
        <h1
          class="font-[400] text-2xl md:text-3xl lg:text-left text-center lg:text-5xl lg:leading-[60px]"
        >
          Become a member of the youth entrepreneurs association
        </h1>
        <p
          class="lg:w-[80%] font-[400] text-base lg:text-left text-center leading-7"
        >
          Benefit from the various services our association offers to help your
          business grow and gain access to new markers as well as insights
        </p>
        <NuxtLink to="/join">
          <div
            class="flex justify-center pt-10 relative lg:mx-0 mx-auto w-[60%]"
          >
            <img
              src="@/assets/images/shapes/buttonArrow.png"
              alt=""
              class="absolute -top-[43%] -right-[30%] md:-right-[20%] w-[90px]"
            />
            <NuxtLink to="/join" class="w-[80%]">
              <InputsButton
                class="flex items-center justify-center w-full p-1 px-4 space-x-2 text-lg text-white border-2 rounded-md bg-primary border-primary md:p-2 md:font-semibold"
                name="Join Us"
              >
              </InputsButton>
            </NuxtLink>
            <div class="absolute hidden ld:inline-block right-[20%] bottom-0">
              <img src="@/assets/images/shapes/joinVerctor.svg" alt="" />
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="hidden w-full md:inline md:pr-14">
        <img
          src="@/assets/images/temp/member-form.png"
          alt=""
          class="ml-auto"
        />
      </div>
    </div>

    <LayoutSectionHeader  iconName="uil:tag-alt"></LayoutSectionHeader>
    <div
      class="relative w-full md:min-h-screen font-poppins md:px-20 -mt-14 dark:bg-dark-primary"
    >
      <div class="flex justify-center w-full pb-10">
        <div class="flex justify-center md:w-[80%]">
          <JoinUs></JoinUs>
        </div>
      </div>
    </div>
    <div
      class="relative w-full pb-10 bg-third-light font-poppins md:px-20 dark:bg-dark-secondary"
    >
      <div class="absolute right-0 hidden md:inline-block bottom-4">
        <NuxtImg
          format="webp"
          loading="lazy"
          src="https://res.cloudinary.com/blue-sky/image/upload/v1690980105/flowerShape_bkwvfq.svg"
        ></NuxtImg>
      </div>
      <LayoutSectionHeader
        iconName="carbon:money"
        title="Benefits of Membership"
        subtitle="Officially registered members of EYEA will get access to the following benefits"
      ></LayoutSectionHeader>
      <div class="flex justify-center pt-10">
        <div class="2xl:w-[80%] px-2">
          <div class="grid gap-20 md:grid-cols-2">
            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon
                  name="material-symbols:computer-outline"
                  class="text-2xl md:text-4xl"
                ></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                EYEA members through its digital platform will access updated
                information with regards to new opportunities for youth
                entrepreneurs, insight on policy changes and how to capitalize
                on available resources
              </p>
            </div>
            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon
                  name="uil:arrow-growth"
                  class="text-2xl md:text-4xl"
                ></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                Eligible young members of EYEA will be provided with
                programs/interventions specifically designed to enhance their
                entrepreneurial capacity, equip them with trending skills and
                capabilities enabling them successfully navigate the
                entrepreneurship journey.
              </p>
            </div>
            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon
                  name="fluent-emoji-high-contrast:linked-paperclips"
                  class="text-2xl md:text-4xl"
                ></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                EYEA member youth entrepreneurs will be provided with various
                platforms designed to create networking among like-minded
                individuals to discuss opportunities and challenges.
              </p>
            </div>

            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon
                  name="fluent:building-bank-link-28-regular"
                  class="text-2xl md:text-4xl"
                ></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                Eligible Young member entrepreneurs of EYEA will get the
                opportunity to participate in projects with potential access to
                finance created in partnership with financial institutions and
                development partners.
              </p>
            </div>
            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon
                  name="mdi:partnership-outline"
                  class="text-2xl md:text-4xl"
                ></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg l text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                EYEA members will get the opportunity to link up with ecosystem
                stakeholders such as public sector leaders and development
                partners, local and international entrepreneurship focus groups.
              </p>
            </div>
            <div class="flex space-x-8">
              <div
                class="self-start p-2 rounded-full bg-third-light2 text-secondary-text dark:text-dark-text-secondary"
              >
                <Icon name="iconoir:tools" class="text-2xl md:text-4xl"></Icon>
              </div>
              <p
                class="text-sm leading-relaxed text-justify 2xl:text-xl xl:text-lg text-secondary-text dark:text-dark-text-secondary font-poppins"
              >
                Youth entrepreneurs will be provided with the chance to be a
                member of EYEA as an individual or company to access various
                innovative tools to help them advance their ideas to valuable
                businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LayoutFooter></LayoutFooter>
</template>
