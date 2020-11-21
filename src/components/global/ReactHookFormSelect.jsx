import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  helperMessage,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select id={labelId} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      <FormHelperText>{helperMessage}</FormHelperText>
    </FormControl>
  );
};
export default ReactHookFormSelect;