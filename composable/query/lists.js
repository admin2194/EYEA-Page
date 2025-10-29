import { ref } from "vue";

const enable = ref(true);
const offset_ = ref(0);
const limit_ = ref(100);
const filter_ = ref({});
const defaultClientId = ref("user");
const role_ = ref("user");

export default function (
    query,
    {
        filter = filter_,
        order,
        limit = limit_,
        offset = offset_,
        enabled = enable,
        role = role_,
        clientId = defaultClientId,
    }
) {
    console.log("advnwdivhvh",clientId.value);
    const { onResult, onError, loading, refetch } = useQuery(
        query,
        () => ({
            limit: limit && limit?.value ? limit.value : undefined,
            filter: filter && filter.value ? filter.value : {},
            order: order && order?.value.length ? order.value : undefined,
            offset: offset && offset?.value ? offset.value : undefined,
        }),
        () => ({
            // fetchPolicy: "network-only",
            fetchPolicy: "no-cache",
            clientId: clientId,
            context: {
                headers: {
                    "x-hasura-role": role,
                },
            },
            enabled: enabled.value,
            // prefetch: false,
        })
    );
    return {
        onResult,
        loading,
        refetch,
        onError,
    };
}
