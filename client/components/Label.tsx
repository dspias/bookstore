const Label = ({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
