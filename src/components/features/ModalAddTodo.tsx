import Button from "@/components/Button";
import Checbox from "@/components/Checkbox";
import Input, { ContainerInput } from "@/components/Input";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { SpinnerIcon } from "@/components/Spinner";
import { Todo } from "@/store/api";
import { useState } from "react";
const initform = Object.freeze({
  userId: 1,
  id: 0,
  title: "",
  completed: false,
});

export default function ModalAddTodo({
  show,
  onHide,
  onSave,
  isLoading,
}: {
  show: boolean;
  onHide: () => void;
  onSave: (form: Todo) => void;
  isLoading: boolean;
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <div className="text-black">
        <Title text="Add Todo" />
        <Content data={initform} onSave={onSave} isLoading={isLoading} />
      </div>
    </Modal>
  );
}

function Title({ text }: { text: string }) {
  return <div className="text-md font-semibold ">{text}</div>;
}

function Content({
  onSave,
  data,
  isLoading,
}: {
  data: Todo;
  onSave: (form: Todo) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<Todo>(data);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-3">
      <ContainerInput>
        <Label>Title</Label>
        <Input required name="title" value={form.title} onChange={onChange} />
      </ContainerInput>
      <ContainerInput>
        <Checbox
          text="Completed"
          onChange={(e) => setForm({ ...form, completed: e.target.checked })}
        />
      </ContainerInput>

      <Button
        type="submit"
        className="flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? <SpinnerIcon width="w-6" height="h-6" /> : "Simpan"}
      </Button>
    </form>
  );
}
