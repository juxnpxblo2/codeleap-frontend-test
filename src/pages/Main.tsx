import { useMemo, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useSelector, useDispatch } from "react-redux";
import { ExitToApp } from "@material-ui/icons";

import { userAtom } from "@/atoms";
import { useLogout } from "@/hooks/useLogout";
import type { RootState } from "@/redux/store";
import { postsFetched } from "@/redux/postsSlice";
import { fetchPosts } from "@/actions/fetchPosts";
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";

const Main = () => {
  const user = useAtomValue(userAtom);
  const loggedIn = useMemo(() => !!user, [user]);

  const logout = useLogout();

  const scrollBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!loggedIn) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="flex h-full w-screen flex-col items-center bg-figma-frame">
      <div className="flex min-h-screen w-[800px] flex-col bg-white">
        <header className="sticky top-0 z-10 flex justify-between border-b bg-blue px-8 py-6 text-white">
          <h1
            className="cursor-pointer select-none text-2xl font-bold"
            onClick={scrollBackToTop}
          >
            CodeLeap Network
          </h1>

          <nav title="Logout">
            <button>
              <ExitToApp onClick={logout} />
            </button>
          </nav>
        </header>

        <main className="px-4 py-5">
          <div className="mb-5">
            <CreatePost username={user!} />
          </div>

          <Posts />
        </main>
      </div>
    </div>
  );
};

const Posts = () => {
  const user = useAtomValue(userAtom);

  const posts = useSelector((state: RootState) => state.posts.list);
  const fetched = useSelector((state: RootState) => state.posts.fetched);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      fetchPosts().then((res) => dispatch(postsFetched(res.results)));
    }
  }, [fetched]);

  return (
    <section className="flex flex-col space-y-5">
      {fetched ? (
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} fromUser={post.username === user} />
          </div>
        ))
      ) : (
        <div className="text-center">Loading posts...</div>
      )}
    </section>
  );
};

export default Main;
