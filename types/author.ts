export type SocialLink = {
  platform: "portfolio" | "linkedIn" | "facebook" | "twitter" | string;
  url: string;
  _id: string;
};

export type Author = {
  _id: string;
  name: string;
  slug: string;
  email: string;
  bio: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  socialLinks: SocialLink[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
