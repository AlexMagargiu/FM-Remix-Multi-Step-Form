import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  json,
  useLoaderData,
  redirect,
  useSubmit,
} from "@remix-run/react";
import cookie from "~/utils/entry-server";
import PageNavigation from "~/components/PageNavigation";
import { connectToDatabase, ObjectId } from "~/utils/mongodb.server";
import thankYouIcon from "/images/icon-thank-you.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "Summary" },
    { name: "description", content: "Summary information!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isSubmitted = url.searchParams.get("submitted") === "true";
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const data = {
    name: session.get("name"),
    email: session.get("email"),
    phoneNumber: session.get("phoneNumber"),
    planType: session.get("planType"),
    planPrice: session.get("planPrice"),
    billingCycle: session.get("billingCycle"),
    selectedAddOns: session.get("selectedAddOns") || [],
    selectedAddOnsPrice: session.get("selectedAddOnsPrice") || [],
    isSubmitted,
  };

  return json(data);
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "change") {
    return redirect("/plan", {
      headers: {
        "Set-Cookie": await cookie.commitSession(session),
      },
    });
  }

  const id = session.get("id") || new ObjectId().toString();

  const data = {
    name: session.get("name"),
    email: session.get("email"),
    phoneNumber: session.get("phoneNumber"),
    planType: session.get("planType"),
    planPrice: session.get("planPrice"),
    billingCycle: session.get("billingCycle"),
    selectedAddOns: session.get("selectedAddOns"),
    selectedAddOnsPrice: session.get("selectedAddOnsPrice"),
    createdAt: new Date(),
  };

  const db = await connectToDatabase();
  await db
    .collection("formEntries")
    .updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });

  session.set("id", id);
  return redirect("/summary?submitted=true", {
    headers: {
      "Set-Cookie": await cookie.commitSession(session),
    },
  });
};

export default function Summary() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

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

  const handleChange = () => {
    const formData = new FormData();
    formData.append("action", "change");
    submit(formData, { method: "post" });
  };

  const handleConfirm = () => {
    const formData = new FormData();
    formData.append("action", "confirm");
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, value as string);
      }
    });
    submit(formData, { method: "post" });
  };

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between gap-12 text-primary-marineBlue lg:h-full lg:w-9/12 lg:items-start">
      <Form
        className="flex w-full flex-col gap-4 rounded-lg bg-neutral-white shadow-xl lg:flex lg:h-full lg:w-full lg:flex-col lg:items-start lg:justify-between lg:shadow-none"
        method="post"
      >
        <div className="flex flex-col px-4 py-6 lg:h-full lg:w-full lg:justify-between">
          <div className="flex flex-col gap-3 lg:h-full lg:w-full lg:gap-6">
            {data.isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-2 py-12">
                <img src={thankYouIcon} className="h-12 w-12 lg:h-16 lg:w-16" />
                <h1 className="font-ubuntu-bold text-xl lg:mt-2">Thank you!</h1>
                <p className="text-center text-neutral-coolGray lg:text-sm">
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            ) : (
              <>
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
                      <button
                        type="button"
                        className="mb-4 font-ubuntu-medium text-neutral-coolGray underline hover:text-primary-purplishBlue"
                        onClick={handleChange}
                      >
                        Change
                      </button>
                    </div>
                    <p className="font-ubuntu-bold lg:text-sm">
                      {data.planPrice}
                    </p>
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
                    {data.billingCycle === "monthly"
                      ? "(per month)"
                      : "(per year)"}
                  </p>
                  <p className="font-ubuntu-bold text-primary-purplishBlue">
                    +${totalCost}
                    {data.billingCycle === "monthly" ? "/mo" : "/yr"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        {!data.isSubmitted && (
          <div className="absolute bottom-0 w-[90%] lg:relative lg:w-full lg:px-4">
            <PageNavigation summaryPage={true} onConfirm={handleConfirm} />
          </div>
        )}
      </Form>
    </div>
  );
}
