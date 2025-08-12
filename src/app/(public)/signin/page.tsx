"use client";

import { useState } from "react";
import styles from "./page.module.css";

import { useSigninForm } from "@/application/hooks/useSigninForm";
import { useAuthStore } from "@/application/store/useAuthStore";
import Spinner from "@/shared/components/Spinner/Spinner";
import EyeIcon from "@/shared/icons/visibility.svg";
import EyeOffIcon from "@/shared/icons/visibility_off.svg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useSigninForm();
  const { isSubmitting, errors, isValid } = formState;
  const { localSignin, googleSignin, error, setError } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = handleSubmit(async (data) => {
    const success = await localSignin({
      email: data.email,
      password: data.password,
    });
    if (success) router.push("/");
  });

  const google = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential as string;
    const success = await googleSignin({ idToken });
    if (success) router.push("/");
  };

  const onError = () => {
    setError("Houve um erro ao realizar o cadastro com o Google.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign in</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">E-mail</label>
            <input
              data-testid="email"
              id="email"
              {...register("email")}
              placeholder="Enter your E-mail"
            />
            <span data-testid="error-email" className={styles.errorMessage}>
              {errors.email?.message}
            </span>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <span className={styles.passwordWraper}>
              <input
                data-testid="password"
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
              />
              <span
                data-testid="togglePass"
                onClick={togglePassword}
                className={styles.icon}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </span>
            <span data-testid="error-password" className={styles.errorMessage}>
              {errors.password?.message}
            </span>
          </div>

          <button
            data-testid="submit"
            disabled={isSubmitting || !isValid}
            type="submit"
          >
            Sign in
          </button>
          <div
            className={`${styles.googleLogin} ${
              isSubmitting && styles.disabled
            } `}
          >
            <GoogleLogin onSuccess={google} onError={onError} />
          </div>
          <div className={styles.errorSubmit}>
            {isSubmitting ? (
              <Spinner />
            ) : (
              <span data-testid="error-subimt">{error}</span>
            )}
          </div>
        </form>
        <div className={styles.links}>
          <span>Do not have an account? </span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}
