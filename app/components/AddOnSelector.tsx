import { useState } from "react";
import checkmarkIcon from "~/assets/images/icon-checkmark.svg";

type AddOnSelectorProps = {
  addOnId: string;
  addOnText: string;
  addOnDescription: string;
  addOnPriceMonthly: string;
  addOnPriceYearly: string;
  billingCycle: string;
  onAddOnChange: (
    addOnText: string,
    addOnPrice: string,
    isChecked: boolean,
  ) => void;
};

const AddOnSelector = ({
  addOnId,
  addOnText,
  addOnDescription,
  addOnPriceMonthly,
  addOnPriceYearly,
  billingCycle,
  onAddOnChange,
}: AddOnSelectorProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsChecked = event.target.checked;
    setIsChecked(newIsChecked);
    const addOnPrice =
      billingCycle === "monthly" ? addOnPriceMonthly : addOnPriceYearly;
    onAddOnChange(addOnText, addOnPrice, newIsChecked);
  };

  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-6 rounded-lg border border-neutral-lightGray px-4 py-2 text-primary-marineBlue ${
        isChecked ? "border-primary-purplishBlue bg-neutral-magnolia" : ""
      }`}
    >
      <input
        type="checkbox"
        id={addOnId}
        name="addOnText"
        value={addOnText}
        checked={isChecked}
        className="peer h-6 w-6 flex-shrink-0 appearance-none rounded-sm border border-neutral-lightGray checked:border-primary-purplishBlue checked:bg-primary-purplishBlue"
        style={{
          backgroundImage: `url(${checkmarkIcon})`,
          backgroundSize: "14px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onChange={handleCheckboxChange}
      />
      <input
        type="hidden"
        name={isChecked ? "addOnPriceMonthly" : ""}
        value={isChecked && billingCycle === "monthly" ? addOnPriceMonthly : ""}
      />
      <input
        type="hidden"
        name={isChecked ? "addOnPriceYearly" : ""}
        value={isChecked && billingCycle === "yearly" ? addOnPriceYearly : ""}
      />
      <label
        htmlFor={addOnId}
        className="flex w-full items-center justify-between gap-4"
      >
        <div>
          <p className="font-ubuntu-medium text-sm">{addOnText}</p>
          <p className="text-xs text-neutral-coolGray">{addOnDescription}</p>
        </div>
        <p className="text-sm text-primary-purplishBlue">
          {billingCycle === "monthly" ? addOnPriceMonthly : addOnPriceYearly}
        </p>
      </label>
    </div>
  );
};

export default AddOnSelector;
