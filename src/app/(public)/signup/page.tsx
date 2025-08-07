"use client";

import { UserRole } from "@/domain/enums/UserRole";
import { useState } from "react";
import styles from "./page.module.css";

import EyeIcon from "@/shared/icons/visibility.svg";
import EyeOffIcon from "@/shared/icons/visibility_off.svg";

export default function SignupPage() {
  const roles = Object.keys(UserRole).filter((key) => isNaN(Number(key)));

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setValid] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Sign up</h1>
        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your full name" />
            <span className={styles.errorMessage}></span>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <span className={styles.errorMessage}></span>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="role">Role</label>
            <select>
              {roles.map((role) => (
                <option
                  key={role}
                  value={UserRole[role as keyof typeof UserRole]}
                >
                  {role}
                </option>
              ))}
            </select>
            <span className={styles.errorMessage}></span>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <span className={styles.passwordWraper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />
              <span onClick={togglePassword} className={styles.icon}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </span>
            <span className={styles.errorMessage}></span>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span className={styles.passwordWraper}>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
              />
              <span onClick={togglePassword} className={styles.icon}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </span>
            <span className={styles.errorMessage}></span>
          </div>

          <button disabled={isLoading || !isValid} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.links}>
          <span>Already have an account? </span>
          <a href="#">Sign in</a>
        </div>
      </div>
    </div>
  );
}
