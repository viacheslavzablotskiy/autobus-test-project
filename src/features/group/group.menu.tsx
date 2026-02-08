import type React from "react"
import { selectGroupAll, type GroupDataType } from '../group/group.slice'
import { useEffect, useState } from "react"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { toast } from 'react-toastify'
import { useAppSelector } from "../../store/main.hooks";

import './group.menu.scss'
import { GroupValidator } from "./group.class";

export type GroupMenuPropsType = {
    onRequestCreateGroup: (data: GroupDataType[]) => void,
    onRequestUpdatedGroup: (data: GroupDataType[]) => void,
    onRequestDeleteGroup: (data: GroupDataType) => void,
    onCloseGroupMenu: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
}

export const GroupMenu: React.FC<GroupMenuPropsType> = ({ onRequestCreateGroup, onRequestDeleteGroup, onRequestUpdatedGroup, onCloseGroupMenu, isOpen }) => {
    const groups = useAppSelector(selectGroupAll)
    const [localState, setLocalState] = useState<GroupDataType[]>(groups)

    useEffect(() => {
        setLocalState(groups)
    }, [groups])

    

    const handleChangeLocalState = (id: string, name: string) => {
        setLocalState((prev) => {
            return prev.map((group) => group.id === id ? { ...group, name: name } : group)
        })
    }

    const handleNewField = () => {
        setLocalState((prev) => {
            return [...prev, { id: crypto.randomUUID(), name: '' }]
        })
    }

    const handleSaveGroups = () => {
        const validatedGroup = localState.filter(group => group.name.trim() !== '')
        if (GroupValidator.hasDublicateNames(validatedGroup)) {
            toast.error("Группа с таким именем уже существует")
            return
        }

        const {createdGroups, updatedGroups} = GroupValidator.diff(groups, validatedGroup)
 
        if (createdGroups.length) onRequestCreateGroup(createdGroups)
        if (updatedGroups.length) onRequestUpdatedGroup(updatedGroups)
        onCloseGroupMenu(false)
    }

    return <div className={`group__menu ${isOpen ? 'group__menu--open' : 'group__menu--close'}`}>
        <div className="group__menu__header">
            <h3>Группы контактов</h3>
            <button className="group__menu__back__button" onClick={() => onCloseGroupMenu(false)}>
                <ClearOutlinedIcon fontSize="medium" sx={{ color: "grey" }} />
            </button>
        </div>

        <ul className="group__list">
            {localState.map((group) => (
                <li key={group.id}>
                    <input type="text" value={group.name} onChange={(e) => { handleChangeLocalState(group.id, e.target.value) }} placeholder="Введите название" />
                    <button className="delete-group-icon" onClick={() => { onRequestDeleteGroup(group) }}>
                        <DeleteOutlinedIcon fontSize="medium" sx={{ color: 'grey'}} />
                    </button>
                </li>
            ))}
        </ul>

        <div className="group__menu__toggle">
            <button className="add__group__button" onClick={handleNewField}>Добавить</button>
            <button className="save__group__button" onClick={handleSaveGroups}>Сохранить</button>
        </div>
    </div>
} 