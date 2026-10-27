export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastModified: string;
}

export interface UserMeResponse {
  id: number;
  email: string;
  lastModified: string;
  UserDetails: UserDetails;
}

export interface UserDetails {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  residentialDetails: ResidentialDetails;
  officeDetails: OfficeDetails;
}

export interface ResidentialDetails {
  id: number;
  userId: number;
  address: string;
  city: string;
  state: string;
  country: string;
  contactNo1: string;
  contactNo2: string;
}

export interface OfficeDetails {
  id: number;
  userid: number;
  employeeCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactNo: string;
  email: string;
  name: string;
}
