import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useActionData,
  useSearchParams,
} from "@remix-run/react";
import PageNavigation from "~/components/PageNavigation";
import PlanSelector from "~/components/PlanSelector";
import arcadeIcon from "~/assets/images/icon-arcade.svg";
import advancedIcon from "~/assets/images/icon-advanced.svg";
import proIcon from "~/assets/images/icon-pro.svg";
import { useState } from "react";
import { connectToDatabase, ObjectId } from "~/utils/mongodb.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Plan" },
    { name: "description", content: "Select your plan!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const planType = formData.get("planType");
  const planMonthlyPrice = formData.get("planPriceMonthly");
  const planYearlyPrice = formData.get("planPriceYearly");
  const billingCycle = formData.get("billingCycle");
  const id = formData.get("id");

  console.log(id);

  if (typeof id !== "string") {
    return json({ error: "ID is not a string" }, { status: 400 });
  }

  if (!ObjectId.isValid(id)) {
    return json({ error: "Invalid ID" }, { status: 400 });
  }

  const db = await connectToDatabase();

  try {
    await db.collection("formEntries").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          planType,
          planMonthlyPrice,
          planYearlyPrice,
          billingCycle,
          updatedAt: new Date(),
        },
      },
    );

    return redirect(`/addon/?id=${id}&billingCycle=${billingCycle}`);
  } catch (error) {
    console.error("Error updating MongoDB document:", error);
    return json({ error: "Failed to update document" }, { status: 500 });
  }
};

export default function PlanSelectorPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const formResponse = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("id");

  const handleBillingCycleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.checked ? "yearly" : "monthly";
    setBillingCycle(newValue);
  };

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-8/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <input type="hidden" name="id" value={formId || ""} />
        <div className="flex flex-col lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full lg:w-full">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Select your plan</h1>
              <p className="max-w-60 text-sm text-neutral-coolGray lg:max-w-full">
                You have the option of monthly or yearly billing.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
              <PlanSelector
                planIcon={arcadeIcon}
                planType="Arcade"
                selectedBillingCycle={billingCycle}
                planPriceMonthly="$9/mo"
                planPriceYearly="$90/yr"
              />
              <PlanSelector
                planIcon={advancedIcon}
                planType="Advanced"
                selectedBillingCycle={billingCycle}
                planPriceMonthly="$12/mo"
                planPriceYearly="$120/yr"
              />
              <PlanSelector
                planIcon={proIcon}
                planType="Pro"
                selectedBillingCycle={billingCycle}
                planPriceMonthly="$15/mo"
                planPriceYearly="$150/yr"
              />
            </div>
            <div className="flex w-full items-center justify-center gap-8 rounded-md bg-neutral-magnolia p-2 font-ubuntu-medium">
              <p
                className={`${billingCycle === "monthly" ? "text-primary-marineBlue" : "text-neutral-coolGray"}`}
              >
                Monthly
              </p>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch"
                  type="checkbox"
                  className="peer sr-only"
                  checked={billingCycle === "yearly"}
                  onChange={handleBillingCycleChange}
                />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-10 rounded-full border bg-primary-marineBlue after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:border after:bg-neutral-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
              </label>
              <p
                className={`${billingCycle === "yearly" ? "text-primary-marineBlue" : "text-neutral-coolGray"}`}
              >
                Yearly
              </p>
            </div>
          </div>
          <div className="hidden lg:flex">
            <PageNavigation />
          </div>
        </div>
        <input type="hidden" name="billingCycle" value={billingCycle} />
      </Form>
      <div className="flex w-full items-center justify-center lg:hidden">
        <PageNavigation />
      </div>
    </div>
  );
}
