import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }
}