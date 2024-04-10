import React, { useState } from "react";

interface FormInputProps<T> {
  id: string;
  name: string;
  type: string;
  setter: React.Dispatch<React.SetStateAction<T>>;
}

export default function FormInput<T>({
  id,
  name,
  type,
  setter,
}: FormInputProps<T>) {
  const [hidePass, setHidePass] = useState<boolean>(false);

  return (
    <div className="sm:text-sm relative">
      <label className="block pt-1.5 pb-1" htmlFor="email">
        <span>{name}</span>
      </label>
      <input
        id={id}
        className="px-3 border rounded-md w-full h-12 outline-none"
        type={hidePass ? "text" : type}
        placeholder="Enter"
        required
        onChange={(e) => {
          setter((prev) => ({ ...prev, [id]: e.target.value }));
        }}
      />
      {type === "password" && (
        <button
          onClick={() => {
            setHidePass(!hidePass);
          }}
          className="absolute right-0 top-[2.8rem] px-2 underline underline-offset-2"
        >
          {hidePass ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}
