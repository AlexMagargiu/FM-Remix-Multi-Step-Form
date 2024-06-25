import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Summary" },
    { name: "description", content: "Summary information!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Summary page</h1>
    </div>
  );
}
