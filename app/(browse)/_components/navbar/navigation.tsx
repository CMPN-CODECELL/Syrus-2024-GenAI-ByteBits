import {
  UserGroupIcon,
  HomeIcon,
  InformationCircleIcon, // Import InformationCircleIcon
} from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
      name: "About Us",
      href: "/dashboard/invoices",
      icon: InformationCircleIcon,
  },
  { name: "Comicify", href: "/comicify", icon: UserGroupIcon },
];

export const NavLinks = () => {
  return (
      <>
          {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                  <a
                      key={link.name}
                      href={link.href}
                      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                  >
                      <LinkIcon className="w-6" />
                      <p className="hidden md:block">{link.name}</p>
                  </a>
              );
          })}
      </>
  );
};