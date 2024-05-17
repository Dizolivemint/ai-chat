import Image from "next/image";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
    >
      <Image
        src="/Symp_2024_logo_blue.png"
        alt="symposium-logo"
        width="230"
        height="50"
        className="ml-3"
      />{" "}
    </header>
  );
}