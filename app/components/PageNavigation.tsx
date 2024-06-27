import { useNavigate } from "@remix-run/react";

const PageNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="my-4 flex w-full max-w-2xl items-center justify-between font-ubuntu-medium text-sm">
      <button className="text-neutral-coolGray" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        type="submit"
        className="rounded-md bg-primary-marineBlue px-4 py-2 text-primary-lightBlue"
      >
        Next Step
      </button>
    </div>
  );
};

export default PageNavigation;
