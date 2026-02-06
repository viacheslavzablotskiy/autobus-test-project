import type { ContactDataType } from "./contact.slice";


export class ClassValidator {
    private contacts: ContactDataType[]

    constructor(contacts: ContactDataType[]) {
        this.contacts = contacts
    }

    isPhoneIsUnique(phone: string, exclidingId?: string): boolean {
        return !this.contacts.some((contact) => {
            return contact.phone === phone && contact.id !== exclidingId
        })
    }

}
