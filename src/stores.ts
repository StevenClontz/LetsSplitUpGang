import { persisted } from 'svelte-local-storage-store'
import { derived } from 'svelte/store';
import type { PersonT } from "./types/person.type";
import type { GroupT } from "./types/group.type";

// First param is the local storage key.
// Second param is the initial value.
export const persons = persisted('persons', [], { serializer: {
    stringify: (persons: PersonT[]) => JSON.stringify(persons),
    parse: (json: string) => JSON.parse(json) as PersonT[],
}})
export const groups = persisted('groups', [], { serializer: {
    stringify: (groups: GroupT[]) => JSON.stringify(groups),
    parse: (json: string) => JSON.parse(json) as GroupT[],
}})
