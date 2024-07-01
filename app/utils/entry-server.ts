import { createCookieSessionStorage } from "@remix-run/node";
import { config } from "dotenv";

config();

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not defined");
  }
  return secret;
}

const cookie = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [getSessionSecret()],
    secure: process.env.NODE_ENV === "production",
  },
});

export default cookie;
