interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

const FormInput = ({
  label,
  placeholder = "Placeholder",
  name,
  error,
  register,
  icon,
  ...props
}: FormInputProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none text-secondary-9"
      >
        {label}
      </label>
      <div className="flex max-h-10 items-center gap-2 rounded-lg border border-secondary-5 bg-white px-3 py-2 text-secondary-11 placeholder-secondary-7 shadow-default outline-none focus-within:border-primary-3 focus-within:shadow-primary disabled:bg-secondary-2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-secondary-7">
        {icon && icon}
        <input
          className="w-full focus:outline-none"
          id={name}
          autoComplete="off"
          placeholder={placeholder}
          name={name}
          {...props}
          {...register(name)}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
