export interface RegisterBody {
  password1: string;
  password2: string;
  email: string;
  full_name: string;
  company?: string;
}
export interface VerifyEmailBody {
  code: string;
  email: string;
  first_name: string;
  last_name: string;
  about: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
export interface VerifyEmailValidateCodeBody {
  pin: string;
  password1: string;
  password2: string;
}

export interface ResetPasswordBody {
  password: string;
  repeat_password: string;
  code: string;
  email: string;
}
export interface logoutBody {
  refresh: string;
  access: string;
}

export interface registerDeviceData {
  identifier: string;
  device_type: number;
  device_model?: number;
}

export type Notification = {
  created_at: string; // "2021-08-12T13:13:32.283000"
  is_read: boolean; //false
  message: string; // "Congratulations! You just received 50 reward points for registration in the app."
  subject: string; // "You've been awarded points"
  _id: string; // "61151e7cd5263ee08001571f"
};
