"use client";
import DarkLightButton from "./components/DarkLightButton";
import SearchAndButton from "./components/SearchAndButton";
import Link from "next/link";
import Image from "next/image";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useState } from "react";
type GitHubUser = {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  created_at: string;
  followers: number;
  public_repos: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  profileNotFound: "";
  documentation_url: "https://docs.github.com/rest/users/users#get-a-user";
  message: "Not Found";
};

export default function Home() {
  const [user, setUser] = useState("");
  const { isLoading, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${user === "" ? "Octocat" : user}`).then((res) => res.json()),
  });


  const handleUserSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-stone-100 p-1.5 sm:p-4 pt-10 sm:pt-12 transition-all dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2">
        <section className="flex justify-between text-2xl">
          <p className="text-lg font-semibold">DevSpotter</p>
          <DarkLightButton />
        </section>
        <section className="flex flex-col gap-6">
          <SearchAndButton
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onSubmit={handleUserSubmit}
          />
          {data?.message ? (
            <div className="flex w-full flex-col gap-6 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h/-[200px] text-red-500">
              <p className="text-red-500 text-center">No User Found</p>
            </div>
          ) : (
            <main className="flex w-full flex-col gap-6 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h/-[200px]">
              {/* sec 1 */}
              <section className="flex gap-2">
                {/* image section */}
                <Image
                  src={
                    data?.avatar_url || data?.documentation_url
                      ? data?.avatar_url ?? data?.documentation_url
                      : ""
                  }
                  className="rounded-full bg-white"
                  width={80}
                  height={80}
                  alt="profileImage"
                />

                <section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                  <div>
                    {/* name */}
                    <h1>{data?.name}</h1>
                    <Link
                      target="_blank"
                      href={`https://github.com/${data?.login}`}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {data?.login}
                    </Link>
                    {/* user id */}
                  </div>
                  {/* bio section */}
                  {/* joined date */}
                  <p>
                    <span>Joined</span>
                    <span> {dateFormat(data?.created_at, "dd mmm yyyy")}</span>
                  </p>
                </section>
              </section>

              {/* sec 2 */}
              <section className="flex flex-col gap-5">
                <p>
                  {data?.bio ?? (
                    <span className="opacity-60">This profile has no bio</span>
                  )}
                </p>
                {/* repo and follower section */}
                <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
                  {/* item1 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Repos</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.public_repos}
                    </p>
                  </div>
                  {/* item2 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Followers</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.followers}
                    </p>
                  </div>
                  {/* item3 */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs opacity-60">Following</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.following}
                    </p>
                  </div>
                </div>
                {/* address and extra links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-h-[47px]">
                  <div className="flex gap-2 items-center">
                    <IoLocationOutline className="text-xl" />
                    <p>
                      {data?.location ?? (
                        <span className="opacity-60"> Not Available</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IoIosLink className="text-xl" />
                    <Link
                      target="_blank"
                      href={data?.blog ?? "#"}
                      className="hover:underline opacity-60 max-w-[200px] overflow-hidden text-ellipsis"
                    >
                      {data?.blog ?? (
                        <span className="opacity-60"> Not Available</span>
                      )}
                    </Link>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaTwitter className="text-xl" />
                    <p>
                      {data?.twitter_username ?? (
                        <span className="opacity-60"> Not Available</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <GoOrganization className="text-xl" />
                    <p>
                      {data?.company ?? (
                        <span className="opacity-60"> Not Available</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
