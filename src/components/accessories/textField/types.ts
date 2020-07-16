import { FieldInputProps } from "formik";
import {
  InputProps,
  FilledInputProps,
  OutlinedInputProps,
} from "@material-ui/core";

export interface IProps {
  className?: string;
  field: FieldInputProps<any>;
  theme: "light" | "regular";
  label: string;
  type?: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any) => void;
  InputProps?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>;
}
