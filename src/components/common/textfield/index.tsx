import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/base/form-control";
import { Input, InputField } from "@/components/base/input";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";
import { AlertCircleIcon } from "lucide-react-native";

enum TextFieldColors {
  PRIMARY = "primary-350",
  SECONDARY = "primary-300",
}

interface Props {
  placeholder?: string;
  color?: keyof typeof TextFieldColors;
  type?: "text" | "password";
  value: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  isInvalid: boolean;
  errorMessage?: string;
}

export function TextField({
  placeholder,
  color = "PRIMARY",
  type = "text",
  errorMessage,
  isInvalid,
  onBlur,
  onChangeText,
  value,
}: Props) {
  const bgColor = " bg-".concat(TextFieldColors[color]);
  const borderColor = " border-".concat(TextFieldColors[color]);

  return (
    <FormControl
      isInvalid={isInvalid}
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
    >
      <VStack>
        <Input
          className={"my-1 py-4 h-fit focus:border-secondary-0"
            .concat(bgColor)
            .concat(borderColor)}
          size="sm"
        >
          <InputField
            placeholder={placeholder}
            type={type}
            className="text-typography-white placeholder:text-base placeholder:text-typography-white"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
        </Input>
      </VStack>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
