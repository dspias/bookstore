import { axios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrderProps {
  setErrors: (value: any) => void;
  setStatus: (value: string | null) => void;
}

export const useOrder = () => {
  const router = useRouter();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getOrders = async () => {
    return await axios
      .get("/api/orders")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const createOrder = async ({ setErrors, ...props }: OrderProps) => {
    await csrf();

    setErrors([]);

    axios
      .post("/api/orders", props)
      .then((res) => {
        toast("Order placed !");
        router.push("/orders");
      })
      .catch((error) => {
        if (error?.response?.status !== 422) throw error;

        toast("Something went wrong!");
        setErrors(error.response.data.errors);
      });
  };

  const cancelOrder = async ({ orderId, ...props }: { orderId: string }) => {
    await csrf();

    axios
      .post(`/api/orders/cancel/${orderId}`, props)
      .then((res) => {
        toast("Order canceled !");
        router.refresh();
      })
      .catch((error) => {
        if (error?.response?.status !== 422) throw error;
        toast("Something went wrong!");
      });
  };

  return {
    getOrders,
    createOrder,
    cancelOrder,
  };
};
