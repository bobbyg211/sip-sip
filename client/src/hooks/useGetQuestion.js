import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

export default function useGetQuestion(id) {
  const queryClient = useQueryClient();

  return useQuery(
    "question",
    async () => {
      const config = {
        params: {
          id: id,
        },
      };

      return await axios
        .get(`/database/question`, config)
        .then((res) => res.data)
        .catch((err) => err);
    },
    {
      initialData: () => queryClient.getQueryData("question"),
      staleTime: Infinity,
      initialDataUpdatedAt: () => queryClient.getQueryState("question")?.dataUpdatedAt,
    }
  );
}
