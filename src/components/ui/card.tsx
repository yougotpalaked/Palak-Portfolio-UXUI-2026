import Link from "next/link";

interface CardProps {
  href: string;
  title: string;
  description: string;
}

export function Card({ href, title, description }: CardProps) {
  return (
    <Link
      href={href}
      className="w-full block p-6 rounded-md border border-gray-300 dark:border-gray-700 transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 bg-white dark:bg-black"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}