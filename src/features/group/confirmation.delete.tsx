import ClearIcon from '@mui/icons-material/Clear';
import type React from 'react';
import './confirmation.delete.scss'

export type PropConfrimDeleteType = {
    onRequestConfrimDelete: () => void,
    onRequestCancelDelete: () => void
}

export const ConfrimDeletePopUp: React.FC<PropConfrimDeleteType> = ({ onRequestConfrimDelete, onRequestCancelDelete }) => {
    return <div className='popup__overlay'>
        <div className='pop__up'>
            <button className='button__close' onClick={onRequestCancelDelete}>
                <ClearIcon fontSize='medium' sx={{color: 'gray'}}/>
            </button>   
            <h3>Удалить группу?</h3>
            <p>
                Удаление группы повлечет за собой удаление всех <br/> контактов
                связанных c этой группой.
            </p>
            <div className='popup__action'>
                <button className='confirm__button' onClick={onRequestConfrimDelete}>Да, удалить</button>
                <button className='cancel__button' onClick={onRequestCancelDelete}> Отмена</button>
            </div>
        </div>
    </div>
}