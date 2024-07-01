import { Form, redirect, useLoaderData } from "@remix-run/react";
import PageNavigation from "~/components/PageNavigation";
import { useState } from "react";
import cookie from "~/utils/entry-server";
import { connectToDatabase, ObjectId } from "~/utils/mongodb.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import AddOnSelector from "~/components/AddOnSelector";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Add-on" },
    { name: "description", content: "Select your add-ons!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const name = session.get("name");
  const email = session.get("email");
  const phoneNumber = session.get("phoneNumber");
  const planType = session.get("planType");
  const planPrice = session.get("planPrice");
  const billingCycle = session.get("billingCycle");

  const formData = await request.formData();
  const selectedAddOns = formData.getAll("addOnText");
  const addOnPriceMonthly = formData.getAll("addOnPriceMonthly");
  const addOnPriceYearly = formData.getAll("addOnPriceYearly");

  let selectedAddOnsPrice: string[] = [];

  selectedAddOns.forEach((addOn, index) => {
    const addOnPrice =
      billingCycle === "monthly"
        ? addOnPriceMonthly[index]
        : addOnPriceYearly[index];
    selectedAddOnsPrice.push(addOnPrice as string);
  });

  session.set("selectedAddOns", selectedAddOns);
  session.set("selectedAddOnsPrice", selectedAddOnsPrice);

  const db = await connectToDatabase();
  const id = new ObjectId();

  await db.collection("formEntries").insertOne({
    _id: id,
    name,
    email,
    phoneNumber,
    planType,
    planPrice,
    billingCycle,
    selectedAddOns,
    selectedAddOnsPrice,
    createdAt: new Date(),
  });

  session.set("id", id.toString());

  return redirect("/summary", {
    headers: {
      "Set-Cookie": await cookie.commitSession(session),
    },
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const billingCycle = session.get("billingCycle");

  return { billingCycle };
};

export default function AddOnPage() {
  const handleAddOnChange = (
    addOnText: string,
    addOnPrice: string,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      console.log(addOnText);
      console.log(addOnPrice);
      return { addOnText, addOnPrice };
    } else {
      return { addOnText: "", addOnPrice: "" };
    }
  };

  const { billingCycle } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-8/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full lg:w-full">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Pick add-ons</h1>
              <p className="max-w-64 text-sm text-neutral-coolGray lg:max-w-full">
                Add-ons help enhance your gaming experience.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <AddOnSelector
                addOnId="online"
                addOnText="Online service"
                addOnDescription="Access to multiplayer games"
                addOnPriceMonthly="+$1/mo"
                addOnPriceYearly="+$10/yr"
                billingCycle={billingCycle}
                onAddOnChange={handleAddOnChange}
              />
              <AddOnSelector
                addOnId="storage"
                addOnText="Larger storage"
                addOnDescription="Extra 1TB of cloud save"
                addOnPriceMonthly="+$2/mo"
                addOnPriceYearly="+$20/yr"
                billingCycle={billingCycle}
                onAddOnChange={handleAddOnChange}
              />
              <AddOnSelector
                addOnId="profile"
                addOnText="Customizable profile"
                addOnDescription="Custom theme on your profile"
                addOnPriceMonthly="+$2/mo"
                addOnPriceYearly="+$20/yr"
                billingCycle={billingCycle}
                onAddOnChange={handleAddOnChange}
              />
            </div>
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
