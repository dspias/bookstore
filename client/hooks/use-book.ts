import useSWR from "swr";
import { axios } from "@/lib/axios";

export const useBook = () => {
  const {
    data: books,
    error,
    mutate,
  } = useSWR("/api/books", () =>
    axios
      .get("/api/books")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    books,
  };
};
