export interface UserContextInterface {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<String>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<String>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<String>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<String>>;
  userStatus: boolean;
  setUserStatus: React.Dispatch<React.SetStateAction<Boolean>>;
  accountType: string;
  setAccountType: React.Dispatch<React.SetStateAction<String>>;
}

