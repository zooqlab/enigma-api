import {gql} from "apollo-server-core";

const typeDefs = gql`
    type Query {
        Wallets: [String]
        Community(id: String!): Community
        Communities: [Community]
        Quest(id: String!): Quest
        Quests: [Quest]
        Task(id: String): Task
        UserTaskCompletion(id: String!, wallet: String!) : Boolean
    }
    
    
    
    
    type twittAuthAnswer {
        link: String,
        secret: String,
        added: Boolean
    }
    
    type Community {
        communityId: String!
        communityName: String!
        score: Int
        avatar: String
        account: String
        followers: Int
        quests: [Quest]
        banners: [String]
    }
    
    type Quest {
        questId: String!
        questName: String
        end: Int
        avatar: String
        account: String
        tasks: [Task]
        relatedcommunity: String
        nfts: [String]
        wls: Int
        
       
    }
    
    type Task {
        taskId: String!
        taskName: String
        account: String
        relatedquest: String
        type: String
        requirements: String
        reward: Int
        completedat: Int
        description: String
        timescompleted: Int
    }
    
    
    
    scalar JSON
`




export default typeDefs