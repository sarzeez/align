import {AnyAction} from "redux";
import {Method} from "store/models";

const namespace = 'BRIEFS';

export const GET_TODO_PROJECTS = `${namespace}/GET_TODO_PROJECTS`;
export const GET_MATERIALS_PROJECTS = `${namespace}/GET_MATERIALS_PROJECTS`;
export const GET_TOOLS_PROJECTS = `${namespace}/GET_TOOLS_PROJECTS`;

export const GET_TODO_TASKS_BY_ROOM_ID = `${namespace}/GET_TODO_TASKS_BY_ROOM_ID`;

export const loadTodoProjects = (id: number): AnyAction => ({
    type: GET_TODO_PROJECTS,
    payload: {
        request: {
            method: Method.GET,
            url: `/home_page/todays_brief/todo/?workspace_id=${id}`,
        },
    },
});

export const loadMaterialsProjects = (id: number): AnyAction => {
    return {
        type: GET_MATERIALS_PROJECTS,
        payload: {
            request: {
                method: Method.GET,
                url: `/home_page/todays_brief/materials/?workspace_id=${id}`,
            },
        },
    }
};

export const loadToolsProjects = (id: number): AnyAction => ({
    type: GET_TOOLS_PROJECTS,
    payload: {
        request: {
            method: Method.GET,
            url: `/home_page/todays_brief/tools/?workspace_id=${id}`,
        },
    },
});

export const loadTodoTasksByRoomID = (workspace_id: number, room_id: number): AnyAction => ({
    type: GET_TODO_TASKS_BY_ROOM_ID,
    payload: {
        room_id,
        request: {
            method: Method.GET,
            url: `/home_page/todays_brief/room/${room_id}/punch_lists/?workspace=${workspace_id}`,
        },
    },
});