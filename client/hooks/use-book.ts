import useSWR from "swr";
import { axios } from "@/lib/axios";

interface UserProps {
  setErrors: (value: Array<any>) => void;
  setBooks: (value: any) => void;
}

export const useBook = () => {
  // const {
  //   data: books,
  //   error,
  //   mutate,
  // } = useSWR("/api/books", () =>
  //   axios
  //     .get("/api/books")
  //     .then((res) => res.data)
  //     .then((res) => res.data)
  //     .catch((error) => {
  //       if (error.response.status !== 409) throw error;
  //     })
  // );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const books = async ({ setErrors, setBooks, ...props }: UserProps) => {
    // await csrf();

    setErrors([]);
    setBooks([]);

    axios
      .post("/api/books", props)
      .then((res) => setBooks(res.data))
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      });
  };

  return {
    books,
  };
};
