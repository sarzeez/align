import {ReactElement} from 'react';
import {File, typesOfAccount} from 'typings/types.common';
import {StringSchema} from 'yup';
import {DeviceState} from 'react-native-onesignal';

export type MaterialToolState = {
  tool: [];
  material: [];
  room: [];
  assignee: [];
};

export type BriefsState = {
  todo: {
    projects: Project[];
    filter: [];
    loading: boolean;
    error: string;
    progress: number;
  };
  materials: {
    projects: Project[];
    filter: [];
    loading: boolean;
    error: string;
  };
  tools: {
    projects: Project[];
    filter: [];
    loading: boolean;
    error: string;
  };
};

export type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
  token: string | null;
  refresh: string | null;
  temporaryToken: string | null;
  temporaryRefresh: string | null;
  error: string | null;
  signDate: Date | null;
  signCount: number;
  isAppLoading: boolean;
  isLaterFillProfile: boolean;
  notificationsEnabled: boolean;
  accountType: typesOfAccount | null;
  deviceState: DeviceState | null;
  showSuccessModal: boolean;
  continueWithoutPin: Boolean;
};

export type AccessState = {
  camera: string;
  location: string;
  microphone: string;
  addPhotos: string;
  photos: string;
  documents: string;
  showInfoBox: boolean;
};

export type WorkspacesState = {
  workspace: Workspace | null;
  currentWorkspace: Workspace | null;
  singleWorkspace: Workspace | null;
  myWorkspace: Workspace | null;
  myWorkspaceList: Workspace[];
  workspaceSheetIsOpened: boolean;
  subContractorWorkspaceId: number | null;
};

// Homepage start
export type HomePageState = {
  todaysBrief: Briefs[];
};

export type Briefs = {
  name: string;
  amount: number;
  new: number;
  outstanding: number;
};
// Homepage end

export type RoomState = {
  isLoading: boolean;
  error: '';
  tabIndex: number;
  targetPhotoIndex: number | null;
  currentRoom: Room | null;
  photos: {
    '360': File[] | [];
    static: File[] | [];
  };
  rooms: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Room[];
  };
  markerAdded: boolean;
};

export type Room = {
  id: number;
  name: string;
  is_archived: boolean;
  images: {
    id: number;
    image: string;
    is_360: boolean;
    markers: Marker[];
  }[];
};

export type Workspace = {
  id: number;
  name: string;
  pin: string;
  seats: string;
};

export type MessagesState = {
  camera: string;
  location: string;
  microphone: string;
  storage: string;
  showInfoBox: boolean;
};

export type ProfileState = {
  userProfile: UserProfile | null;
  otherUserProfile: UserProfile | null;
  interests: string[];
  messagesUsers: string[];
};

export type ProjectState = {
  isLoading: boolean;
  error: string;
  tradesList: Project[];
  selectedProject: Project;
  projects: {
    count: number;
    results: Project[];
    previous: string | null;
    next: string | null;
  };
  projectDetails: any;
  singleTask: any;
  singleMaterial: any;
  singleTool: any;
  toggleAssigneesModal: boolean;
};

export type Project = {
  id: number;
  name: string;
  address: string;
  state: string;
  zip_code: string;
  workspace: number;
};

export type UserProfile = {
  id: number;
  _id: string; //"60f6d70f513f6a2a36791381"
  full_name: string;
  email: string;
  country: string;
  avatar: string | null;
  gender: string;
  address: string;
  communities: string;
  has_pets: boolean | null;
  is_parent: boolean | null;
  partner_is_vegan?: boolean | null;
  interests: string[];
  role: 'user' | 'admin';
  phone?: string;
  has_business: boolean;
  cardNumber?: string | undefined;
  available_coins?: string | number;
  points?: string | number;
  about?: string;
  communityImage?: string;
  is_sharing_location?: boolean;
  is_help_required?: boolean;
  is_assisting?: boolean;
  is_reacted_to_help?: boolean;
  contractor?: ContractorType;
  subcontractor?: ContractorType;
  position?: string | undefined;
  phoneNumber?: string | undefined;
};

export type ContractorType = {
  id: number;
  company: string;
  user: number;
};

export type EditProfile = {
  full_name: string;
  email: string;
  company?: string | undefined;
};

export type WorkDay = {
  day: string;
  selected: boolean;
  isWorking: boolean;
  workingHours: WorkSchedule[];
};

export type WorkSchedule = {
  weekday: number;
  end_hour: number;
  start_hour: number;
};

export type Category = {
  id: number;
  name: string;
};

export type Country = {
  code: string;
  name: string;
};

export type SocialLink = {
  link: string;
  social: string;
  renderIcon: any;
};

export type GetNearBusiness = {
  lat: number;
  lng: number;
  radius: number;
};

export enum ErrorResponses {
  businessAlreadyExist = 'Business with this name and address exists',
  signInCanceled = 'Sign in action cancelled',
  emptyMessageData = 'Empty message data',
  userCanceled = 'The user canceled the sign in request.',
  operationCouldNotCompleted = 'The operation couldn’t be completed.',
}

export enum ErrorResetPassword {
  WrongVerificationCode = 'Wrong verification code',
  EmailNotRegistered = 'The user with this email is not registered',
}

export enum ErrorLogin {
  ErrorCredentials = 'Bad username/password',
}

export type ConfirmPasswordTypes = {
  password: string;
  repeat_password: string;
  password_change_code: string;
};

export type BusinessesNearbyRequestData = {
  lat: number;
  lng: number;
  radius: number;
};

export type ContactUsData = {
  email: string;
  phone: string;
  message: string;
};

export type exchangeRedeem = {
  amount: number | string;
};

export type StripeTypes = {
  cardNumber: number;
  cvv: number;
  expireDate: string;
  bankName: string;
};

export type StripeErrorsTypes = {
  cardNumber: string;
  cvv: string;
  expireDate: string;
  bankName: string;
};

export type FormikTypes = {
  values: StripeTypes;
  errors: StripeErrorsTypes;
  handleSubmit: () => void;
  handleChange: (val: string) => string;
};

export type PaymentMethod = {
  _id: 'string';
  card: PaymentCard;
  green_coin_card: {
    amount: number;
  };
  reward_point_card: {
    amount: number;
    total_amount: number;
  };
  isAddNewCard: boolean;
  // Note: added this props for wallets scroll animation
  emptyList?: string;
  isSelected?: boolean;
};

export type Transaction = {
  amount: number; //120
  created_at: string; //"2021-08-04T14:18:55.188000"
  currency: string | null;
  in_business: {
    logo_url: string | null;
    name: string; //'Super business 2 (not scam)';
    _id: string; //'610907da0e39390496ef0779';
  } | null;
  in_user: {
    _id: string; //'61080ab1cfe11d3b31908bbf';
    first_name: string; //'Max';
    last_name: string; //'Test';
    email: string; //'max@test.test';
    avatar_url: string | null;
  };
  is_green_coin: boolean;
  is_money: boolean;
  is_reward_point: boolean;
  out_business: {
    logo_url: string | null;
    name: StringSchema; //'Super business 2 (not scam)';
    _id: string; //'610907da0e39390496ef0779';
  } | null;
  out_user: {
    _id: string; //'61080ab1cfe11d3b31908bbf';
    first_name: string; //'Max';
    last_name: string; //'Test';
    email: string; //'max@test.test';
    avatar_url: string | null;
  };
  in_payment_method_id: string;
  out_payment_method_id: string;
};

export type PaymentAccount = {
  _id: string;
  cardNumber: string;
  categories: string[];
  details: string;
  green_coin_card: {
    amount: number;
  };
  location: {
    type: string;
    coordinates: [number, number];
  };
  logo_url: string;
  name: string;
  payment_account: {
    last4: string;
    country: string;
    currency: string;
    bank_name: string;
  };
};

export type PaymentCard = {
  brand: 'string';
  country: 'string';
  exp_month: number;
  exp_year: number;
  last4: 'string';
  bank_name: 'string';
};

export type Post = {
  attachment: string | null;
  attachment_filename: string;
  author: {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
  };
  community: number | null;
  created_at: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
  replies_count: number;
  text: string;
};

export type Community = {
  id: number;
  name: string;
  members_count: number;
};

export type Account = {
  id: number;
  email: string;
  community_id: string;
  community_name: string;
  is_primary: boolean;
};

export type Scoreboard = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  points: number;
  this_week_points: number;
};

export type CommunityState = {
  posts: {
    data: Post[];
    count: number;
    next: string | null;
  };
  otherPosts: {
    data: Post[];
    count: number;
    next: string | null;
  };
  communities: Community[];
  isLoading: boolean;
  isLoadMore: boolean;
  error: string;
  myAccounts: Account[];
  myScoreBoard: Scoreboard[];
  topScores: Scoreboard[];
};

export type GeolocationState = {
  currentLocation: {
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  sharedLocationUsers: SharedLocationUser[];
  selectedMarkerId: number | null;
  hideCallouts: boolean;
  isLoading: boolean;
  error: string;
};

export type SharingPreferencesState = {
  communities: {
    id: number;
    name: string;
    selected: boolean;
  }[];
  members: {
    data: Member[];
    count: number;
    next: string | null;
  };
  isLoading: boolean;
  isLoadMore: boolean;
  error: string;
};

export type SharingPreferencesListItem = {
  id: string;
  avatar?: string;
  name: string;
  selected?: boolean;
  type: string;
};

export type ActionSheetItem = {
  key: string;
  text: string;
  color?: string;
  icon?: ReactElement;
  onPress: (props: any) => void;
};

export type ActionSheetState = {
  actions: ActionSheetItem[];
};

export type PermissionState = {
  geolocation: boolean;
  microphone: boolean;
  nitification: boolean;
};

export type SirenState = {
  turnOn: boolean;
};

export type Member = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  selected: true;
};

export type SharedLocationUser = {
  avatar: string;
  current_position: {
    latitude: number;
    longitude: number;
  };
  first_name: string;
  last_name: string;
  id: number;
  is_assisting: boolean;
  is_help_required: boolean;
  is_reacted_to_help: boolean;
};

export type SocketState = {
  socket: WebSocket | null;
  connected: boolean;
  error: string;
};

// 2d - для обычных изображений, 3d - для панорам
export type ImageType = '2d' | '3d';

export type Marker = {
  id: number;
  x: number;
  y: number;
  punchlist_id: number | null;
  room_id: number;
  project_id: number;
};
