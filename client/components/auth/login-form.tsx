"use client";

import { useAction } from "@/hooks/use-action";
import { CardWrapper } from "./card-wrapper";
import { userLogin } from "@/actions/auth/login";
import { toast } from "sonner";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const LoginForm = () => {
  const { execute, fieldErrors } = useAction(userLogin, {
    onSuccess: (data) => {
      toast.success("Board created!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({ email, password });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <form action={onSubmit} className="space-y-4">
        <div className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            errors={fieldErrors}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            errors={fieldErrors}
          />
        </div>
        <FormSubmit className="w-full">Login</FormSubmit>
      </form>
    </CardWrapper>
  );
};
