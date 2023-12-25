import {
    fetchWallets,
    fetchCommunities,
    fetchCommunity,
    fetchQuest,
    fetchQuests,
    fetchTask,
    fetchUserTaskData
} from "../database.ts";

const resolvers = {
    Query: {
        async Wallets(parent, args, contextValue) {
            const accs = fetchWallets(contextValue.dbPool)
            return accs
        },
        async Community(parent, args, contextValue) {

            const community = await fetchCommunity(contextValue.dbPool, args.id)
            return community
        },
        async Communities(parent, args, contextValue) {
            const communities = await fetchCommunities(contextValue.dbPool)
            return communities
        },
        async Quests(parent, args, contextValue) {
            const quests = await fetchQuests(contextValue.dbPool)
            return quests
        },
        async Quest(parent, args, contextValue) {
            const quest = await fetchQuest(contextValue.dbPool, args.id)
            return quest
        },
        async Task(parent, args, contextValue) {
            const task = await fetchTask(contextValue.dbPool, args.id)
            return task
        },
        async UserTaskCompletion(parent, args, contextValue) {
            const task = await fetchUserTaskData(contextValue.dbPool, args.id, args.wallet)
            if (task.timescompleted > 0) return true
            return false
        },
    }
}

export default resolvers