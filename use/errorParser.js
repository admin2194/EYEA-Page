export default function () {
  const response = {
    invalid_username_or_password: {
      title: "invalid_username_or_password",
      description: "please_try_again_with_correct_credentials",
    },
    unexpected: {
      title: "invalid_username_or_password",
      description: "please_try_again_with_correct_credentials",
      cardClass: "bg-red-100",
    },
    access_denied: {
      title: "access_denied",
      description: "you_have_no_permission",
      cardClass: "bg-red-100",
    },
    space_floor_id_fkey: {
      title: "you_can't_delete_floor",
      description: "you_have_no_permission",
      cardClass: "bg-red-100",
    },
    "Your requested role is not in allowed roles access-denied": {
      title: "access_denied",
      description: "you_have_no_permission",
      cardClass: "bg-red-100",
    },
    "NetworkError when attempting to fetch resource.": {
      title: "connection failed",
      description: "check you network  connection please",
      cardClass: "bg-red-100",
    },
    individual_membership_user_id_key: {
      title: "You are  already registered as individual member",
      description: "please check you membership id   or contact admin",
      cardClass: "bg-red-100",
    },
    "Could not verify JWT: JWTExpired invalid-jwt": {
      title: "session expired",
      description: "session expired please login again",
      cardClass: "bg-red-100",
    },
    "invalid input syntax for type uuid": {
      title: "Could not find the requested item",
      description: "please check the id you are requesting",
      cardClass: "bg-red-100",
    },
  };

  const extract = (err) => {
    let msg_compilation = "";
    if (err && err.graphQLErrors) {
      if (err.graphQLErrors.length > 0) {
        const errObject = err.graphQLErrors[0];

        if (
          errObject.extensions &&
          errObject.extensions.internal &&
          errObject.extensions.internal.error
        ) {
          msg_compilation += errObject.extensions.internal.error.message;
          // return errObject.extensions.internal.error.message;
        } else {
          msg_compilation += err.graphQLErrors[0].message;
          if (
            err.graphQLErrors[0].extensions &&
            err.graphQLErrors[0].extensions.code
          ) {
            msg_compilation += ` ${
              err.graphQLErrors[0].extensions &&
              err.graphQLErrors[0].extensions.code
            }`;
          }
          // return `${err.graphQLErrors[0].message}`;
        }
      } else {
        msg_compilation += err.message || " extraction_error";
        // return "extraction_error";
      }
    }
    if (err && err.errors && err.errors.length > 0) {
      msg_compilation += err.errors[0].message;
      // return err.errors[0].message;
    }

    if (typeof err === "string") {
      msg_compilation += err;
      return err;
    }

    return msg_compilation;
  };

  const parse = (err) => {
    let item = {};
    console.log("sami".includes("sa"));
    const msg = extract(err);
    // console.log(msg);
    Object.keys(response).forEach((key) => {
      if (msg.includes(key)) {
        item = {
          ...response[key],
          key,
        };
      }
    });

    if (Object.keys(item).length === 0 && msg) {
      item = {
        title: msg,
        key: null,
      };
    }

    return item;
  };

  return {
    parse,
    extract,
  };
}
