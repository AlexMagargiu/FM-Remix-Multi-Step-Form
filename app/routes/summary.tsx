import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { connectToDatabase, ObjectId } from "~/utils/mongodb.server";
import cookie from "~/utils/entry-server";

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

  return (
    <div>
      <h1>Summary page</h1>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone Number: {data.phoneNumber}</p>
      <p>Plan Type: {data.planType}</p>
      <p>Plan Price: {data.planPrice}</p>
      <p>Billing Cycle: {data.billingCycle}</p>
      <p>Selected Add-Ons: {data.selectedAddOns.join(", ")}</p>
      <p>Selected Add-Ons Price: {data.selectedAddOnsPrice.join(", ")}</p>
    </div>
  );
}
