import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Info" },
    { name: "description", content: "Type in your personal information!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Info page</h1>
    </div>
  );
}
