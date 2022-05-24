import * as Yup from 'yup';

import localization from 'localization/localization';

import {
  EMAIL_VALIDATION_PATTERN,
  USER_NAME_PATTERN,
  ONLY_NUMBERS,
} from './regEx.helpers';

export const CreateAccountSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, localization.validRules.passwordWrongFormat)
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .matches(/[a-z]/, localization.validRules.passwordWrongFormat)
    .required(localization.validRules.passwordEmpty),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      localization.validRules.passwordsNotMatches,
    )
    .required(localization.validRules.passwordEmpty),
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
  userName: Yup.string()
    .matches(USER_NAME_PATTERN, localization.validRules.wrongUserName)
    .required(localization.validRules.userNameEmpty),
  companyName: Yup.string().required(localization.validRules.companyNameEmpty),
  termsAndConditions: Yup.bool().oneOf([true]),
});

export const CreateAccountSubContactorSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, localization.validRules.passwordWrongFormat)
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .matches(/[a-z]/, localization.validRules.passwordWrongFormat)
    .required(localization.validRules.passwordEmpty),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      localization.validRules.passwordsNotMatches,
    )
    .required(localization.validRules.passwordEmpty),
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
  userName: Yup.string()
    .matches(USER_NAME_PATTERN, localization.validRules.wrongUserName)
    .required(localization.validRules.userNameEmpty),
  termsAndConditions: Yup.bool().oneOf([true]),
});

export const CreateWorkSpaceSchema = Yup.object().shape({
  workSpace: Yup.string().required(localization.validRules.required),
});

export const JoinWorkSpaceSchema = Yup.object().shape({
  pin: Yup.string()
    .matches(ONLY_NUMBERS, localization.joinWorkSpace.onlyNumbers)
    .required(localization.joinWorkSpace.pinRequiredError),
});

export const CreatProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .min(3, 'Project name must be at least 3 charecters')
    .max(30, 'Maximum 30 charecters'),
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  zip_code: Yup.string()
    .required('Zip code is required')
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .min(5, 'Minimum 5 symbols')
    .max(5, 'Maximum 5 symbols'),
});

export const AddRoomSchema = Yup.object().shape({
  name: Yup.string().required('It is required'),
});

export const SignInSchema = Yup.object().shape({
  password: Yup.string().required(localization.validRules.passwordEmpty),
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
});

export const ForgotPasswordSchema = Yup.object().shape({
  code: Yup.string().required(localization.forgotPassword.required),
  password: Yup.string()
    .min(6, localization.validRules.passwordWrongFormat)
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .matches(/[a-z]/, localization.validRules.passwordWrongFormat)
    .required(localization.validRules.passwordEmpty),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      localization.validRules.passwordsNotMatches,
    )
    .required(localization.validRules.passwordEmpty),
});

export const EditContractorSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
  userName: Yup.string()
    .matches(USER_NAME_PATTERN, localization.validRules.wrongUserName)
    .required(localization.validRules.userNameEmpty),
  companyName: Yup.string().required(localization.validRules.companyNameEmpty),
});

export const EditSubContractorSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.validRules.emailWrong)
    .required(localization.validRules.emailEmpty),
  userName: Yup.string()
    .matches(USER_NAME_PATTERN, localization.validRules.wrongUserName)
    .required(localization.validRules.userNameEmpty),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, localization.validRules.passwordWrongFormat)
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .matches(/[a-z]/, localization.validRules.passwordWrongFormat)
    .required(localization.validRules.passwordEmpty),
  password: Yup.string()
    .min(6, localization.validRules.passwordWrongFormat)
    .matches(/[0-9]/, localization.validRules.passwordWrongFormat)
    .matches(/[a-z]/, localization.validRules.passwordWrongFormat)
    .required(localization.validRules.passwordEmpty),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      localization.validRules.passwordsNotMatches,
    )
    .required(localization.validRules.passwordEmpty),
});

export const AddPunchListItemSchema = Yup.object().shape({
  image: Yup.string(),
  task: Yup.string().required('Task is required'),
  trade: Yup.string().required('Trade is required'),
  hours: Yup.string()
    .matches(/[0-9]/, 'Hours should a number')
    .required('Hours is required'),
  priority: Yup.string().required('Priority is required'),
  due_date: Yup.string().required('Due date is required'),
  assignee: Yup.string(),
  change_order: Yup.string().required('Change order is required'),
  description: Yup.string(),
});

export const AddToolSchema = Yup.object().shape({
  tool: Yup.object().required(),
  priority: Yup.string().required(),
  room: Yup.string().required(),
  due_date: Yup.string().required(),
  assignee: Yup.string().required(),
  description: Yup.string().required(),
});

export const AddMaterialSchema = Yup.object().shape({
  material: Yup.object().required(),
  material_note: Yup.string().required(),
  priority: Yup.string().required(),
  room: Yup.string().required(),
  due_date: Yup.string().required(),
  assignee: Yup.string().required(),
  description: Yup.string().required(),
});

/*


export const AboutYouSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, localization.validRules.wrongFirstName)
    .required(localization.validRules.firstNameEmpty),
  secondName: Yup.string()
    .max(50, localization.validRules.wrongFirstName)
    .required(localization.validRules.secondNameEmpty),
  aboutYourself: Yup.string().max(
    200,
    localization.validRules.wrongAboutYourself,
  ),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string().required(localization.validRules.passwordEmpty),
});
*/

/*
export const BUSINESS_SCHEMA_VALIDATION = Yup.object().shape({
  businessName: Yup.string().required(localization.errors.businessName),
  businessLogo: Yup.string().required(localization.errors.businessLogo),
  businessDetail: Yup.string().required(localization.errors.businessDetail),
  businessAddress: Yup.string().required(localization.errors.businessAddress),
  businessImages: Yup.array()
    .of(Yup.string().min(1))
    .required(localization.common.required),
  businessWebsite: Yup.string().matches(
    SITE_VALIDATION_PATTERN,
    localization.errors.invalidURLLInk,
  ),
  businessCountry: Yup.array()
    .min(1)
    .required(localization.errors.businessCountry),
  businessPhoneNumber: Yup.string()
    .matches(PHONE_VALIDATION_PATTERN, localization.errors.wrongPhoneFormat)
    .required(localization.errors.businessPhoneNumber),
  businessCategories: Yup.array()
    .min(1)
    .required(localization.errors.businessCategories),
  businessEmail: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.errors.invalidEmail)
    .required(localization.errors.businessEmail),
});

export const SOCIAL_VALIDATION = {
  socialLink: Yup.string()
    .matches(SITE_VALIDATION_PATTERN, localization.errors.invalidURLLInk)
    .required(localization.errors.businessEmail),
};

export const PROFILE_SCHEMA_VALIDATION = Yup.object().shape({
  name: Yup.string().required(localization.errors.profileName),
  lastName: Yup.string().required(localization.errors.profileLastName),
  country: Yup.array().min(1).required(localization.errors.profileCountry),
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.errors.invalidEmail)
    .required(localization.errors.businessEmail),
  phone: Yup.string().matches(
    PHONE_VALIDATION_PATTERN,
    localization.errors.wrongPhoneFormat,
  ),
});

export const CONTACT_US_SCHEMA_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_VALIDATION_PATTERN, localization.errors.invalidEmail)
    .required(localization.errors.businessEmail),
  phone: Yup.string()
    .matches(PHONE_VALIDATION_PATTERN, localization.errors.wrongPhoneFormat)
    .required(localization.errors.businessPhoneNumber),
  message: Yup.string().required(localization.errors.contactUsMessage),
});

export const STRIPE_CONNECT_VALIDATION = Yup.object().shape({
  bankName: Yup.string().required(localization.errors.emptyField),
});
*/
