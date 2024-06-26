import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import FormInput from "~/components/FormInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Info page" },
    { name: "description", content: "Type in your personal information!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phoneNumber = formData.get("phone-number");

  if (!name || !email || !phoneNumber) {
    return { error: "Please fill in all fields" };
  }

  console.log({ name, email, phoneNumber });
  return redirect("/plan/");
};

export default function InfoPage() {
  const formResponse = useActionData<typeof action>();

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-max lg:items-start">
      <Form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:max-w-xl lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col lg:h-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Personal info</h1>
              <p className="max-w-60 text-neutral-coolGray lg:max-w-full">
                Please provide your name, email address, and phone number.
              </p>
            </div>
            <FormInput
              labelText="Name"
              id="name"
              inputType="text"
              placeholder="e.g. Stephen King"
              error={formResponse?.error}
            />
            <FormInput
              labelText="Email Address"
              id="email"
              inputType="email"
              placeholder="e.g. stephenking@lorem.com"
              error={formResponse?.error}
            />
            <FormInput
              labelText="Phone Number"
              id="phone-number"
              inputType="tel"
              placeholder="e.g. +1 234 567 890"
              error={formResponse?.error}
            />
          </div>
          <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:block lg:self-end">
            Next Step
          </button>
        </div>
      </Form>
      <button className="mb-4 self-end rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:hidden lg:self-end">
        Next Step
      </button>
    </div>
  );
}
