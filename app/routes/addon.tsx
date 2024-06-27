import type { MetaFunction } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import AddOnSelector from "~/components/AddOnSelector";
import PageNavigation from "~/components/PageNavigation";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Add-on" },
    { name: "description", content: "Select your add-ons!" },
  ];
};

export default function Index() {
  const params = useParams();
  console.log(params);
  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-max lg:items-start">
      <Form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-neutral-alabaster px-4 py-6 shadow-xl lg:flex lg:h-full lg:max-w-xl lg:flex-col lg:items-start lg:justify-between lg:bg-white lg:px-0 lg:py-4 lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col lg:h-full lg:justify-between">
          <div className="flex flex-col gap-4 lg:h-full lg:gap-8">
            <div className="lg:mt-8">
              <h1 className="font-ubuntu-bold text-2xl">Pick add-ons</h1>
              <p className="max-w-64 text-neutral-coolGray lg:max-w-full">
                Add-ons help enhance your gaming experience.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <AddOnSelector
                addOnId="online"
                addOnText="Online service"
                addOnDescription="Access to multiplayer games"
                addOnPrice="+$1/mo"
              />
              <AddOnSelector
                addOnId="storage"
                addOnText="Larger storage"
                addOnDescription="Extra 1TB of cloud save"
                addOnPrice="+$2/mo"
              />
              <AddOnSelector
                addOnId="profile"
                addOnText="Customizable profile"
                addOnDescription="Custom theme on your profile"
                addOnPrice="+$2/mo"
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
