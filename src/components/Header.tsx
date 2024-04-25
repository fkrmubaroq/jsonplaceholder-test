import Link from "next/link";

export default function Header() {
  return <div className="flex justify-center bg-gray-700 mx-auto">
    <Link href="/isr" className="px-3 py-2 hover:bg-gray-800 cursor-pointer" >Todo (ISR)</Link>
    <Link href="/" className="px-3 py-2 hover:bg-gray-800 cursor-pointer" >Todo (SSR)</Link>
  </div>
}