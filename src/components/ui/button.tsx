import { cn } from "tr-cn";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full bg-primary text-white py-2 rounded-full",
        className
      )}
      {...props}
    />
  );
}
