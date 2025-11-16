import { Box } from "@/components/base/box";
import { Button, ButtonText } from "@/components/base/button";
import { PropsWithChildren } from "react";

interface AppButton {
  variant?: "link" | "outline" | "solid";
  onPress?: () => void;
}

export function AppButton({
  children,
  onPress,
  variant = "solid",
}: PropsWithChildren<AppButton>) {
  switch (variant) {
    case "solid":
      return (
        <Button
          size="md"
          className="bg-secondary-50  py-4 px-5 h-fit"
          variant={variant}
          onPress={onPress}
        >
          <ButtonText className="text-base font-roboto text-typography-white">
            {children}
          </ButtonText>
        </Button>
      );
    case "outline":
      return (
        <Button
          size="md"
          className="border-secondary-0 py-4 px-5 h-fit"
          variant={variant}
          onPress={onPress}
        >
          <ButtonText className="font-roboto text-typography-green">
            {children}
          </ButtonText>
        </Button>
      );
    case "link":
      return (
        <Button size="md" variant={variant} onPress={onPress}>
          <ButtonText className="font-roboto text-typography-green">
            {children}
          </ButtonText>
        </Button>
      );
    default:
      return (
        <Button
          size="md"
          className="bg-secondary-50  py-4 px-5 h-fit"
          variant={variant}
          onPress={onPress}
        >
          <ButtonText className="font-roboto text-typography-white">
            {children}
          </ButtonText>
        </Button>
      );
  }
}
