import { CardWrapper } from "./card-wrapper";

export const RegisterForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      Register form
    </CardWrapper>
  );
};
