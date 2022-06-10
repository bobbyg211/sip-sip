import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

export default function useGetQuestion(mode) {
  const queryClient = useQueryClient();

  return useQuery(
    "question",
    async () => {
      const config = {
        mode: mode,
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
