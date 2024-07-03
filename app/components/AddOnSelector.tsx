import { useState } from "react";
import checkmarkIcon from "/images/icon-checkmark.svg";

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
    <label
      htmlFor={addOnId}
      className={`flex w-full cursor-pointer items-center gap-6 rounded-lg border border-neutral-lightGray px-4 py-3 text-primary-marineBlue ${
        isChecked ? "border-primary-purplishBlue bg-neutral-magnolia" : ""
      }`}
    >
      <input
        type="checkbox"
        id={addOnId}
        name="addOnText"
        value={addOnText}
        checked={isChecked}
        className="peer h-5 w-5 flex-shrink-0 cursor-pointer appearance-none rounded-[4px] border border-neutral-lightGray checked:border-primary-purplishBlue checked:bg-primary-purplishBlue lg:h-4 lg:w-4"
        style={{
          backgroundImage: `url(${checkmarkIcon})`,
          backgroundSize: "10px",
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
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <p className="font-ubuntu-medium text-sm">{addOnText}</p>
          <p className="text-xs text-neutral-coolGray">{addOnDescription}</p>
        </div>
        <p className="text-sm text-primary-purplishBlue">
          {billingCycle === "monthly" ? addOnPriceMonthly : addOnPriceYearly}
        </p>
      </div>
    </label>
  );
};

export default AddOnSelector;
