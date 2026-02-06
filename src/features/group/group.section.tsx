import type React from 'react'
import type { ContactDataType } from '../contacts/contact.slice'
import { type GroupDataType } from '../group/group.slice'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ContactCard } from '../contacts/contact.card';
import './group.section.scss'

export type GroupSectionPropsType = {
    group: GroupDataType,
    contacts: ContactDataType[],
    onRequstToUpdateContact: (data: {mode: 'create' | 'edit', data: ContactDataType}) => void
}

export const GroupSection: React.FC<GroupSectionPropsType> = ({ group, contacts, onRequstToUpdateContact }) => {
    const [open, setOpen] = useState<boolean>(false)

    
    return <div className='group__section'>

        <div className='wrapper__header'>
        <div className='group__header'>
            <h3>{group.name}</h3>
            {contacts && <button className='section__toggle' onClick={() => setOpen(!open)}>
                {
                    open ? <ExpandLessIcon  fontSize='medium' sx={{color: 'gray'}}/> :
                        <ExpandMoreIcon fontSize='medium' sx={{color: 'gray'}}/>
                }
            </button>}
        </div>
        </div>

        {contacts && <ul className={`contact__list ${open ? 'contact__list--open': 'contact__list--close'}`}>
                {contacts.map((contact) => (
                        <ContactCard key={contact.id} contactId={contact.id} onRequestUpdate={onRequstToUpdateContact}/>
                ))}
            </ul>}
    </div>

}