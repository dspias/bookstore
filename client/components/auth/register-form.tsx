"use client";

import { useAction } from "@/hooks/use-action";
import { CardWrapper } from "./card-wrapper";
import { toast } from "sonner";
import { userRegister } from "@/actions/auth/register";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const RegisterForm = () => {
  const { execute, fieldErrors } = useAction(userRegister, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({ name, email, password });
  };
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <form action={onSubmit} className="space-y-4">
        <div className="space-y-4">
          <FormInput id="name" label="Name" type="name" errors={fieldErrors} />
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
        <FormSubmit className="w-full">Create an account</FormSubmit>
      </form>
    </CardWrapper>
  );
};
