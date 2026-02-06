import { useEffect, useState } from 'react'
import { useAppDispatch } from './store/main.hooks'
import { HeaderSite } from './features/shared/header.site'
import { createNewGroups, deleteGroup, updateGroups, type GroupDataType } from './features/group/group.slice'
import { MainPage } from './features/shared/components/main.groups'
import { GroupMenu } from './features/group/group.menu'
import { toast, ToastContainer } from 'react-toastify'
import { createNewContact, deleteContactsByGroupId, updateContact, type ContactDataType } from './features/contacts/contact.slice'
import { ContactMenu } from './features/contacts/contact.menu'
import 'react-toastify/dist/ReactToastify.css';
import './main.page.scss'
import { ConfrimDeletePopUp } from './features/group/confirmation.delete'

function App() {
  const dispatch = useAppDispatch()
  const [opengroupMenu, setOpenGroupMenu] = useState<boolean>(false)
  const [openContantMenu, setOpenContactMenu] = useState<boolean>(false)
  const [initialValue, setInitalValue] = useState<ContactDataType | undefined>(undefined)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [deletePopUp, setDeletePopUp] = useState<{ open: boolean, groupId: string | null }>({ open: false, groupId: null })

  const handleCreateNewGroup = (data: GroupDataType[]) => {
    console.log(data);

    dispatch(createNewGroups(data))
    toast.success('Группы были успешно созданы')
  }

  const handleUpdateGroups = (data: GroupDataType[]) => {
    console.log(data);

    dispatch(updateGroups(data))
    toast.success('Группы были успешно изменены')
  }

  const handleDeleteGroups = (data: Pick<GroupDataType, 'id'>) => {
    setOpenGroupMenu(false)
    setDeletePopUp({ open: true, groupId: data.id })
  }

  const handleConfrimDelete = () => {
    if (deletePopUp.groupId) {
      dispatch(deleteGroup({ id: deletePopUp.groupId }))
      dispatch(deleteContactsByGroupId({ id: deletePopUp.groupId }))
      toast.success("Группа и все контакты были успешно удалены")
      setDeletePopUp({ open: false, groupId: null })
    }
  }

  const handleCancelDelete = () => {
    setDeletePopUp({ open: false, groupId: null })
  }

  const handleCreateNewContact = (data: Omit<ContactDataType, 'id'>) => {
    setOpenContactMenu(false)
    dispatch(createNewContact(data))
    toast.success('Контакт был успешно создан')
  }

  const handleEditContact = (data: {mode: 'create' | 'edit', data: ContactDataType}) => {
    setMode(data.mode)
    setInitalValue(data.data)
    setOpenContactMenu(true)
  }

  const handleUpdateContact = (data: ContactDataType) => {
    setOpenContactMenu(false)
    dispatch(updateContact(data))
    toast.success('Контакт был успешно обновлен')
  }

  const handleOpenMenuForCreate = (open: boolean) => {
    setMode('create')
    setInitalValue(undefined)
    setOpenContactMenu(open)
  }


  return <div className='main__page'>
    <HeaderSite setContactMenu={handleOpenMenuForCreate} setGroupMenu={setOpenGroupMenu} />
    <MainPage onReqeustToUpdateContact={handleEditContact}/>
    <div className={`overlay__group ${opengroupMenu ? 'overlay__contact--show' : 'overlay__contact--hide'}`}>
      <GroupMenu onRequestCreateGroup={handleCreateNewGroup} onRequestDeleteGroup={handleDeleteGroups}
        onRequestUpdatedGroup={handleUpdateGroups} onCloseGroupMenu={setOpenGroupMenu} isOpen={opengroupMenu} />
    </div>
    <div className={`overlay__contact ${openContantMenu ? 'overlay__contact--show' : 'overlay__contact--hide'}`}>
      <ContactMenu onCreateContact={handleCreateNewContact} onCloseContactMenu={setOpenContactMenu} isOpen={openContantMenu}
      mode={mode} initialValue={initialValue} onUpdateContact={handleUpdateContact}/>
    </div>
    {deletePopUp.open && (
      <ConfrimDeletePopUp onRequestConfrimDelete={handleConfrimDelete} onRequestCancelDelete={handleCancelDelete} />
    )}
    <ToastContainer position='top-right' autoClose={3000} />
  </div>
}

export default App
