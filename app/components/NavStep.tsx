type NavStepProps = {
  stepNumber: number;
  stepDescription: string;
};

const NavStep = ({ stepNumber, stepDescription }: NavStepProps) => {
  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
      <div className="relative h-8 w-8 font-ubuntu-bold text-sm text-neutral-magnolia">
        <input
          type="radio"
          value={stepNumber}
          id={`form-step-${stepNumber}`}
          name="form-step"
          className="peer absolute opacity-0"
          defaultChecked={stepNumber === 1}
          disabled={true}
        />
        <label
          htmlFor={`form-step-${stepNumber}`}
          className="z-10 flex h-full w-full items-center justify-center rounded-full border border-neutral-magnolia peer-checked:border-primary-lightBlue peer-checked:bg-primary-lightBlue peer-checked:text-primary-marineBlue"
        >
          {stepNumber}
        </label>
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <h1 className="text-xs text-neutral-coolGray">STEP {stepNumber}</h1>
        <p className="font-ubuntu-medium text-sm text-neutral-alabaster">
          {stepDescription}
        </p>
      </div>
    </div>
  );
};

export default NavStep;
