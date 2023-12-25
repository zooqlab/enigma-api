import mysql, {PoolConnection, RowDataPacket} from "mysql2/promise"
import https from 'https'

import {Pool} from "mysql2/typings/mysql/lib/Pool";
const connectionPool: Pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'Enigma',
    connectionLimit: 10
});


async function fetchWallets(pool: Pool):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    let accounts = []
    const [rows] = await connection.execute<RowDataPacket>('SELECT account FROM Accounts')
    rows.map(row => {
        if (!accounts.includes(row.account)) accounts.push(row.account)
    })
    connection.release()
    return accounts
}

async function fetchCommunities(pool: Pool):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    let communities = []
    const [rows] = await connection.execute<RowDataPacket>('SELECT * FROM Communities')
    rows.map(row => {
        communities.push({communityName: row.communityName,  banners: row.banners, communityId: row.communityId, score: row.score, followers: row.followers, account: row.account, avatar: row.avatar})
    })
    connection.release()
    return communities
}

async function fetchCommunity(pool: Pool, communityId):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    const [rows] = await connection.execute<RowDataPacket>('SELECT * FROM Communities WHERE communityId = ?', [communityId])
    const [questsRows] = await connection.execute<RowDataPacket>('SELECT questId, questName FROM Quests WHERE relatedcommunity = ?', [communityId])
    const community = rows[0]
    let quests = []
    questsRows.map(row => {
        quests.push({questId: row.questId, questName: row.questName})
    })
    console.log(quests)
    community['quests'] = quests
    connection.release()
    return community
}

async function fetchQuests(pool: Pool):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    let quests = []
    const [rows] = await connection.execute<RowDataPacket>('SELECT questId, questName FROM Quests')
    //const [tasks] = await connection.execute<RowDataPacket>('SELECT questId, questName FROM Tasks')
    rows.map(row => {
        quests.push({questId: row.questId, questName: row.questName})//, communityId: row.communityId, score: row.score, followers: row.followers, account: row.account, avatar: row.avatar})
    })
    console.log(quests)
    connection.release()
    return quests
}

async function fetchQuest(pool: Pool, questId):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    const [rows] = await connection.execute<RowDataPacket>('SELECT * FROM Quests WHERE questId = ?', [questId])
    const [tasks] = await connection.execute<RowDataPacket>('SELECT * FROM Tasks WHERE relatedquest = ?', [questId])
    let quest = rows[0]
    quest["tasks"] = tasks
    connection.release()
    return quest
}

async function fetchTask(pool: Pool, taskId):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    const [rows] = await connection.execute<RowDataPacket>('SELECT * FROM Tasks WHERE taskId = ?', [taskId])
    let task = rows[0]
    connection.release()
    return task
}

async function fetchUserTaskData(pool: Pool, taskId, account):Promise<RowDataPacket[]> {
    const connection = await pool.getConnection() as PoolConnection
    const [rows] = await connection.execute<RowDataPacket>('SELECT * FROM Tasks WHERE taskId = ? AND account = ?', [taskId, account])
    let task = rows[0]
    connection.release()
    return task
}

export {connectionPool, fetchWallets, fetchCommunities, fetchCommunity, fetchQuests, fetchQuest, fetchTask, fetchUserTaskData}


