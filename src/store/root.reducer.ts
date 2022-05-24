import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ReduxPersistConfig} from 'store/helpers';

import AuthReducer, {
  STATE_KEY as AUTH_STATE_KEY,
} from './reducers/auth.reducer';

import ProfileReducer, {
  STATE_KEY as PROFILE_STATE_KEY,
} from './reducers/profile.reducer';

import GeolocationReducer, {
  STATE_KEY as GETLOCATION_STATE_KEY,
} from './reducers/geolocation.reducer';

import SocketReducer, {
  STATE_KEY as SOCKET_STATE_KEY,
} from './reducers/socket.reducer';

import AccessReducer, {
  STATE_KEY as ACCESS_STATE_KEY,
} from './reducers/accesses.reducer';

import MessagesReducer, {
  STATE_KEY as MESSAGES_STATE_KEY,
} from './reducers/messages.reducer';

import WorkspaceReducer, {
  STATE_KEY as WORKSPACE_STATE_KEY,
} from './reducers/workspace.reducer';

import ProjectReducer, {
  STATE_KEY as PROJECT_STATE_KEY,
} from './reducers/project.reducer';

import RoomReducer, {
  STATE_KEY as ROOM_STATE_KEY,
} from './reducers/room.reducer';

import HomePageReducer, {
  STATE_KEY as HOME_PAGE_KEY,
} from './reducers/homepage.reducer';

import MaterialToolReducer, {
  STATE_KEY as MATERIAL_TOOL_KEY,
} from './reducers/material.tool.reducer';

import BriefsReducer, {
  STATE_KEY as BRIEFS_KEY,
} from './reducers/briefs.reducer';

const accessPersistConfig = {
  key: 'access',
  storage: AsyncStorage,
  blacklist: ['security'],
};

const rootReducer = combineReducers({
  [AUTH_STATE_KEY]: AuthReducer,
  [PROFILE_STATE_KEY]: ProfileReducer,
  [GETLOCATION_STATE_KEY]: GeolocationReducer,
  [SOCKET_STATE_KEY]: SocketReducer,
  [MESSAGES_STATE_KEY]: MessagesReducer,
  [WORKSPACE_STATE_KEY]: WorkspaceReducer,
  [ROOM_STATE_KEY]: RoomReducer,
  [PROJECT_STATE_KEY]: ProjectReducer,
  [HOME_PAGE_KEY]: HomePageReducer,
  [BRIEFS_KEY]: BriefsReducer,
  [MATERIAL_TOOL_KEY]: MaterialToolReducer,
  [ACCESS_STATE_KEY]: persistReducer(accessPersistConfig, AccessReducer),
});

export default persistReducer(ReduxPersistConfig.storeConfig, rootReducer);
