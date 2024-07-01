import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import PageNavigation from "~/components/PageNavigation";
import PlanSelector from "~/components/PlanSelector";
import arcadeIcon from "~/assets/images/icon-arcade.svg";
import advancedIcon from "~/assets/images/icon-advanced.svg";
import proIcon from "~/assets/images/icon-pro.svg";
import { useState } from "react";
import cookie from "~/utils/entry-server";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Plan" },
    { name: "description", content: "Select your plan!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const planType = formData.get("planType");
  const planPrice = formData.get("planPrice");
  const billingCycle = formData.get("billingCycle");

  const session = await cookie.getSession(request.headers.get("Cookie"));
  session.set("planType", planType);
  session.set("planPrice", planPrice);
  session.set("billingCycle", billingCycle);

  return redirect(`/addon`, {
    headers: {
      "Set-Cookie": await cookie.commitSession(session),
    },
  });
};

export default function PlanSelectorPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleBillingCycleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.checked ? "yearly" : "monthly";
    setBillingCycle(newValue);
  };

  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-8/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
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
                isSelected={selectedPlan === "Arcade"}
                onChange={handlePlanChange}
              />
              <PlanSelector
                planIcon={advancedIcon}
                planType="Advanced"
                selectedBillingCycle={billingCycle}
                planPriceMonthly="$12/mo"
                planPriceYearly="$120/yr"
                isSelected={selectedPlan === "Advanced"}
                onChange={handlePlanChange}
              />
              <PlanSelector
                planIcon={proIcon}
                planType="Pro"
                selectedBillingCycle={billingCycle}
                planPriceMonthly="$15/mo"
                planPriceYearly="$150/yr"
                isSelected={selectedPlan === "Pro"}
                onChange={handlePlanChange}
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
