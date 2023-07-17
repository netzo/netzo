import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "../../utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NTextInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  icon?: string;
}

export function NTextInput(props: NTextInputProps) {
  const ui = (ui?: string) => ({
    ...props,
    class: n([
      "ml-0.4em w-full flex-auto n-bg-base !outline-none",
      props.class,
      ui,
    ]),
  });

  const value = useSignal(props.value);

  const onInput = (e: Event) => {
    value.value = e.target.value;
  };

  return (
    <div class="n-text-input flex flex items-center border n-border-base rounded py-1 pl-1 pr-2 focus-within:n-focus-base focus-within:border-context n-bg-base">
      {props.icon && (
        <NIcon icon={props.icon} class="ml-0.3em mr-0.1em text-1.1em op50" />
      )}
      <input {...ui()} value={value.value} onInput={onInput} />
    </div>
  );
}