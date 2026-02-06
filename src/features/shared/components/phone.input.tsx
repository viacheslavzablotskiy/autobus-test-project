import IMask from 'imask'
import type React from 'react'
import { useEffect, useRef } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import type { ContactDataType } from '../../contacts/contact.slice'

export type PhoneInputProp = {
    register: UseFormRegister<Omit<ContactDataType, 'id'>>
}

export const PhoneInput: React.FC<PhoneInputProp> = ({register}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    
    const phoneRegister = register('phone', {required: true})
    useEffect(() => {
        if (!inputRef.current) return
        const mask = IMask(inputRef.current, {
                mask: "+{7} (000) 000-00-00"
            })
        return () => mask.destroy()
    }, [])

    return <input type="text" placeholder="Введите номер" {...phoneRegister}
    ref={(el) => {
        phoneRegister.ref(el)
        inputRef.current = el
    }}/>
}