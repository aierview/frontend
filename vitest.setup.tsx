import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
global.React = React;

vi.mock("@/shared/icons/visibility.svg", () => ({
  default: () => <span data-testid="mock-eye" />,
}));
vi.mock("@/shared/icons/visibility_off.svg", () => ({
  default: () => <span data-testid="mock-eye-off" />,
}));
