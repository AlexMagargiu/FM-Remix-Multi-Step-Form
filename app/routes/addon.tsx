import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";
import AddOnSelector from "~/components/AddOnSelector";
import PageNavigation from "~/components/PageNavigation";
import { ObjectId, connectToDatabase } from "~/utils/mongodb.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Add-on" },
    { name: "description", content: "Select your add-ons!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const addOnId = formData.get("addOnId");
  const addOnPrice = formData.get("addOnPrice");
  const id = formData.get("id");

  if (!id) {
    return json({ error: "ID not found" }, { status: 400 });
  }

  const db = await connectToDatabase();

  await db.collection("formEntries").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        addOnId,
        addOnPrice,
        updatedAt: new Date(),
      },
    },
  );

  return redirect(`/summary/?id=${id}`);
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const billingCycle = searchParams.get("billingCycle");
  const formResponse = useActionData<typeof action>();
  const formId = searchParams.get("id");

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
                addOnPrice={`${billingCycle === "monthly" ? "+$1/mo" : "+$10/yr"}`}
              />
              <AddOnSelector
                addOnId="storage"
                addOnText="Larger storage"
                addOnDescription="Extra 1TB of cloud save"
                addOnPrice={`${billingCycle === "monthly" ? "+$2/mo" : "+$20/yr"}`}
              />
              <AddOnSelector
                addOnId="profile"
                addOnText="Customizable profile"
                addOnDescription="Custom theme on your profile"
                addOnPrice={`${billingCycle === "monthly" ? "+$2/mo" : "+$20/yr"}`}
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
