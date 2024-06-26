import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Info page" },
    { name: "description", content: "Type in your personal information!" },
  ];
};

export default function InfoPage() {
  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-max lg:items-start">
      <Form className="flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:max-w-xl lg:flex-col lg:justify-around lg:bg-white lg:px-0 lg:py-0 lg:shadow-none">
        <div>
          <h1 className="font-ubuntu-bold text-2xl">Personal info</h1>
          <p className="max-w-60 text-neutral-coolGray lg:max-w-full">
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <div className="flex w-full flex-col">
          <label className="text-sm" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Stephen King"
            className="rounded-md border border-neutral-lightGray p-2 font-ubuntu-medium"
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="text-sm" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            placeholder="e.g. stephenking@lorem.com"
            className="rounded-md border border-neutral-lightGray p-2 font-ubuntu-medium"
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="text-sm" htmlFor="phone-number">
            Phone Number
          </label>
          <input
            id="phone-number"
            type="text"
            placeholder="e.g. +1 234 567 890"
            className="rounded-md border border-neutral-lightGray p-2 font-ubuntu-medium"
          />
        </div>
        <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-pastelBlue lg:block lg:self-end">
          Next Step
        </button>
      </Form>
      <button className="mb-4 self-end rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-pastelBlue lg:hidden lg:self-end">
        Next Step
      </button>
    </div>
  );
}
