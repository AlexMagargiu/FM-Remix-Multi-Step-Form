type FormInputProps = {
  labelText: string;
  id: string;
  inputType: string;
  placeholder: string;
  error: any;
};

const FormInput = ({
  labelText,
  id,
  inputType,
  placeholder,
  error,
}: FormInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
        {error && (
          <p className="text-right text-xs text-red-500">
            This field is required
          </p>
        )}
      </div>
      <input
        id={id}
        name={id}
        type={inputType}
        placeholder={placeholder}
        className={`rounded-md border ${
          error ? "border-red-500" : "border-neutral-lightGray"
        } p-2 font-ubuntu-medium outline-none focus:border-primary-purplishBlue`}
      />
    </div>
  );
};

export default FormInput;
