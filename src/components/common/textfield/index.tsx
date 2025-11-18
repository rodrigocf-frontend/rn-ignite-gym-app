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

interface Props {
  placeholder?: string;
  color?: "PRIMARY" | "SECONDARY";
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
  const colorClasses = {
    PRIMARY: "bg-primary-350 border-primary-350",
    SECONDARY: "bg-primary-300 border-primary-300",
  };

  return (
    <FormControl
      isInvalid={isInvalid}
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
    >
      <VStack>
        <Input
          className={`my-1 py-4 h-fit focus:border-secondary-0 ${colorClasses[color]}`}
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
