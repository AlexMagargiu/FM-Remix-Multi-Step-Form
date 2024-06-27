import { useState } from "react";
import checkmarkIcon from "~/assets/images/icon-checkmark.svg";

type AddOnSelectorProps = {
  addOnId: string;
  addOnText: string;
  addOnDescription: string;
  addOnPrice: string;
};

const AddOnSelector = ({
  addOnId,
  addOnText,
  addOnDescription,
  addOnPrice,
}: AddOnSelectorProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-6 rounded-lg border border-neutral-lightGray px-4 py-2 text-primary-marineBlue ${isChecked ? "border-primary-purplishBlue bg-neutral-magnolia" : ""} `}
    >
      <input
        type="checkbox"
        id={addOnId}
        name="planType"
        value={addOnPrice}
        className="peer h-6 w-6 flex-shrink-0 appearance-none rounded-sm border border-neutral-lightGray checked:border-primary-purplishBlue checked:bg-primary-purplishBlue"
        style={{
          backgroundImage: `url(${checkmarkIcon})`,
          backgroundSize: "14px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor={addOnId}
        className="flex w-full items-center justify-between gap-4"
      >
        <div>
          <p className="font-ubuntu-medium">{addOnText}</p>
          <p className="text-xs text-neutral-coolGray">{addOnDescription}</p>
        </div>
        <p className="text-sm text-primary-purplishBlue">{addOnPrice}</p>
      </label>
    </div>
  );
};

export default AddOnSelector;
