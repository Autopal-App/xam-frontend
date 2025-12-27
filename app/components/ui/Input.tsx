import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;