"use client";
import AnalyticsChart from "@/components/AnalyticsChart";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Loading from "@/components/Loading";
import PostTable from "@/components/posts/PostTable";
import { PostType } from "@/types/post";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  ChartColumnStacked,
  MessageCircle,
  Newspaper,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalAuthor, setTotalAuthor] = useState<number>(0);
  const [totalPost, setTotalPost] = useState<number>(0);
  const [PostList, setPostList] = useState<PostType[]>([]);
  useEffect(() => {
    const getUserList = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/user/users", {
          withCredentials: true,
        });
        setTotalUser(res?.data?.total);
      } catch (error) {
        console.error("userList getting error:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8000/api/category/getCategories",
          {
            withCredentials: true,
          }
        );
        setTotal(res?.data?.total);
      } catch (error) {
        console.error("Categories getting error:", error);
      } finally {
        setLoading(false);
      }
    };
    const getAuthorList = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8000/api/admin/AlAuthors",
          {
            withCredentials: true,
          }
        );
        setTotalAuthor(res?.data?.total);
      } catch (error) {
        console.error("userList getting error:", error);
      } finally {
        setLoading(false);
      }
    };

    const getAllPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/post/posts", {
          withCredentials: true,
        });
        setPostList(res?.data.post);
        setTotalPost(res?.data.total);
      } catch (error) {
        console.log("Post fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserList();
    getCategories();
    getAuthorList();
    getAllPost();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 
    lg:grid-cols-4 gap-3"
          >
            <Link href={"/blogpost/post-list"}>
              <DashboardCard
                title="Post"
                count={totalPost}
                icon={<Newspaper className="text-slate-500" size={50} />}
              />
            </Link>
            <Link href={"/categories/category-list"}>
              <DashboardCard
                title="Categories"
                count={total}
                icon={
                  <ChartColumnStacked className="text-slate-500" size={50} />
                }
              />
            </Link>
            <Link href={"/user/user-list"}>
              <DashboardCard
                title="Users"
                count={totalUser}
                icon={<UserRoundPen className="text-slate-500" size={50} />}
              />
            </Link>
            <Link href={"/author/author-list"}>
              <DashboardCard
                title="Author"
                count={totalAuthor}
                icon={<MessageCircle className="text-slate-500" size={50} />}
              />
            </Link>
          </div>
          <AnalyticsChart />
          <PostTable title="Latest Posts" limit={5} Post={PostList} />
        </>
      )}
    </>
  );
}
