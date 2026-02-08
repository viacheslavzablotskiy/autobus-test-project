import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import type React from 'react';
import './header.scss'

export type HeaderSiteProp = {
    setGroupMenu: React.Dispatch<React.SetStateAction<boolean>>
    setContactMenu: (open: boolean) => void 
}


export const HeaderSite: React.FC<HeaderSiteProp> = ({setContactMenu, setGroupMenu}) => {
    return <><header className='header__site'>
        <div className="header__left__side">
                <PermContactCalendarRoundedIcon fontSize='medium' sx={{color: 'blue'}}/>
                <h3>Книга контактов</h3>
        </div>
        <div className="header__right__side">
            <button className="add__contact__button--laptop" onClick={() => setContactMenu(true)}>Добавить контакт  +</button>
            <button className="group__button" onClick={() => setGroupMenu(true)}>Группы</button>
        </div>
    </header>

    <div className='header__button--mobile'>
            <button className='add__contact__button--mobile' onClick={() => setContactMenu(true)}>Добавить контакт  +</button>
    </div>
    </>
}