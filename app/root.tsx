import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import NavStep from "~/components/NavStep";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <div className="relative z-10 h-1/4 bg-mobile bg-cover bg-no-repeat lg:bg-desktop"></div>
        <div className="relative z-10 h-2/3 bg-neutral-magnolia bg-cover bg-no-repeat lg:bg-desktop"></div>
        <main className="absolute z-50 flex flex-1 flex-col items-center justify-center">
          <div className="flex items-center gap-6 lg:flex lg:flex-col lg:items-start">
            <NavStep stepNumber={1} stepDescription="YOUR INFO" />
            <NavStep stepNumber={2} stepDescription="SELECT PLAN" />
            <NavStep stepNumber={3} stepDescription="ADD-ONS" />
            <NavStep stepNumber={4} stepDescription="SUMMARY" />
          </div>
          <div className="flex-1">{children}</div>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
