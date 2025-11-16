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
}

export function TextField({
  placeholder,
  color = "PRIMARY",
  type = "text",
}: Props) {
  const bgColor = " bg-".concat(TextFieldColors[color]);
  const borderColor = " border-".concat(TextFieldColors[color]);

  return (
    <FormControl
      isInvalid={false}
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
            value={"asdasd"}
            onChangeText={(text) => {}}
          />
        </Input>
      </VStack>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          At least 6 characters are required.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
