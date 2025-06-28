"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { CloudUpload, LoaderCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const AuthorForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const router = useRouter();
  const [socialLinks, setSocialLinks] = useState([
    { platform: "facebook", url: "" },
    { platform: "Twitter", url: "" },
    { platform: "linkedIn", url: "" },
    { platform: "Portfolio", url: "" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("summary", summary);
      formData.append("isPublished", String(isPublished));
      formData.append("socialLinks", JSON.stringify(socialLinks));
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      const res = await axios.post(
        "http://localhost:8000/api/admin/author",
        formData,
        {
          withCredentials: true,
        }
      );
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        router.push("/author/author-list");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("author submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-screen-md mx-auto">
      <CardHeader>
        <CardTitle>Create Author Details</CardTitle>
        <CardDescription>
          Upload and manage author profiles effortlessly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <div
                className="w-32 h-32 border-dashed border-2 flex 
                items-center justify-center relative border-gray-400 rounded-md"
              >
                <Label htmlFor="profileImage">
                  {coverImage ? (
                    <Image
                      src={URL.createObjectURL(coverImage)}
                      alt="auhtor-image"
                      width={100}
                      height={100}
                      className="rounded-md w-32 h-32 object-cover p-1 cursor-pointer"
                    />
                  ) : (
                    <p
                      className=" absolute top-0 left-0 w-full h-full flex items-center 
                      justify-center cursor-pointer"
                    >
                      <CloudUpload size={75} />
                    </p>
                  )}

                  <Input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    hidden
                    required
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setCoverImage(e.target.files?.[0]);
                      }
                    }}
                  />
                </Label>
              </div>
            </div>
            <div className=" space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name "
                placeholder="Enter author name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Author Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Johndoe@gmail.com"
                required
                className="text-xs sm:text-sm"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="bio">Author Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={5}
                placeholder="Write about the author"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks?.map((links, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Label htmlFor={links?.platform} className=" capitalize">
                    {links?.platform}
                  </Label>
                  <Input
                    id={links?.platform}
                    type="text"
                    name={`socialLinks.${links?.platform}`}
                    placeholder={`https://${links.platform}.com`}
                    value={links?.url}
                    onChange={(e) => {
                      const updateLinks = [...socialLinks];
                      updateLinks[index].url = e.target.value;
                      setSocialLinks(updateLinks);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* IsActive Switch */}

            <div className="flex items-center space-x-2 p-2 group">
              <Label
                htmlFor="isActive"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Is Active
              </Label>
              <Switch
                id="isActive"
                className="cursor-pointer"
                checked={isPublished}
                onCheckedChange={(check: boolean) => setIsPublished(check)}
                disabled={loading}
              />
            </div>

            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <LoaderCircle className=" animate-spin mt-1" />
                  <p>Author Creating...</p>
                </div>
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthorForm;
