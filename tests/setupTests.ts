import { vi } from "vitest";

vi.stubGlobal("location", {
  pathname: "/",
  href: "http://localhost:3000/",
  assign: vi.fn(),
});