import useSWR from "swr";
import { axios } from "@/lib/axios";

export const useBook = ({ bookId }: { bookId?: number }) => {
  const { data: book } = useSWR(`/api/books/${bookId}`, () =>
    axios
      .get(`/api/books/${bookId}`)
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    book,
  };
};
