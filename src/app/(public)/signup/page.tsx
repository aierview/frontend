"use client";

import { UserRole } from "@/domain/enums/UserRole";
import { useState } from "react";
import styles from "./page.module.css";

import { useSignupForm } from "@/application/hooks/useSignupForm";
import { useAuthStore } from "@/application/store/useAuthStore";
import Spinner from "@/shared/components/Spinner/Spinner";
import EyeIcon from "@/shared/icons/visibility.svg";
import EyeOffIcon from "@/shared/icons/visibility_off.svg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { localSignup, googleSignup, error, setError } = useAuthStore();
  const { register, handleSubmit, formState } = useSignupForm();
  const { isSubmitting, errors, isValid } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = handleSubmit(async (data) => {
    const success = await localSignup({
      name: data.name,
      email: data.email,
      password: data.password,
      role: UserRole[data.role as keyof typeof UserRole],
    });

    if (success) router.push("/signin");
  });

  const google = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential as string;
    const result = await googleSignup({ idToken });
    if (result) router.push("/");
  };

  const onError = () => {
    setError("Houve um erro ao realizar o cadastro com o Google.");
  };

  const roles = Object.keys(UserRole).filter((key) => isNaN(Number(key)));

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign up</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Name</label>
            <input
              data-testid="name"
              id="name"
              {...register("name")}
              placeholder="Enter your name"
            />
            <span data-testid="error-name" className={styles.errorMessage}>
              {errors.name?.message}
            </span>
          </div>

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
            <label htmlFor="role">Role</label>
            <select data-testid="role" {...register("role")}>
              {roles.map((role) => (
                <option
                  key={role}
                  value={UserRole[role as keyof typeof UserRole]}
                >
                  {role}
                </option>
              ))}
            </select>
            <span data-testid="error-role" className={styles.errorMessage}>
              {errors.role?.message}
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

          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span className={styles.passwordWraper}>
              <input
                data-testid="confirmPassword"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                placeholder="Confirm your password"
              />
              <span onClick={togglePassword} className={styles.icon}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </span>
            <span
              data-testid="error-confirmPassword"
              className={styles.errorMessage}
            >
              {errors.confirmPassword?.message}
            </span>
          </div>
          <button
            data-testid="submit"
            disabled={isSubmitting || !isValid}
            type="submit"
          >
            Sign up
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
          <span>Already have an account? </span>
          <a href="/signin">Sign in</a>
        </div>
      </div>
    </div>
  );
}
