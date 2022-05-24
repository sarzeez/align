export enum typesOfAccount {
  contractor = 'Contractor',
  subContractor = 'SubContractor',
  employee = 'Employee',
}

export enum socialLinksEnum {
  facebook = 'facebook',
  twitter = 'twitter',
  instagram = 'instagram',
}

export enum PermissionsStatuses {
  denied = 'denied',
  granted = 'granted',
  limited = 'limited',
  blocked = 'blocked',
}

export enum WeekDaysNames {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum expiredTokenErrorMessages {
  notValidToken = 'Given token not valid for any token type',
  notAuthenticated = 'Not authenticated',
  oldPassword = 'old_password',
  tokenExpired = 'Token expired',
  unexpectedToken = 'Request failed with status code 401',
  notProvideCredentials = 'Authentication credentials were not provided.',
  tokenBlacklisted = 'Token is blacklisted',
}

export enum ToastMessageType {
  danger = 'danger',
}

export enum SocialAuth {
  Google = 'google_android',
  Apple = 'apple',
}

export type SocialAuthData = {
  id_token: string;
  onesignal_id: string;
  extra?: {
    first_name?: string | null;
    last_name?: string | null;
  };
};

export enum DeviceType {
  apple = '0',
  android = '1',
}

export enum Pickers {
  Photos = 'photos',
  Documents = 'documents',
  Camera = 'camera',
}

export enum Priority {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
}

export type SvgType = {
  width?: number;
  height?: number;
  color?: string;
};

export enum Sizes {
  MB10 = 10 * 1000000,
  MB50 = 50 * 1000000,
  MB1024 = 1024 * 1000000,
}

export type File = {
  name: string | undefined;
  size: number | null | undefined;
  type: string | null | undefined;
  uri: string | undefined;
};

export type User = {
  id: number;
  full_name: string;
  email: string;
  contractor?: number;
  subcontractor?: number;
  is_active?: boolean;
  is_blocked?: boolean;
  is_online?: boolean;
};

export type Message = {
  message?: string;
  file?: string;
  filename?: string;
  file_format?: string;
  sender?: string;
  receiver?: string;
  created?: string;
  sender_name?: string;
  receiver_name?: string;
  updated?: string;
  is_read?: boolean;
  pk?: number;
  chat?: number;
};

export type ProjectData = {
  id?: number;
  name: string;
  address: string;
  state: string;
  zip_code: string;
  workspace?: number;
};

export type MaterialData = {
  count?: number;
  next: string;
  previous: string;
  results: any[];
};

export type WorkspaceMainInfo = {
  id: number;
  name: string;
  user: number;
};

export type WorkspaceFullInfo = WorkspaceMainInfo & {
  pin: number;
  seats: number;
  members: any[];
  is_active: boolean;
  user: any;
};
