// import { useQuery } from "@vue/apollo-composable";
import useNotify from "@/use/notify";
import useErrorParser from "@/use/errorParser";
const { notify } = useNotify();
const { parse } = useErrorParser();
// Default Values
const defaultClientId = "user";
const defaultEnabled = ref(true);
export default function (
  query,
  id,
  enabled = defaultEnabled,
  clientId = defaultClientId
) {
  console.log(enabled.value);
  console.log(clientId);
  const { onResult, loading, onError, refetch } = useQuery(
    query,
    () => ({
      id: id.value,
    }),

    () => ({
      fetchPolicy: "network-only",
      clientId: clientId,
      enabled: enabled.value,
      context: {
        headers: {
          "x-hasura-role": "user",
        },
      },
      // debounce: "2000",
    })
  );
  onError((err) => notify(parse(err)));

  return {
    onResult,
    loading,
    refetch,
    onError,
  };
}
