import { signal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import type { NetzoState } from "../../mod.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar.tsx";
import { buttonVariants } from "../button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu.tsx";
import { Separator } from "../separator.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../sheet.tsx";
import { Switch } from "../switch.tsx";
import { useDarkMode } from "../use-dark-mode.ts";
import { cn } from "../utils.ts";

export const open = signal<boolean>(false);

type NavRootProps = JSX.IntrinsicElements["nav"] & {
  state?: NetzoState;
  children?: ComponentChildren;
};

export function NavRoot({ className, ...props }: NavRootProps) {
  const darkMode = useDarkMode();

  const logoSrc = darkMode.value
    ? `https://netzo.io/logos/built-with-netzo-dark.svg`
    : `https://netzo.io/logos/built-with-netzo-light.svg`;

  const NavFooter = () => (
    <footer className="w-full flex items-center justify-between p-3 b-t-1">
      <a href="https://netzo.io/" target="_blank" className="mx-auto">
        <img src={logoSrc} alt="Built with Netzo" title="Built with Netzo" className="h-[28px]" />
      </a>
    </footer>
  );

  return (
    <>
      {/* MOBILE */}
      <Sheet
        className={cn("!md:hidden", open.value ? "w-[250px]" : "w-[28px]")}
        open={open.value}
        onOpenChange={(e) => open.value = e}
      >
        <SheetTrigger asChild>
          <div
            variant="outline"
            size="icon"
            className={cn(
              "h-full w-[28px]",
              "fixed top-0 left-0 z-1000",
              "hover:bg-background hover:bg-opacity-80 hover:cursor-pointer",
              "flex items-center justify-center",
              open.value ? "!hidden" : "!md:hidden",
            )}
            onClick={() => open.value = !open.value}
          >
            <i className="i-mdi-menu-open rotate-180  h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle navigation</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] p-0">
          <nav
            className={cn(
              "h-screen overflow-y-auto group flex flex-col bg-primary-foreground",
              className,
            )}
          >
            {props.children}
            <NavFooter />
          </nav>
        </SheetContent>
      </Sheet>

      {/* DESKTOP */}
      <nav
        className={cn(
          "!hidden !md:flex md:b-r-1",
          "h-screen overflow-y-auto group flex flex-col bg-primary-foreground",
          className,
        )}
      >
        {props.children}
        <NavFooter />
      </nav>
    </>
  );
}

type NavHeaderProps = JSX.IntrinsicElements["header"] & {
  /** A short title for the app at the navigation drawer. */
  title?: string;
  /** An https or data URL of a cover image at the navigation drawer */
  image?: string;
};

export function NavHeader({ className, ...props }: NavHeaderProps) {
  return (
    <header {...props} className={cn("flex items-center py-3 px-2", className)}>
      {props?.image && (
        <img
          src={props?.image}
          className="w-auto h-[28px] my-auto mr-3"
        />
      )}
      {props?.title && <h2 className="text-lg font-bold">{props?.title}</h2>}
    </header>
  );
}

export function NavSeparator(props: JSX.IntrinsicElements["div"]) {
  return <Separator {...props} />;
}

export function NavSpacer(
  { className, ...props }: JSX.IntrinsicElements["div"],
) {
  return <div {...props} className={cn("flex-1", className)} />;
}

type NavItemHeaderProps = JSX.IntrinsicElements["h3"] & {
  /** A short title for the app at the navigation drawer. */
  text: string;
};

export function NavItemHeader({ className, ...props }: NavItemHeaderProps) {
  return (
    <h3
      className={cn(
        "mt-3 mb-1 mx-4 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {props.text}
    </h3>
  );
}

type NavItemProps = JSX.IntrinsicElements["a"] & {
  /** An https or data URL of an icon to be shown at the navigation item. */
  icon?: string;
  /** A short title for the app at the navigation drawer. */
  text: string;
  /** An absolute or relative URL of the page to navigate to. */
  href?: string;
  /** An optional target to open the link in. */
  target?: string;
  /** Whether link active state should be exact or not (useful to disable ancestor link styles). */
  exact?: boolean;
};

export function NavItem({ className, ...props }: NavItemProps) {
  return (
    <div>
      <a
        className={cn(
          buttonVariants({ variant: "ghost", className: "rounded-none" }),
          "flex w-full justify-start h-[40px]",
          "hover:cursor-pointer hover:bg-muted", // hover
          props.exact ? "" : `aria-[current='true']:bg-border`, // ancestor links
          `aria-[current='page']:bg-border`, // current page
          className,
        )}
        href={props.href}
        target={props.target}
      >
        {props.icon && (props.icon.startsWith("http")
          ? <img {...props} src={props.icon} className="w-4 h-4 mr-3" />
          : <div {...props} className={cn("w-4 h-4 mr-3", props.icon)} />)}
        {props.text}
      </a>
    </div>
  );
}

export function NavItemUser(
  props: { state: NetzoState; showToggleDarkMode?: boolean },
) {
  const { showToggleDarkMode = false } = props;
  const { auth } = props.state ?? {};

  const darkMode = useDarkMode();

  const { name, authId, email } = auth?.sessionUser ?? {};
  const initials = name || authId || email || "?";
  const initial = initials?.[0]?.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "ghost", className: "rounded-none" }),
            "flex w-full items-center justify-start h-[56px] pl-2 pr-3",
            "hover:cursor-pointer hover:bg-muted", // hover
          )}
        >
          {auth?.sessionUser
            ? (
              <>
                <Avatar className="h-9 w-9 mr-2">
                  <AvatarImage
                    src={auth?.sessionUser?.avatar}
                    alt={`@${auth?.sessionUser?.authId}}`}
                  />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {auth?.sessionUser?.name}
                  </p>
                  {auth?.sessionUser?.email && (
                    <p className="text-xs leading-none text-muted-foreground">
                      {auth?.sessionUser?.email}
                    </p>
                  )}
                </div>
              </>
            )
            : (
              <>
                <i className="i-mdi-account-circle h-7 w-7 ml-0.5 mr-1.5" />
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    User Settings
                  </p>
                </div>
              </>
            )}
          <i className="i-mdi-unfold-more-horizontal h-6 w-6 ml-auto" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" forceMount>
        {auth?.sessionUser?.name && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {auth?.sessionUser?.name}
                </p>
                {auth?.sessionUser?.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {auth?.sessionUser?.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {showToggleDarkMode && (
          <DropdownMenuItem>
            <div className="flex gap-4 w-full items-center justify-between">
              Dark mode
              <Switch
                checked={darkMode.value}
                onCheckedChange={(value) => darkMode.value = value}
              />
            </div>
          </DropdownMenuItem>
        )}
        {auth?.sessionUser?.name && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/auth/signout" title="Sign out" className="w-full">
                Log out
              </a>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
