import type React from "react"
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { selectAllContact, type ContactDataType } from '../contacts/contact.slice'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useAppSelector } from "../../store/main.hooks";
import { selectGroupAll, type GroupDataType } from '../group/group.slice'
import { PhoneInput } from "./phone.input";
import './contact.menu.scss'
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from "react-toastify";
import { ClassValidator } from "./contact.class";

export type ContactPropType = {
    mode: 'create' | 'edit',
    initialValue?: ContactDataType,
    onCreateContact: (data: Omit<ContactDataType, 'id'>) => void,
    onCloseContactMenu: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    onUpdateContact: (data: ContactDataType) => void
}


export const ContactMenu: React.FC<ContactPropType> = ({ onCreateContact, onCloseContactMenu, isOpen, initialValue, mode, onUpdateContact }) => {
    const contacts = useAppSelector(selectAllContact)
    const { register, control, handleSubmit, reset, formState: {errors}} = useForm<Omit<ContactDataType, 'id'>>()
    
    useEffect(() => {
        if (initialValue) {
            reset({
                name: initialValue.name,
                phone: initialValue.phone,
                groupId: initialValue.groupId
            })
        }
    }, [initialValue, reset])
    
    const groups = useAppSelector(selectGroupAll)

    const onSubmit: SubmitHandler<Omit<ContactDataType, 'id'>> = (data) => {
        const validator = new ClassValidator(contacts)

        if (!validator.isPhoneIsUnique(data.phone, mode === 'edit' ? initialValue?.id : undefined)) {
            toast.error('Контакт с таким телефоном уже существует')
            return
        }

        if (mode === 'create') {
            onCreateContact(data)
        } else if (mode === 'edit') {
            onUpdateContact({...data, id: initialValue!.id})
        }
        reset({name: '', phone: '', groupId: ''})
    }

    return <div className={`contact__menu ${isOpen ? 'contact__menu--open': 'contact__menu--close'}`}>
        <div className="contact__menu__header">
            <h3>Добавление контакта</h3>
            <button className="group__menu__back__button" onClick={() => {
                onCloseContactMenu(false),
                reset({
                    name: '',
                    phone: '',
                    groupId: ''
                })
                }}>
                <ClearOutlinedIcon fontSize="medium" sx={{ color: 'grey' }} />
            </button>
        </div>
        <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input">
                <input type="text" {...register('name', {required: true })} placeholder="Введите ФИО" />
                {errors.name && <p className="error">Поле является обязательным</p>}
            </div>
            <div className="form__input">
                <PhoneInput register={register} />
                {errors.phone && <p className="error">Поле является обязательным</p>}
            </div>
            <div className="form__input">
                <Controller name="groupId" control={control} rules={{ required: "Выберите группу" }} render={({field}) => (
                    <CustomSelect options={groups} onChange={field.onChange} value={field.value}/>
                )}/>
            </div>
            <div className="contact__menu__toggle">
                <button type='submit'>Сохранить</button>
            </div>
        </form>
    </div>
}

export type CustomSelectPropType = {
    options: GroupDataType[],
    value: any,
    onChange: (val: any) => void;
}

export const CustomSelect: React.FC<CustomSelectPropType> = ({ options, value, onChange }) => {
    const [open, setOpen] = useState<boolean>(false)
    
    return <div className="custom__select">
        <div className="select__trigger" onClick={() => { setOpen(!open) }}>
            {value ? <p>{options.find(option => option.id === value)?.name}</p> : <p className="trigger">Выберите группу...</p>}
            {!open ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
        </div>
        {open && (
            <ul className="options__list">
                {options.map((option) => (
                    <li key={option.id} onClick={() => {
                        onChange(option.id)
                        setOpen(false)
                    }}>{option.name}</li>
                ))}
            </ul>
        )}
    </div>
}
