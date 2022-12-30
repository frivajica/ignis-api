export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  bio: string | null;
  image: any | null;
  followedBy: User[];
  following: User[];
  comments: Comment[];
}
