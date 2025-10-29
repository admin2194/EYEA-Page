// import { useQuery } from "@vue/apollo-composable";
import useNotify from "@/use/notify";
import useErrorParser from "@/use/errorParser";
const { notify } = useNotify();

const { parse } = useErrorParser();
// Default Values
const defaultClientId = ref("user");
const defaultOffset = ref(0);
const defaultLimit = ref(60); // 60 is divisible by 2,3,4 and 5. hence making it compatible with most lists and tables.
const defaultFilter = ref({});

export default function (
    query,
    {
        filter = defaultFilter,
        limit = defaultLimit,
        offset = defaultOffset,
        clientId = defaultClientId,
    },
) {
    console.log(filter?.value);
    const { onResult, loading, onError, refetch } = useQuery(
        query,
        () => ({
            limit: limit.value,
            offset: offset.value,
            filter: filter?.value,
        }),
        () => ({
            fetchPolicy: "network-only",
            clientId: clientId,
            context: {
                headers: {
                  "x-hasura-role": "user"
                },
              },
            // debounce: "2000",
        }),
    );
      onError((err) => notify(parse(err)));

    return {
        onResult,
        loading,
        refetch,
    };
}
