export type AdminType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  adminAvatar: {
    public_id: string;
    url: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
