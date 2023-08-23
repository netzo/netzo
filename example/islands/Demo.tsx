import type { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { cn } from "netzo/components/utils.ts";
import { Button as UIButton } from "netzo/components/ui/button.tsx";

import Accordion from "netzo/components/example/accordion.tsx";
import AlertDialog from "netzo/components/example/alert-dialog.tsx";
import AspectRatio from "netzo/components/example/aspect-ratio.tsx";
import Avatar from "netzo/components/example/avatar.tsx";
import Badge from "netzo/components/example/badge.tsx";
import BadgeDestructive from "netzo/components/example/badge-destructive.tsx";
import BadgeOutline from "netzo/components/example/badge-outline.tsx";
import BadgeSecondary from "netzo/components/example/badge-secondary.tsx";
import Button from "netzo/components/example/button.tsx";
import ButtonDestructive from "netzo/components/example/button-destructive.tsx";
import ButtonGhost from "netzo/components/example/button-ghost.tsx";
import ButtonLink from "netzo/components/example/button-link.tsx";
import ButtonLoading from "netzo/components/example/button-loading.tsx";
import ButtonOutline from "netzo/components/example/button-outline.tsx";
import ButtonSecondary from "netzo/components/example/button-secondary.tsx";
import ButtonWithIcon from "netzo/components/example/button-with-icon.tsx";
import Card from "netzo/components/example/card.tsx";
import Checkbox from "netzo/components/example/checkbox.tsx";
import Collapsible from "netzo/components/example/collapsible.tsx";
import Command from "netzo/components/example/command.tsx";
import ContextMenu from "netzo/components/example/context-menu.tsx";
import DatePicker from "netzo/components/example/date-picker.tsx";
import DatePickerWithRange from "netzo/components/example/date-picker-with-range.tsx";
import Dialog from "netzo/components/example/dialog.tsx";
import DropdownMenu from "netzo/components/example/dropdown-menu.tsx";
import HoverCard from "netzo/components/example/hover-card.tsx";
import Menubar from "netzo/components/example/menubar.tsx";
import NavigationMenu from "netzo/components/example/navigation-menu.tsx";
import Popover from "netzo/components/example/popover.tsx";
import Progress from "netzo/components/example/progress.tsx";
import RadioGroup from "netzo/components/example/radio-group.tsx";
import ScrollArea from "netzo/components/example/scroll-area.tsx";
import Select from "netzo/components/example/select.tsx";
import Separator from "netzo/components/example/separator.tsx";
import Sheet from "netzo/components/example/sheet.tsx";
import Skeleton from "netzo/components/example/skeleton.tsx";
import Slider from "netzo/components/example/slider.tsx";
import Switch from "netzo/components/example/switch.tsx";
import Tabs from "netzo/components/example/tabs.tsx";
import Toast from "netzo/components/example/toast.tsx";
import Toggle from "netzo/components/example/toggle.tsx";
import ToggleDisabled from "netzo/components/example/toggle-disabled.tsx";
import ToggleOutline from "netzo/components/example/toggle-outline.tsx";
import ToggleWithText from "netzo/components/example/toggle-with-text.tsx";
import Tooltip from "netzo/components/example/tooltip.tsx";

export default function KitchenSinkPage() {
  return (
    <>
      <Head>
        <link
          href="https://esm.sh/react-day-picker@8.8.0/dist/style.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="grid gap-4">
              <ComponentWrapper>
                <Card className="w-full" />
              </ComponentWrapper>
              <ComponentWrapper>
                <Slider className="w-full" />
              </ComponentWrapper>
              <ComponentWrapper className="spa flex-col items-start space-x-0
          space-y-2">
                <p className="text-sm text-muted-foreground">Documentation</p>
                <p className="text-sm font-medium leading-none">
                  You can customize the theme using{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                    CSS variables
                  </code>
                  .{" "}
                  <a
                    href="#"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    Click here
                  </a>{" "}
                  to learn more.
                </p>
              </ComponentWrapper>
              <ComponentWrapper>
                <Checkbox />
                <HoverCard />
              </ComponentWrapper>
              <ComponentWrapper className="[&>div]:w-full">
                <Tabs />
              </ComponentWrapper>
            </div>
            <div className="grid gap-4">
              <ComponentWrapper>
                <Menubar />
                <Avatar />
              </ComponentWrapper>
              <ComponentWrapper className="flex-col items-start space-x-0 space-y-2">
                <div className="flex space-x-2">
                  <Button />
                  <ButtonSecondary />
                  <ButtonDestructive />
                </div>
                <div className="flex space-x-2">
                  <ButtonOutline />
                  <ButtonLink />
                  <ButtonGhost />
                </div>
                <div className="flex space-x-2">
                  <ButtonWithIcon />
                  <ButtonLoading />
                </div>
                <div className="flex space-x-2">
                  <UIButton size="lg">Large</UIButton>
                  <UIButton size="sm">Small</UIButton>
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <DatePicker />
              </ComponentWrapper>
              <ComponentWrapper>
                <DatePickerWithRange />
              </ComponentWrapper>
              <ComponentWrapper>
                <Accordion />
              </ComponentWrapper>
              <ComponentWrapper className="[&_ul>li:last-child]:hidden">
                <NavigationMenu />
              </ComponentWrapper>
              <ComponentWrapper className="justify-between">
                <Switch />
                <Select />
              </ComponentWrapper>
              <ComponentWrapper>
                <Separator />
              </ComponentWrapper>
              <ComponentWrapper>
                <AspectRatio />
              </ComponentWrapper>
              <ComponentWrapper>
                <Popover />
                <Toast />
              </ComponentWrapper>
            </div>
            <div className="grid gap-4">
              <ComponentWrapper>
                <Tooltip />
                <Sheet />
                <Progress />
              </ComponentWrapper>
              <ComponentWrapper>
                <Command />
              </ComponentWrapper>
              <ComponentWrapper className="[&>span]:h-[80px] [&>span]:w-[200px]">
                <RadioGroup />
                <ContextMenu />
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <DropdownMenu />
                  <AlertDialog />
                  <Dialog />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <Badge />
                  <BadgeSecondary />
                  <BadgeDestructive />
                  <BadgeOutline />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <Skeleton />
              </ComponentWrapper>
              <ComponentWrapper className="[&>div]:w-full">
                <Collapsible />
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <Toggle />
                  <ToggleOutline />
                  <ToggleDisabled />
                  <ToggleWithText />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <ScrollArea />
              </ComponentWrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ComponentWrapper({
  className,
  children,
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 rounded-md p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
