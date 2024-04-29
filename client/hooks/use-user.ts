import useSWR from "swr";
import { axios } from "@/lib/axios";

export const useUser = () => {
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    user,
  };
};
