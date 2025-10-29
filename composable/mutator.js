import { useMutation } from "@vue/apollo-composable";
import useNotify from "@/use/notify";
import useErrorParser from "@/use/errorParser";
// const type = import.meta.env.VITE_TYPE;

const { notify } = useNotify();
const { parse } = useErrorParser();
const defaultClientId = ref("user");
const defaultRole = ref("user");
export default function (query, {clientId = defaultClientId ,role= defaultRole}) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",

    clientId: clientId.value,
    context: {
      headers: {
        "x-hasura-role": role.value,
      },
    },
  }));
  // onError((err) => notify(parse(err)));

  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}
