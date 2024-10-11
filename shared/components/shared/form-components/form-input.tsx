'use client'

import { InputHTMLAttributes } from "react"
import { Input } from "../../ui"
import { RequiredSymbol } from "../required-symbol"
import { ErrorText } from "../error-text"
import { ClearButton } from "../clear-button"
import { useFormContext } from "react-hook-form"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    required?: boolean
    className?: string
}

export const FormInput = ({name, label, required, className, ...props}: Props) => {
    const { 
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
     } = useFormContext() // retrieve all hook methods


      const error = errors[name]?.message as string
      

      const onClearClick = (e: any) => {
        e.preventDefault()
        setValue(name, '')
    }

  return (
    <div className={className}>
        {label && (
            <p className="font-medium mb-2">
                {label} {required && <RequiredSymbol />}
            </p>
        )}
        <div className="relative">
            <Input className="h-12 text-md" {...register(name)} {...props} />

            <ClearButton onClick={onClearClick}/>
        </div>

        {error && <ErrorText text={error} className="mt-2" />}
        
    </div>
  )
}
