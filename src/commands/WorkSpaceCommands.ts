import {CustomCommand} from 'reactotron-core-client';
import {
  getWorkspacesList,
  getWorkspaceById,
} from 'store/actions/workspace.actions';
import {store} from './../../App';
import {typesOfAccount} from 'typings/types.common';

const GetWorkspacesListCommand: CustomCommand = {
  command: 'Get workspaces list',
  description: 'Fetch list of workspaces',
  handler: () => {
    store.dispatch(getWorkspacesList(typesOfAccount.contractor));
  },
};

const GetWorkspaceByIdCommand: CustomCommand = {
  command: 'Get workspace by id',
  description: 'Fetch full data about workspace',
  handler: () => {
    store.dispatch(getWorkspaceById(17, typesOfAccount.contractor));
  },
};

const commands = [GetWorkspacesListCommand, GetWorkspaceByIdCommand];

export {commands};
