import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/base/form-control";
import { Input, InputField } from "@/components/base/input";
import { AlertCircleIcon } from "lucide-react-native";

interface Props {
  label?: string;
  type?: "text" | "password";
}

export function TextField({ label, type = "text" }: Props) {
  return (
    <FormControl
      isInvalid={false}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
    >
      <Input
        className="my-1 bg-primary-350 p-4 h-fit  border-primary-350 focus:border-secondary-0"
        size="md"
      >
        <InputField
          placeholder={label}
          type={type}
          className="text-typography-white placeholder:text-base placeholder:text-typography-white"
          value={""}
          onChangeText={(text) => {}}
        />
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          At least 6 characters are required.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
