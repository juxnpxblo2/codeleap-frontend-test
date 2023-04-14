import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import Button, { type ButtonProps } from "./Button";

type ModalProps = {
  title: string;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
};

const Modal = (props: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      {createPortal(
        <div className="fixed top-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-darker bg-opacity-80">
          <div className="flex w-[660px] flex-col rounded-xl border border-dark bg-white px-6 py-5">
            <h4 className="select-none text-2xl font-bold">{props.title}</h4>

            <div className="py-4">{props.children}</div>

            <div className="flex space-x-4 self-end">
              <Button {...props.secondaryButton} />
              <Button {...props.primaryButton} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;
