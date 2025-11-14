import { Box } from "@/components/base/box";
import { Button, ButtonText } from "@/components/base/button";
import { PropsWithChildren } from "react";

interface AppButton {
  variant?: "primary" | "secondary";
}

export function AppButton({
  children,
  variant = "primary",
}: PropsWithChildren<AppButton>) {
  switch (variant) {
    case "primary":
      return (
        <Button className="bg-secondary-50  py-4 px-5 h-fit" variant="solid">
          <ButtonText className="text-base font-roboto text-typography-white">
            {children}
          </ButtonText>
        </Button>
      );
    case "secondary":
      return (
        <Button
          className="border-secondary-0 py-4 px-5 h-fit"
          variant="outline"
        >
          <ButtonText className="text-base font-roboto text-typography-green">
            {children}
          </ButtonText>
        </Button>
      );
    default:
      return (
        <Button className="bg-secondary-50py-4 px-5 h-fit" variant="solid">
          <ButtonText className="text-base font-roboto text-typography-white">
            {children}
          </ButtonText>
        </Button>
      );
  }
}
