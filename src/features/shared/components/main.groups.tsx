import { selectGroupAll } from '../../group/group.slice'
import { useAppSelector } from '../../../store/main.hooks'
import { selectAllContact, type ContactDataType } from '../../contacts/contact.slice'
import React, { useMemo } from "react"
import { GroupSection } from "../../group/group.section"
import './main.groups.scss'

export type MainPagePropType = {
    onReqeustToUpdateContact: (data: {mode: 'create' | 'edit', data: ContactDataType}) => void
}

export const MainPage: React.FC<MainPagePropType> = ({onReqeustToUpdateContact}) => {
    const groups = useAppSelector(selectGroupAll)
    const contacts = useAppSelector(selectAllContact)


    const contactsByGroupId = useMemo(() => {
        return contacts.reduce<Record<string, ContactDataType[]>>((acc, currentValue) => {
            if (!acc[currentValue.groupId]) {
                acc[currentValue.groupId] = []
            }
            acc[currentValue.groupId].push(currentValue)
            return acc
        }, {})
    }, [contacts])


    return <div className="main__groups">
        {groups.length > 0 ? 
        groups.map((group) => (<GroupSection key={group.id} group={group} contacts={contactsByGroupId[group.id]}
        onRequstToUpdateContact={onReqeustToUpdateContact}/>))
        : <h1>Список контактов пуст</h1>}
    </div>
}