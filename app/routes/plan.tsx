import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Plan" },
    { name: "description", content: "Select your plan!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Plan page</h1>
    </div>
  );
}
