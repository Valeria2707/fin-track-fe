import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import { LOGO_SIZE_LARGE, LOGO_SIZE_SMALL, LOGO_SRC } from '@/constants/ui';
import { useLogoutMutation } from '@/features/authApi';
import { handleError } from '@/helpers/handleError';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      router.push(ROUTES.login);
    } catch (error) {
      handleError(error);
    }
  };

  const linkClass = (route: string) =>
    `flex w-full items-center py-2 px-3 text-lg font-semibold rounded-md transition-colors ${
      pathname === route ? 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  const navLinkClass = (route: string) =>
    `group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors ${
      pathname === route
        ? 'bg-gray-200 text-black dark:bg-gray-800 dark:text-white'
        : 'bg-white hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'
    }`;

  return (
    <div className="container mx-auto">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <DialogTitle />
            <Link href={ROUTES.dashboard} prefetch={false} className="flex justify-center">
              <Image src={LOGO_SRC} alt="Logo" width={LOGO_SIZE_LARGE} height={LOGO_SIZE_LARGE} />
            </Link>
            <div className="grid gap-2 py-6">
              <Link href={ROUTES.dashboard} className={linkClass(ROUTES.dashboard)} prefetch={false}>
                Dashboard
              </Link>
              <Link href={ROUTES.transactions} className={linkClass(ROUTES.transactions)} prefetch={false}>
                Transactions
              </Link>
              <Link href={ROUTES.analytics} className={linkClass(ROUTES.analytics)} prefetch={false}>
                Analysis
              </Link>
              <Link href={ROUTES.goals} className={linkClass(ROUTES.goals)} prefetch={false}>
                Goals
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href={ROUTES.dashboard} className="mr-3 hidden lg:flex items-center" prefetch={false}>
          <Image src={LOGO_SRC} alt="Logo" width={LOGO_SIZE_SMALL} height={LOGO_SIZE_SMALL} />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link href={ROUTES.dashboard} className={navLinkClass(ROUTES.dashboard)} prefetch={false}>
                Dashboard
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href={ROUTES.transactions} className={navLinkClass(ROUTES.transactions)} prefetch={false}>
                Transactions
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href={ROUTES.analytics} className={navLinkClass(ROUTES.analytics)} prefetch={false}>
                Analysis
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href={ROUTES.goals} className={navLinkClass(ROUTES.goals)} prefetch={false}>
                Goals
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-6 items-center">
          <Button className="text-base" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
}
