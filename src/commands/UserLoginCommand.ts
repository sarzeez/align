import { CustomCommand } from 'reactotron-core-client';
import {
  registration,
  contractorRegister,
  fetchLogin,
  logout,
  hardLogout,
  getMyProfile
} from 'store/actions/auth.actions';
import { store } from './../../App';

const RegisterCommand: CustomCommand = {
  command: 'Register Contractor',
  description: 'Register user with contractor role',
  handler: () => {
    store.dispatch(
      registration(
        {
          password1: 'Qfwer213dEqq',
          password2: 'Qfwer213dEqq',
          email: 'Alexn21200207@gmail.com',
          full_name: 'EvokTest',
          company: 'Evwefwerwe',
        },
        'contractor'
      ),
    );
  },
};

const RegisterSubContractorCommand: CustomCommand = {
  command: 'Register Subcontractor',
  description: 'Register user with subcontractor role',
  handler: () => {
    store.dispatch(
      registration(
        {
          password1: 'Qfwer213dEqq',
          password2: 'Qfwer213dEqq',
          email: 'Alexn21200207@yandex.ru',
          full_name: 'EvokWorker'
        },
        'subcontractor'
      ),
    );
  },
};

const LoginCommand: CustomCommand = {
  command: 'Login User',
  description: '',
  handler: () => {
    store.dispatch(
      fetchLogin(
        {
          password: 'Qfwer213dEqq',
          email: 'Alexn21200207@gmail.com',
        }
      )
    );
  },
};

const LoginSubContractorCommand: CustomCommand = {
  command: 'Login Subcontractor User',
  description: 'Login subcontractor',
  handler: () => {
    store.dispatch(
      fetchLogin(
        {
          password: 'Qfwer213dEqq',
          email: 'Alexn21200207@yandex.ru',
        }
      )
    );
  },
};

const LogoutCommand: CustomCommand = {
  command: 'Logout',
  description: 'Logout user from account',
  handler: () => {
    store.dispatch(hardLogout());
  },
};

const GetMyProfileCommand: CustomCommand = {
  command: 'Get my profile',
  description: 'Get user account data',
  handler: () => {
    store.dispatch(getMyProfile());
  },
};

const commands = [
  RegisterCommand,
  RegisterSubContractorCommand,
  LoginCommand,
  LoginSubContractorCommand,
  LogoutCommand,
  GetMyProfileCommand
];

export { commands };