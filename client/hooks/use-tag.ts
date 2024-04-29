import useSWR from "swr";
import { axios } from "@/lib/axios";

export const useTag = () => {
  const {
    data: tags,
    error,
    mutate,
  } = useSWR("/api/tags", () =>
    axios
      .get("/api/tags")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    tags,
  };
};
