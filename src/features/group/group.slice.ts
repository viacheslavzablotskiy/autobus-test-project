import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootStateStore } from "../../store/store"



export type GroupDataType = {
    id: string,
    name: string
}


export const groupAdapter = createEntityAdapter({
    selectId: (state: GroupDataType) => state.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})


export const groupSlice = createSlice({
    name: 'group', 
    initialState: groupAdapter.getInitialState(),
    reducers: {
        createNewGroup(state, action: PayloadAction<Pick<GroupDataType, 'name'>>) {
            const id = crypto.randomUUID()
            groupAdapter.addOne(state, {...action.payload, id: id})
        },
        createNewGroups(state, action: PayloadAction<GroupDataType[]>) {
            groupAdapter.addMany(state, action.payload)
        },
        updateGroup(state, action: PayloadAction<GroupDataType>) {
            groupAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {name: action.payload.name}
            })
        },
        updateGroups(state, action: PayloadAction<GroupDataType[]>) {
            groupAdapter.updateMany(state, action.payload.map(group => {
                return {
                    id: group.id,
                    changes: group
                }
            }))
        },
        deleteGroup(state, action: PayloadAction<Pick<GroupDataType, 'id'>>) {
            groupAdapter.removeOne(state, action.payload.id)
        }
    }
})


export default groupSlice.reducer

export const {createNewGroup, deleteGroup, updateGroup, createNewGroups, updateGroups} = groupSlice.actions


export const {selectAll: selectGroupAll,
              selectById: selectGroupById,
              selectIds: selectGroupIds} = groupAdapter.getSelectors((state: RootStateStore) => state.group)