import { gql } from "./__generated__";

/** タスク一覧取得用クエリー */
export const tasksQuery = gql(`
    query TasksQuery($orderBy: [tasksOrderBy!]) {
        tasksCollection(orderBy: $orderBy) {
            edges {
            node {
                title
                is_completed
                id
            }
            }
        }
    }
`);

/** 新規タスク作成用ミューテーション */
export const taskInsert = gql(`
    mutation TaskMutation($objects: [tasksInsertInput!]!) {
        insertIntotasksCollection(objects: $objects) {
            records {
            title
            }
        }
    }
`);

/** タスクのステータス更新用ミューテーション */
export const taskUpdate = gql(`
    mutation Mutation($set: tasksUpdateInput!, $filter: tasksFilter) {
        updatetasksCollection(set: $set, filter: $filter) {
            records {
                is_completed
            }
        }
    }
`);
