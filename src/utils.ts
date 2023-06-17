import type { GroupT } from "./types/group.type"

type Opts = {
    considerMembers?: boolean;
};

export const viableGroups = (gs:GroupT[],opts?:Opts) : GroupT[] => {
    let result = gs.filter((g)=>g.votes>1).sort((a,b)=>a.votes-b.votes);
    if (opts?.considerMembers) {
        result = result.filter((g)=>g.personNames.length>1)
    }
    return result
}