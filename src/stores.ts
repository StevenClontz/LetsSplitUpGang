import { persisted } from 'svelte-local-storage-store';
import type { PersonT } from "./types/person.type";
import type { GroupT } from "./types/group.type";

// First param is the local storage key.
// Second param is the initial value.
export const intitalPersons:PersonT[] = [
    {name: "Anne-Fatima"},
    {name: "Boram"},
    {name: "Consolata"},
    {name: "Dalisay"},
    {name: "Edgar"},
    {name: "Fionnuala"},
    {name: "Gurlez"},
    {name: "Hisako"},
    {name: "Inga"},
    {name: "Julia"},
];
export const persons = persisted('persons', intitalPersons, { serializer: {
    stringify: (persons: PersonT[]) => JSON.stringify(persons),
    parse: (json: string) => JSON.parse(json) as PersonT[],
}})
export const intitalGroups:GroupT[] = [
    {name: "Search for a missing archaeologist", votes:1, personNames:[], notes:""},
    {name: "Investigate the legend of a mysterious captain", votes:5, personNames:["Anne-Fatima","Dalisay","Gurlez"], notes:""},
    {name: "Find a pirate's buried treasure", votes:1, personNames:[], notes:""},
    {name: "Explore a deserted mining town", votes:7, personNames:["Boram","Edgar","Hisako","Julia"], notes:""},
    {name: "Impersonate a Great Dane", votes:8, personNames:["Consolata","Fionnuala","Inga"], notes:""},
    {name: "Spend the weekend at a haunted estate", votes:5, personNames:[], notes:""},
];
export const groups = persisted('groups', intitalGroups, { serializer: {
    stringify: (groups: GroupT[]) => JSON.stringify(groups),
    parse: (json: string) => JSON.parse(json) as GroupT[],
}})
