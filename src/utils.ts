import type { GroupT } from "./types/group.type"

export const viable = (g:GroupT) : boolean => {
    return g.votes>1
}

export const decided = (g:GroupT) : boolean => {
    return viable(g) && g.personNames.length>0
}
