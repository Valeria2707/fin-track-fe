import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import { BellIcon } from '@heroicons/react/24/outline';
import { LOGO_SIZE_LARGE, LOGO_SIZE_SMALL, LOGO_SRC } from '@/constants/ui';
import { useLogoutMutation } from '@/features/authApi';
import { handleError } from '@/helpers/handleError';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      router.push(ROUTES.login);
    } catch (error) {
      handleError(error);
    }
  };
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
              <Link href={ROUTES.dashboard} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Dashboard
              </Link>
              <Link href={ROUTES.transactions} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Transactions
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Analysis
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Goals
              </Link>
              <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Advisor
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
              <Link
                href={ROUTES.dashboard}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href={ROUTES.transactions}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base  font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Transactions
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base  font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Analysis
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base  font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Goals
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base  font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Advisor
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-6 items-center">
          <BellIcon className="h-6 w-6 " />
          <Button className="text-base" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
}
