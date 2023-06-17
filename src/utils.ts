import type { GroupT } from "./types/group.type"

export const viableGroups = (gs:GroupT[]) : GroupT[] => {
    return gs.filter((g)=>g.votes>1).sort((a,b)=>a.votes-b.votes);
}