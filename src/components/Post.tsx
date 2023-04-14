import { useState, useCallback, useMemo, useRef } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import { DeleteForever, Edit } from "@material-ui/icons";

import type { Post } from "@/types";
import { deletePost } from "@/actions/deletePost";
import { editPost } from "@/actions/editPost";
import { postEdited, postDeleted } from "@/redux/postsSlice";
import { timeAgo } from "@/lib/timeAgo";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";

type PostProps = {
  post: Post;
  fromUser: boolean;
};

const Post = (props: PostProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLoading, setEditingLoading] = useState(false);

  const [editedTitle, setEditedTitle] = useState(props.post.title);
  const onEditedTitleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setEditedTitle(e.target.value);
    },
    []
  );

  const [editedContent, setEditedContent] = useState(props.post.content);
  const onEditedContentChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement>
  >((e) => {
    setEditedContent(e.target.value);
  }, []);

  const onEdit = useCallback(() => {
    setEditModalOpen(true);
  }, []);

  const onCancelEdit = useCallback(() => {
    setEditModalOpen(false);

    setEditedTitle(props.post.title);
    setEditedContent(props.post.content);
  }, []);

  const onSave = useCallback(() => {
    formRef?.current?.requestSubmit();
  }, []);

  const onSubmitEdit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      setEditingLoading(true);

      editPost(props.post.id, {
        title: editedTitle,
        content: editedContent,
      }).then((post) => {
        dispatch(postEdited({ id: post.id, newPost: post }));

        setEditedTitle(post.title);
        setEditedContent(post.content);

        setEditingLoading(false);
        setEditModalOpen(false);
      });
    },
    [props.post.id, editedTitle, editedContent]
  );

  const canSubmitEdit = useMemo(() => {
    const emptyTitle = editedTitle === "";
    const emptyContent = editedContent === "";
    const sameTitle = editedTitle === props.post.title;
    const sameContent = editedContent === props.post.content;
    const sameTitleAndContent = sameTitle && sameContent;

    const cantConditions = [
      emptyTitle,
      emptyContent,
      sameTitleAndContent,
      editingLoading,
    ];

    return !cantConditions.some((condition) => condition);
  }, [editedTitle, editedContent, editingLoading]);

  const onDelete = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const onDeleteConfirmation = useCallback(() => {
    deletePost(props.post.id);
    dispatch(postDeleted(props.post.id));
    setDeleteModalOpen(false);
  }, [props.post.id]);

  const onDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const createdAt = useMemo(() => {
    return timeAgo.format(new Date(props.post.created_datetime));
  }, [props.post.created_datetime]);

  return (
    <div className="">
      {deleteModalOpen && (
        <Modal
          title="Are you sure you want to delete this item?"
          primaryButton={{
            content: "Delete",
            appearance: "danger",
            onClick: onDeleteConfirmation,
          }}
          secondaryButton={{
            content: "Cancel",
            onClick: onDeleteCancel,
          }}
        />
      )}

      {editModalOpen && (
        <Modal
          title="Edit item"
          primaryButton={{
            content: editingLoading ? "Saving..." : "Save",
            appearance: "confirm",
            type: "submit",
            onClick: onSave,
            disabled: !canSubmitEdit,
          }}
          secondaryButton={{
            content: "Cancel",
            onClick: onCancelEdit,
            disabled: editingLoading,
          }}
        >
          <form
            ref={formRef}
            className="flex flex-col space-y-3"
            onSubmit={onSubmitEdit}
          >
            <Input
              label="Title"
              placeholder="Hello world"
              value={editedTitle}
              onChange={onEditedTitleChange}
              disabled={editingLoading}
              maxLength={256}
            />
            <TextArea
              label="Content"
              placeholder="Content here"
              value={editedContent}
              onChange={onEditedContentChange}
              disabled={editingLoading}
              maxLength={4096}
            />
          </form>
        </Modal>
      )}

      <div className="flex items-center justify-between space-x-4 rounded-t-xl bg-blue px-5 py-4 text-white">
        <h3 title={props.post.title} className="truncate text-2xl font-bold">
          {props.post.title}
        </h3>

        {props.fromUser && (
          <div className="flex space-x-6 text-3xl">
            <button onClick={onDelete} title="Delete">
              <DeleteForever fontSize="inherit" />
            </button>
            <button onClick={onEdit} title="Edit">
              <Edit />
            </button>
          </div>
        )}
      </div>

      <div className="rounded-b-xl border border-dark p-5">
        <div className="mb-2 flex justify-between text-darker">
          <p className="cursor-pointer font-bold">@{props.post.username}</p>
          <p className="select-none">{createdAt}</p>
        </div>

        <p className="break-words">{props.post.content}</p>
      </div>
    </div>
  );
};

export default Post;
