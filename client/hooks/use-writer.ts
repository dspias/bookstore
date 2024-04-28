import useSWR from "swr";
import { axios } from "@/lib/axios";

export const useWriter = () => {
  const {
    data: writers,
    error,
    mutate,
  } = useSWR("/api/writers", () =>
    axios
      .get("/api/writers")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    writers,
  };
};
