"use client";

import { useState } from "react";
import {
  AddressSuggestions,
  DaDataSuggestion,
  DaDataAddress,
} from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import "react-dadata/dist/react-dadata.css";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    name: string;
    label?: string;
    required?: boolean;
  }

export const AddressInputForm = ({ className, name, label, required} : Props) => {
  /* const [value, setValue] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >(); */
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

 

  return (
    <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange } }) => (
            <>
            <AddressSuggestions token="b9e5e2cd38c08d90222ff9f33af37a6dd5794e9b"  onChange={onChange} />
            {errorText && <ErrorText text={errorText}/>}
            </>
        )}
        name={name}
      />
    
  );
};
