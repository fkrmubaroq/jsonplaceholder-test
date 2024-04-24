import dynamic from "next/dynamic";

const Portal = dynamic(() => import("./Portal"), { ssr: false });
export default function Modal({
  children,
  onHide,
  show,
}: {
  children: React.ReactNode;
  onHide: () => void;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 "
        onClick={() => onHide()}
      />
      <div className="fixed bg-white p-4 rounded-lg shadow-md left-1/2 -translate-x-1/2 top-3 w-3/4 sm:w-[450px] xl:w-[600px] mx-auto">
        <div className="absolute right-4">
          <button
            className="text-gray-600 hover:text-gray-800 cursor-pointer focus:outline-none"
            onClick={() => onHide()}
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </Portal>
  );
}
