type PlanSelectorProps = {
  planIcon: any;
  planType: string;
  selectedBillingCycle: string;
  planPriceMonthly: string;
  planPriceYearly: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: any;
};

const PlanSelector = ({
  planIcon,
  planType,
  selectedBillingCycle,
  planPriceMonthly,
  planPriceYearly,
  isSelected,
  onChange,
  error,
}: PlanSelectorProps) => {
  return (
    <div className="relative w-full lg:w-36">
      <input
        type="radio"
        id={planType}
        name="planType"
        value={planType}
        className="peer hidden"
        onChange={onChange}
      />
      <label
        htmlFor={planType}
        className={`flex cursor-pointer items-start gap-4 rounded-lg border ${
          error ? "border-primary-strawberryRed" : "border-neutral-lightGray"
        } px-4 py-2 text-primary-marineBlue hover:border-primary-purplishBlue peer-checked:border-primary-purplishBlue peer-checked:bg-neutral-magnolia lg:w-full lg:flex-col lg:items-start lg:gap-10 lg:py-4`}
      >
        <img src={planIcon} alt={`${planType} icon`} className="my-2 h-9 w-9" />
        <div className="flex h-full flex-col justify-center">
          <span className="h-6 font-ubuntu-bold">{planType}</span>
          {selectedBillingCycle === "monthly" ? (
            <p className="h-6 font-ubuntu-medium text-sm text-neutral-coolGray">
              {planPriceMonthly}
            </p>
          ) : (
            <>
              <p className="h-6 font-ubuntu-medium text-sm text-neutral-coolGray">
                {planPriceYearly}
              </p>
              <p className="h-6 font-ubuntu-medium text-xs">2 months free</p>
            </>
          )}
        </div>
      </label>
      {isSelected && (
        <input
          type="hidden"
          name="planPrice"
          value={
            selectedBillingCycle === "monthly"
              ? planPriceMonthly
              : planPriceYearly
          }
        />
      )}
    </div>
  );
};

export default PlanSelector;
