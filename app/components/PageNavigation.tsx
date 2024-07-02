import { useNavigate } from "@remix-run/react";

type PageNavigationProps = {
  indexPage: boolean;
  summaryPage: boolean;
};

const PageNavigation = ({ indexPage, summaryPage }: PageNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${indexPage ? "justify-end" : "justify-between"} my-4 flex w-full items-center font-ubuntu-medium text-sm`}
    >
      {!indexPage && (
        <button
          className="text-neutral-coolGray hover:text-primary-marineBlue"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      )}
      <button
        type="submit"
        className={`${summaryPage ? "bg-primary-purplishBlue hover:opacity-60" : "bg-primary-marineBlue"} self-end rounded-md px-6 py-2 text-neutral-magnolia`}
      >
        {summaryPage ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
};

export default PageNavigation;
