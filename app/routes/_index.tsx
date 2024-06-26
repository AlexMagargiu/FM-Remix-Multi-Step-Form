import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import FormInput from "~/components/FormInput";
import PageNavigation from "~/components/PageNavigation";
import cookie from "~/utils/entry-server";

export const meta: MetaFunction = () => {
  return [
    { title: "Info page" },
    { name: "description", content: "Type in your personal information!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const phoneNumber = String(formData.get("phone-number"));

  if (!name || !email || !phoneNumber) {
    return json({ error: "Please fill in all fields" }, { status: 400 });
  }

  const session = await cookie.getSession();
  session.set("name", name);
  session.set("email", email);
  session.set("phoneNumber", phoneNumber);

  return redirect("/plan", {
    headers: {
      "Set-Cookie": await cookie.commitSession(session),
    },
  });
};

export default function InfoPage() {
  const formResponse = useActionData<typeof action>();

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-8/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full lg:w-full">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Personal info</h1>
              <p className="max-w-60 text-sm text-neutral-coolGray lg:max-w-full">
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
          <div className="hidden lg:flex">
            <PageNavigation />
          </div>
        </div>
      </Form>
      <div className="flex w-full items-center justify-center lg:hidden">
        <PageNavigation />
      </div>
    </div>
  );
}
