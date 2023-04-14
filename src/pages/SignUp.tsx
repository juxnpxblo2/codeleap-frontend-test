import { useState, useMemo, useCallback } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import { userAtom } from "@/atoms";
import { useLogin } from "@/hooks/useLogin";
import Input from "@/components/Input";
import Button from "@/components/Button";

const SignUp = () => {
  const user = useAtomValue(userAtom);
  const loggedIn = useMemo(() => !!user, [user]);

  const login = useLogin();

  const [username, setUsername] = useState("");
  const onUsernameChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setUsername(e.target.value);
    },
    []
  );

  const canSubmit = useMemo(() => {
    return username.length > 0;
  }, [username]);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      login(username);
    },
    [login, username]
  );

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-figma-frame">
      <div className="w-[500px] rounded-xl bg-white px-6 py-5">
        <h2 className="mb-4 select-none text-2xl font-bold">
          Welcome to CodeLeap network!
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="mb-4">
            <Input
              label="Please enter your username"
              placeholder="John Doe"
              value={username}
              onChange={onUsernameChange}
              maxLength={256}
              spellCheck={false}
            />
          </div>

          <div className="w-min self-end">
            <Button
              content="ENTER"
              type="submit"
              appearance="primary"
              disabled={!canSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
