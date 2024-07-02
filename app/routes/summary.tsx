import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { connectToDatabase, ObjectId } from "~/utils/mongodb.server";
import cookie from "~/utils/entry-server";
import PageNavigation from "~/components/PageNavigation";

export const meta: MetaFunction = () => {
  return [
    { title: "Summary" },
    { name: "description", content: "Summary information!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const id = session.get("id");

  if (!id) {
    throw new Error("ID not found in session");
  }

  const db = await connectToDatabase();
  const document = await db
    .collection("formEntries")
    .findOne({ _id: new ObjectId(id) });

  if (!document) {
    throw new Error("Document not found");
  }

  return json(document);
};

export default function Summary() {
  const data = useLoaderData<typeof loader>();

  const cleanPrice = (price: string) => {
    return parseFloat(price.replace(/[^\d.]/g, ""));
  };

  const calculateTotalCost = () => {
    const planPrice = cleanPrice(data.planPrice);
    const addOnsTotal = data.selectedAddOnsPrice.reduce(
      (total: number, price: string) => {
        return total + cleanPrice(price);
      },
      0,
    );
    return planPrice + addOnsTotal;
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-9/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-white shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col px-4 py-6 lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-3 lg:h-full lg:w-full lg:gap-6">
            <div className="flex flex-col gap-2 lg:mt-4 lg:gap-0">
              <h1 className="font-ubuntu-bold text-2xl">Finishing up</h1>
              <p className="min-w-64 max-w-full text-sm text-neutral-coolGray">
                Double-check everything looks OK before confirming.
              </p>
            </div>
            <div className="flex flex-col rounded-lg bg-neutral-alabaster p-4">
              <div className="flex items-center justify-between border-b border-neutral-lightGray">
                <div>
                  <p className="font-ubuntu-bold">
                    {data.planType} ({data.billingCycle})
                  </p>
                  <button className="mb-4 font-ubuntu-medium text-neutral-coolGray underline hover:text-primary-purplishBlue">
                    Change
                  </button>
                </div>
                <p className="font-ubuntu-bold lg:text-sm">{data.planPrice}</p>
              </div>
              {data.selectedAddOns.length > 0 &&
                data.selectedAddOns.map((addOn: string, index: number) => (
                  <div
                    key={index}
                    className="mt-4 flex items-center justify-between"
                  >
                    <p className="font-ubuntu-medium text-neutral-coolGray lg:text-sm">
                      {addOn}
                    </p>
                    <p className="font-ubuntu-medium lg:text-sm">
                      {data.selectedAddOnsPrice[index]}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-between px-6 pt-4">
              <p className="text-neutral-coolGray lg:text-sm">
                Total{" "}
                {data.billingCycle === "monthly" ? "(per month)" : "(per year)"}
              </p>
              <p className="font-ubuntu-bold text-primary-purplishBlue">
                +${totalCost}
                {data.billingCycle === "monthly" ? "/mo" : "/yr"}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-[90%] lg:relative lg:w-full lg:px-4">
          <PageNavigation indexPage={false} summaryPage={true} />
        </div>
      </Form>
    </div>
  );
}
