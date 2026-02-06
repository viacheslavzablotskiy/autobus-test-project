import type { GroupDataType } from "./group.slice";


export class GroupValidator {
    static hasDublicateNames(groups: GroupDataType[]): boolean {
        const names = groups.map((group) => group.name.toLowerCase())
        return names.length !== new Set(names).size
    }   

    static diff(orignalData: GroupDataType[], currentData: GroupDataType[]) {
        const initialState = new Map(orignalData.map(group => [group.id, group]));
        const {createdGroups, updatedGroups} = currentData.reduce((acc, currentGroup) => {
            const originalGroup = initialState.get(currentGroup.id)

            if (!originalGroup) {
                acc.createdGroups.push(currentGroup)
            } else if (originalGroup.name !== currentGroup.name) {
                acc.updatedGroups.push(currentGroup)
            }
            return acc
        }, {createdGroups: [] as GroupDataType[], updatedGroups: [] as GroupDataType[]})

        return {createdGroups, updatedGroups}
    }
}