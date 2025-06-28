"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import md5 from "md5";

type UserPayload = {
  name: string;
  email: string;
};
const UserInfo = () => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const decode: UserPayload = jwtDecode(token as string);
      setUser(decode);

      const emailHash = md5(decode.email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
      setAvatar(gravatarUrl);
    }
  }, []);
  return (
    <Avatar>
      <AvatarImage src={avatar} alt="avatar_image" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserInfo;
