export type MailApiResult = {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
  IsSubscriptionFree: boolean;
  IsStealerLog: boolean;
};

export type MailApi = MailApiResult[] | null;

export type PasswordStrength = {
  score: number;
  suggestions: string[];
  warning: string | null;
};

export type PasswordApi = {
  strength: PasswordStrength;
  pwnedCount: number;
} | null;