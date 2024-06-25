import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Add-on" },
    { name: "description", content: "Select your add-ons!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Add on page</h1>
    </div>
  );
}
