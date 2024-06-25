type NavStepProps = {
  stepNumber: number;
  stepDescription: string;
};

const NavStep = ({ stepNumber, stepDescription }: NavStepProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 font-ubuntu-regular">
        {stepNumber}
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <h1>STEP {stepNumber}</h1>
        <p>{stepDescription}</p>
      </div>
    </div>
  );
};

export default NavStep;
