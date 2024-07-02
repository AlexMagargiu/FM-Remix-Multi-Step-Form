import { useNavigate } from "@remix-run/react";

type PageNavigationProps = {
  indexPage?: boolean;
  summaryPage?: boolean;
  onConfirm?: () => void;
};

const PageNavigation = ({
  indexPage,
  summaryPage,
  onConfirm,
}: PageNavigationProps) => {
  const navigate = useNavigate();

  /* const handleButtonClick = () => {
    if (summaryPage && onConfirm) {
      onConfirm();
    } else {
      const form = document.querySelector("form");
      if (form) form.submit();
    }
  }; */

  return (
    <div
      className={`${indexPage ? "justify-end" : "justify-between"} my-4 flex w-full items-center font-ubuntu-medium text-sm`}
    >
      {!indexPage && (
        <button
          type="button"
          className="text-neutral-coolGray hover:text-primary-marineBlue"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      )}
      {summaryPage ? (
        <button
          type="button"
          onClick={onConfirm}
          className="self-end rounded-md bg-primary-purplishBlue px-6 py-2 text-neutral-magnolia hover:opacity-60"
        >
          Confirm
        </button>
      ) : (
        <button
          type="submit"
          className="self-end rounded-md bg-primary-marineBlue px-6 py-2 text-neutral-magnolia"
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default PageNavigation;
