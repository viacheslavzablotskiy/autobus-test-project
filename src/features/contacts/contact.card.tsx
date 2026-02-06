import type React from "react"
import { deleteContact, selectContanctById, type ContactDataType } from '../contacts/contact.slice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from "../../store/main.hooks";
import { toast } from "react-toastify";

export type ContactCardPropType = {
    contactId: string,
    onRequestUpdate: (data: {mode: 'create' | 'edit', data: ContactDataType}) => void,
}


export const ContactCard: React.FC<ContactCardPropType> = ({contactId, onRequestUpdate}) => {
    const dispatch = useAppDispatch()
    const currentContact = useAppSelector((state) => selectContanctById(state, contactId))

    const handleDelete = () => {
        dispatch(deleteContact({id: currentContact.id}))
        toast.success('Контакт был успешно удален')
    }

    return <li className="contact__card">
        <div className="card">
        <p>{currentContact.name}</p>
        <div className="contact__info">
            <p>{currentContact.phone}</p>
            <div className="contact__toggle">
                <button className="update__contact" onClick={() => {
                    onRequestUpdate({mode: 'edit', data: currentContact})
                }}>
                        <EditIcon fontSize="medium" sx={{color: 'gray'}}/>
                </button>
                <button className="delete__contact" onClick={handleDelete}>
                        <DeleteForeverIcon fontSize="medium" sx={{color: 'gray'}}/>
                </button>
            </div>
        </div>
        </div>
    </li>
}