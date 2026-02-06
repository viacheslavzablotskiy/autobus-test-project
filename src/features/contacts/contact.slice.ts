import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootStateStore } from "../../store/store"
import type { GroupDataType } from '../group/group.slice'


export type ContactDataType = {
    id: string,
    name: string,
    phone: string,
    groupId: string
}

export const contactAdapter = createEntityAdapter({
    selectId: (state: ContactDataType) => state.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})


export const contactSlice = createSlice({
    name: 'contact',
    initialState: contactAdapter.getInitialState(),
    reducers: {
        createNewContact(state, action: PayloadAction<Omit<ContactDataType, 'id'>>) {
            const id = crypto.randomUUID()
            contactAdapter.addOne(state, {...action.payload, id: id})
        },
        updateContact(state, action: PayloadAction<Partial<Omit<ContactDataType, 'id'>> & {id: string}>) {
            contactAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        },
        deleteContact(state, action:PayloadAction<Pick<ContactDataType, 'id'>>) {
            contactAdapter.removeOne(state, action.payload.id)
        },
        deleteContactsByGroupId(state, action:PayloadAction<Pick<GroupDataType, 'id'>>) {
            const idsToRemove = state.ids.filter((id) => {
                return state.entities[id]?.groupId === action.payload.id
            })
            contactAdapter.removeMany(state, idsToRemove)
        }

    }
})

export const {createNewContact, updateContact, deleteContact, deleteContactsByGroupId} = contactSlice.actions

export default contactSlice.reducer

export const {selectAll: selectAllContact,
              selectById: selectContanctById,
              selectIds: selectContactIds} = contactAdapter.getSelectors((state: RootStateStore) => state.contact)
