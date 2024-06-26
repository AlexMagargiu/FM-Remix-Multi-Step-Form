import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Plan" },
    { name: "description", content: "Select your plan!" },
  ];
};

export default function PlanSelectorPage() {
  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-max lg:items-start">
      <Form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:max-w-xl lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col lg:h-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Select your plan</h1>
              <p className="max-w-60 text-neutral-coolGray lg:max-w-full">
                You have the option of monthly or yearly billing.
              </p>
            </div>
            <div></div>
          </div>
          <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:block lg:self-start">
            Go Back
          </button>
          <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:block lg:self-end">
            Next Step
          </button>
        </div>
      </Form>
      <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:block lg:self-start">
        Go Back
      </button>
      <button className="mt-4 hidden rounded-md bg-primary-marineBlue px-4 py-2 font-ubuntu-bold text-sm text-primary-lightBlue lg:block lg:self-end">
        Next Step
      </button>
    </div>
  );
}
