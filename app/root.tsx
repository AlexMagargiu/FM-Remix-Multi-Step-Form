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
      <body className="h-screen font-ubuntu-regular lg:flex lg:items-center lg:justify-center lg:bg-neutral-magnolia">
        <div className="relative z-0 h-screen w-full lg:flex lg:h-3/4 lg:max-h-[35rem] lg:w-3/4 lg:max-w-4xl lg:items-center lg:justify-center lg:rounded-xl lg:bg-neutral-white">
          <div className="relative z-10 h-1/4 bg-mobile bg-cover bg-no-repeat"></div>
          <div className="relative z-10 h-3/5 bg-neutral-magnolia bg-cover bg-no-repeat lg:hidden"></div>
          <main className="absolute top-8 z-20 flex h-[calc(100vh-2rem)] w-full flex-col items-center gap-8 lg:top-0 lg:h-full lg:flex-row lg:items-start lg:gap-0 lg:p-3">
            <div className="flex items-center gap-4 bg-cover bg-no-repeat lg:relative lg:flex lg:h-full lg:w-2/5 lg:flex-col lg:items-start lg:gap-6 lg:rounded-lg lg:bg-desktop lg:p-8">
              <NavStep stepNumber={1} stepDescription="YOUR INFO" />
              <NavStep stepNumber={2} stepDescription="SELECT PLAN" />
              <NavStep stepNumber={3} stepDescription="ADD-ONS" />
              <NavStep stepNumber={4} stepDescription="SUMMARY" />
            </div>
            <div className="flex h-full w-full items-center justify-center overflow-auto lg:items-start">
              {children}
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
