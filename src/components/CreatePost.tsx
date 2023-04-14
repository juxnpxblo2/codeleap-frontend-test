import { useState, useCallback, useMemo } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useDispatch } from "react-redux";

import { createPost } from "@/actions/createPost";
import { postCreated } from "@/redux/postsSlice";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

type CreatePostProps = {
  username: string;
};

const CreatePost = (props: CreatePostProps) => {
  const dispatch = useDispatch();

  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState("");
  const onTitleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setTitle(e.target.value);
    },
    []
  );

  const [content, setContent] = useState("");
  const onContentChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      setContent(e.target.value);
    },
    []
  );

  const canSubmit = useMemo(() => {
    return title.length > 0 && content.length > 0 && !creating;
  }, [title, content, creating]);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      setCreating(true);

      setTitle("");
      setContent("");

      createPost({ username: props.username, title, content }).then((post) => {
        dispatch(postCreated(post));
        setCreating(false);
      });
    },
    [props.username, title, content]
  );

  return (
    <section className="rounded-xl border border-dark p-5">
      <h2 className="mb-4 select-none text-2xl font-bold">
        What's on your mind?
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="mb-4 flex flex-col space-y-3">
          <Input
            label="Title"
            placeholder="Hello world"
            value={title}
            onChange={onTitleChange}
            disabled={creating}
            maxLength={256}
          />
          <TextArea
            label="Content"
            placeholder="Content here"
            value={content}
            onChange={onContentChange}
            disabled={creating}
            maxLength={4096}
          />
        </div>

        <div className="self-end">
          <Button
            content={creating ? "Creating..." : "Create"}
            type="submit"
            disabled={!canSubmit}
            appearance="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
