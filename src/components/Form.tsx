import type { FormHTMLAttributes } from "react";

const divBaseStyles =
  "fixed inset-0 backdrop-brightness-75 backdrop-blur-sm flex justify-center items-center z-50";
const formBaseStyles =
  "bg-zinc-50 rounded-lg p-8 w-full max-w-lg border border-zinc-100 transition-all hover:border-zinc-200";

function onClose() {
  return null;
}

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export default function Form({ children }: FormProps) {
  return (
    <>
      <div className={`${divBaseStyles}`} onClick={onClose}>
        <form className={`${formBaseStyles}`} onClick={(e) => e.stopPropagation()}>
          {children}
        </form>
      </div>
    </>
  );
}
