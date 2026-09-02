export type UserProfile = {
  bio: string;
  avatarURL: string;
}

export type UserAccount = {
  id: string;
  createdAt: Date;
  email: string;
  passwordHash: string;
  profile: UserProfile;
};

export class UserRegistry {

  private users: Map<string, UserAccount> = new Map();

  public registerUser(
    data: Omit<UserAccount, 'id' | 'createdAt'>,
  ): UserAccount {
    const id = Math.random().toString(36).substring(2, 15);
    const createdAt = new Date();

    const newUser: UserAccount = {
      id,
      createdAt,
      ...data,
      profile: {...data.profile}
    };

    this.users.set(id, newUser);
    return newUser;
  }

  public getUserView(
    id: string,
  ): Readonly<Pick<UserAccount, 'id' | 'email' | 'profile'>> | undefined {
    const user = this.users.get(id);
    if (!user) {
      return undefined;
    };
    
    const view: Pick<UserAccount, 'id' | 'email' | 'profile'> = {
      id: user.id,
      email: user.email,
      profile: { ...user.profile }
    };

    Object.freeze(view);

    return view;

  }
}
