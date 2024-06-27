type PlanSelectorProps = {
  planIcon: any;
  planType: string;
  selectedBillingCycle: string;
  planPriceMonthly: string;
  planPriceYearly: string;
};

const PlanSelector = ({
  planIcon,
  planType,
  selectedBillingCycle,
  planPriceMonthly,
  planPriceYearly,
}: PlanSelectorProps) => {
  return (
    <div className="relative">
      <input
        type="radio"
        id={planType}
        name="planType"
        value={planType}
        className="peer hidden"
      />
      <label
        htmlFor={planType}
        className="flex cursor-pointer items-center gap-4 rounded-lg border border-neutral-lightGray px-4 py-2 text-primary-marineBlue peer-checked:border-primary-purplishBlue peer-checked:bg-neutral-magnolia lg:w-32 lg:flex-col lg:items-start lg:gap-10 lg:py-4"
      >
        <img src={planIcon} alt={`${planType} icon`} className="h-8 w-8" />
        <div className="flex h-full flex-col justify-center">
          <span className="font-ubuntu-bold">{planType}</span>
          {selectedBillingCycle === "monthly" ? (
            <p className="font-ubuntu-medium text-sm text-neutral-coolGray">
              {planPriceMonthly}
            </p>
          ) : (
            <>
              <p className="font-ubuntu-medium text-sm text-neutral-coolGray">
                {planPriceYearly}
              </p>
              <p className="font-ubuntu-medium text-xs">2 months free</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default PlanSelector;
