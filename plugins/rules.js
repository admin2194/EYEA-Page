import { defineRule } from "vee-validate";

export default defineNuxtPlugin((vueApp) => {
  defineRule("onerequired", (value, [], ctx) => {
    return !!value || value?.length || "At least one selection required";
  }),
    defineRule("required", (value, [], ctx) => {
      return !!value || value?.length || "Field Required";
    }),
    defineRule("boolReq", (value, [], ctx) => {
      return typeof value == "boolean" || "Field Required";
    });
  defineRule("arrya_object_required", (value, [], ctx) => {
    return value?.length || "Field Required";
  }),
    defineRule("yes_or_no", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("dyarrayrequired", (value, [], ctx) => {
      return (
        ctx.rule.params[0]?.includes("No_savings") ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("arrayRequired", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("dyrequired", (value, [], ctx) => {
      return (
        ctx.rule.params[0] == "no" ||
        ctx.rule.params[0] == "No" ||
        ctx.rule.params[0] == undefined ||
        ctx.rule.params[0] == "sole_proprietorship" ||
        (typeof ctx.rule.params[0] == "boolean" &&
          ctx.rule.params[0] == false) ||
        !!value ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("arrya_object_dyrequired", (value, [], ctx) => {
      return (
        ctx.rule.params[0] == "no" ||
        ctx.rule.params[0] == "No" ||
        ctx.rule.params[0] == undefined ||
        value?.length ||
        "Field Required"
      );
    });
  defineRule("dyrequirednot", (value, [], ctx) => {
    return (
      ctx.rule.params[0] == "yes" ||
      ctx.rule.params[0] == "Yes" ||
      ctx.rule.params[0] == undefined ||
      ctx.rule.params[0] == "sole_proprietorship" ||
      !!value ||
      value?.length ||
      "Field Required"
    );
  }),
    defineRule("number", (value) => {
      return !value || /^[0-9]+$/.test(value) || "Number only";
    }),
    defineRule("numrange", (value) => {
      return !value || /^[0-9-]+$/.test(value) || "Number only";
    }),
    defineRule("email", (value) => {
      return (
        !value ||
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        ) ||
        "Not Valid Email"
      );
    }),
    defineRule("International_phone_number", (value) => {
      return (
        !value ||
        /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
        "Not valid phone number"
      );
    }),
    defineRule("ethiopian_phone_number", (value) => {
      return !value || /^(9|7)\d{8}$/.test(value) || "Not valid phone number";
    }),
    defineRule("ethio_phone", (value) => {
      return !value || /^(7|9)\d{8}$/.test(value) || "Not valid phone number";
    }),
    defineRule("password", (value) => {
      // return !value || value.length >= 8 || i18n.global.t("password_too_short");
      return (
        !value ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\w\d\S]{6,}$/.test(
          value
        ) ||
        "password must have at least one uppercase, lowercase, special character, and at least 6 characters"
      );
    });
  defineRule("confirmed", (value, [other]) => {
    return !value || value === other || "Password is not the same";
  });
});
