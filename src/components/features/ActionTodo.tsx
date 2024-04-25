import Button from "@/components/Button";
import ModalAddTodo from "@/components/features/ModalAddTodo";
import {
  type Todo
} from "@/store/api";
import { useState } from "react";

export default function ActionTodo({
  onSave,
  isLoading,
}: {
  onSave: (payload: Todo, cb: () => void) => void;
  isLoading: boolean;
}) {
  const [show, setShow] = useState<boolean>(false);

  const onClickSave = (payload: Todo) => {
    onSave(payload, () => {
      setShow(false);
    });
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setShow(true)}>Add Todo</Button>
        <ModalAddTodo
          show={show}
          onHide={() => setShow(false)}
          isLoading={isLoading}
          onSave={onClickSave}
        />
      </div>
    </>
  );
}
