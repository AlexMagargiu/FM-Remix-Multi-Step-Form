import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import FormInput from "~/components/FormInput";
import PageNavigation from "~/components/PageNavigation";
import cookie from "~/utils/entry-server";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Info page" },
    { name: "description", content: "Type in your personal information!" },
  ];
};

const formSchema = z.object({
  name: z.string().min(4, { message: "Must be at least 4 characters long" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  phoneNumber: z
    .number({ message: "Must be a number" })
    .min(8, { message: "Must be at least 8 characters long" }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const phoneNumber = Number(formData.get("phone-number"));

  const validationResult = formSchema.safeParse({ name, email, phoneNumber });

  if (!validationResult.success) {
    return json(
      {
        error: "Please fill in all fields correctly",
        details: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
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
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-9/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-white shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col px-4 py-6 lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-3 lg:h-full lg:w-full lg:gap-6">
            <div className="flex flex-col gap-2 lg:mt-4 lg:gap-0">
              <h1 className="font-ubuntu-bold text-2xl">Personal info</h1>
              <p className="min-w-64 max-w-full text-sm text-neutral-coolGray">
                Please provide your name, email address, and phone number.
              </p>
            </div>
            <FormInput
              labelText="Name"
              id="name"
              inputType="text"
              placeholder="e.g. Stephen King"
              error={formResponse?.details?.name?.[0]}
            />
            <FormInput
              labelText="Email Address"
              id="email"
              inputType="email"
              placeholder="e.g. stephenking@lorem.com"
              error={formResponse?.details?.email?.[0]}
            />
            <FormInput
              labelText="Phone Number"
              id="phone-number"
              inputType="tel"
              placeholder="e.g. +1 234 567 890"
              error={formResponse?.details?.phoneNumber?.[0]}
            />
          </div>
        </div>
        <div className="absolute bottom-0 w-[90%] lg:relative lg:w-full lg:px-4">
          <PageNavigation indexPage={true} />
        </div>
      </Form>
    </div>
  );
}
