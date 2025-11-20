import { Button } from "@/components/base/button";
import { Text } from "@/components/base/text";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onPress?: () => void;
  isSelected?: boolean;
}>;

export function ActiveButton({ onPress, isSelected, children }: Props) {
  return (
    <Button
      onPress={onPress}
      className={`px-6 py-3 rounded-lg  h-fit ${
        isSelected
          ? "bg-primary-300 border-[1px] border-secondary-0"
          : "bg-primary-300 border-[1px] border-primary-300"
      }`}
    >
      <Text
        bold={isSelected}
        size="xs"
        className={`font-roboto uppercase ${
          isSelected ? "text-typography-green" : "text-typography-100"
        }`}
      >
        {children}
      </Text>
    </Button>
  );
}
