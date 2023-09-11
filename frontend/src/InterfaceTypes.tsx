export interface UserContextInterface {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  userStatus: boolean;
  setUserStatus: React.Dispatch<React.SetStateAction<boolean>>;
  accountType: string;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
}

