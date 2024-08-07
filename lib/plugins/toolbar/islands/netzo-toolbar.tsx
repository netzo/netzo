// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import type { ComponentChildren } from "preact";
// import { ButtonDarkMode } from "../../components/button-dark-mode.tsx";
import { Button } from "../../../components/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogContentControlled,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog.tsx";
import {
  FormFieldCombobox,
  FormFieldInput,
  FormFieldTextarea,
} from "../../../components/form-fields.tsx";
import { Form, useForm } from "../../../components/form.tsx";
import { cn } from "../../../components/utils.ts";
import { NetzoState } from "../../../mod.ts";
import { useLocalStorage } from "../../hooks.ts";
import { locales } from "../i18n.ts";

// created using v0 by Vercel see https://v0.dev/t/aLUPWlh

export type NetzoToolbarProps = JSX.IntrinsicElements["menu"] & {
  state: NetzoState;
};

export function NetzoToolbar({ state, className }: NetzoToolbarProps) {
  const { locale = "es" } = state?.toolbar ?? {};

  const i18n = locales[locale];

  const [
    expanded,
    setExpanded,
    // removeExpanded
  ] = useLocalStorage("netzo:toolbar", globalThis?.innerWidth >= 768 ? "true" : "false");

  const styles = {
    toolbarButton: "text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100",
  };

  return (
    <menu
      className={cn(
        "flex items-center justify-center",
        "rounded-full bg-zinc-800 p-2 max-w-max",
        "fixed bottom-20px -translate-x-2/4 translate-y-0 left-2/4",
        className,
      )}
    >
      {expanded === "true" && (
        <>
          <div className="flex space-x-1 pr-2 border-r border-zinc-600">
            {
              /* FIXME: requires cookies or some server-side state to persist darkMode state
            or else the darkMode state will be reset on every page load  since it's client-side only
            <ButtonDarkMode
              size="icon"
              variant="ghost"
              title={i18n.buttons.toggleDarkMode}
              className={cn(styles.toolbarButton)}
            /> */
            }
            <Button
              size="icon"
              variant="ghost"
              title={i18n.buttons.share}
              className={cn(styles.toolbarButton)}
              onClick={() => {
                globalThis.navigator.share({
                  title: globalThis.document.title,
                  url: globalThis.location.href,
                });
              }}
            >
              <i className="i-mdi-share-variant h-6 w-6" />
              <span className="sr-only">{i18n.buttons.share}</span>
            </Button>
            <DialogFeedbackNetzolabs state={state}>
              <Button
                size="icon"
                variant="ghost"
                title={i18n.buttons.feedback}
                className={cn(styles.toolbarButton)}
              >
                <i className="i-mdi-comment-question h-6 w-6" />
                <span className="sr-only">{i18n.buttons.feedback}</span>
              </Button>
            </DialogFeedbackNetzolabs>
            <DialogInfo state={state}>
              <Button
                size="icon"
                variant="ghost"
                title={i18n.buttons.info}
                className={cn(styles.toolbarButton)}
              >
                <i className="i-mdi-information h-6 w-6" />
                <span className="sr-only">{i18n.buttons.info}</span>
              </Button>
            </DialogInfo>
          </div>

          <div className="flex space-x-1 px-2 border-r border-zinc-600">
            <DialogApps state={state}>
              <Button
                size="icon"
                variant="ghost"
                title={i18n.buttons.apps.title}
                className={cn(styles.toolbarButton)}
              >
                <i className="i-mdi-apps h-6 w-6" />
                <span className="sr-only">{i18n.buttons.apps.title}</span>
              </Button>
            </DialogApps>
          </div>
        </>
      )}
      <div className={cn("flex", expanded === "true" ? "pl-2" : "")}>
        <Button
          size="icon"
          variant="ghost"
          title={expanded === "true" ? i18n.buttons.collapse : i18n.buttons.expand}
          className={cn(styles.toolbarButton)}
          onClick={() => setExpanded(expanded === "true" ? "false" : "true")}
        >
          <i className="i-mdi-menu h-6 w-6" />
          <span className="sr-only">
            {expanded === "true" ? i18n.buttons.collapse : i18n.buttons.expand}
          </span>
        </Button>
      </div>
    </menu>
  );
}

export type Issue = {
  // hidden:
  id: string;
  projectId: string;
  userId: string;
  userEmail: null | string;
  // public:
  type: "bug" | "enhancement" | "feature" | "feedback" | "question";
  title: string;
  description: string;
  // private:
  status: null | "backlog" | "stuck" | "todo" | "in-progress" | "done" | "waiting" | "deprecated";
  priority: null | "low" | "medium" | "high" | "critical";
  complexity: null | "low" | "medium" | "high" | "very-high";
  // metadata:
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

export function DialogFeedbackNetzolabs(props: { state: NetzoState; children: ComponentChildren }) {
  const [open, setOpen] = React.useState(false);

  const { locale = "es" } = props.state?.toolbar ?? {};

  const i18n = locales?.[locale];

  const id = "nav-item-feedback-form";

  const form = useForm<Issue>({
    defaultValues: {
      projectId: props.state?.toolbar?.projectId,
      userId: props.state?.auth?.sessionUser?.id,
      userEmail: props.state?.auth?.sessionUser?.email,
      type: "feedback",
      title: "",
      description: "",
      status: null,
      priority: null,
      complexity: null,
    },
  });

  const onSubmit = async ({ ...data }: Issue) => {
    // TODO: update to https://netzolabs.netzo.dev once this is live
    await fetch(`https://netzolabs-oms-gjydyhgkth7t.netzo.dev/api/issues`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    setOpen(false);
  };

  // NOTE: must manually invoke submit because submit button isteleported
  // by dialog out of form (see https://github.com/shadcn-ui/ui/issues/709)
  // IMPORTANT: When utilizing <Input type="file" /> alongside React Hook Form,
  // it is important to have an uncontrolled input (i.e. without value prop).
  // see https://github.com/shadcn-ui/ui/discussions/2137#discussioncomment-7907793
  return (
    <Dialog open={open} onOpenChange={(value) => !open && setOpen(value)}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContentControlled className="sm:max-w-[425px]" onClickClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>{i18n.dialogFeedbackNetzolabs.title}</DialogTitle>
          <DialogDescription>
            {i18n.dialogFeedbackNetzolabs.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id={id}
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() => form.reset(props.defaultValues)}
          >
            <FormFieldCombobox
              name="type"
              label={i18n.dialogFeedbackNetzolabs.form.type.label}
              options={i18n.dialogFeedbackNetzolabs.form.type.options}
              required={true}
              form={form}
              onClick={(e) => e.preventDefault()}
            />
            <FormFieldInput
              name="title"
              label={i18n.dialogFeedbackNetzolabs.form.title.label}
              type="text"
              required={true}
              form={form}
            />
            <FormFieldTextarea
              name="description"
              label={i18n.dialogFeedbackNetzolabs.form.description.label}
              required={true}
              rows={6}
              form={form}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button form={id} type="submit">
            {i18n.dialogFeedbackNetzolabs.form.submit}
          </Button>
        </DialogFooter>
      </DialogContentControlled>
    </Dialog>
  );
}

export function DialogInfo(props: { state: NetzoState; children: ComponentChildren }) {
  const { locale = "es", denoJson } = props.state?.toolbar ?? {};

  const i18n = locales?.[locale];

  const TH = "text-left font-bold text-sm text-gray-500 dark:text-gray-400";
  const TD = "text-right text-sm text-gray-500 dark:text-gray-400";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n.dialogInfo.title}</DialogTitle>
        </DialogHeader>
        <table className="w-full space-y-2 mt-3">
          <tr>
            <th className={TH}>{i18n.dialogInfo.content.name}</th>
            <td className={TD}>{denoJson?.name}</td>
          </tr>
          <tr>
            <th className={TH}>{i18n.dialogInfo.content.version}</th>
            <td className={TD}>{denoJson?.version}</td>
          </tr>
        </table>
      </DialogContent>
    </Dialog>
  );
}

export function DialogApps(props: { state: NetzoState; children: ComponentChildren }) {
  const { locale = "es", links = [] } = props.state?.toolbar ?? {};

  const i18n = locales?.[locale];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{i18n.buttons.apps.title}</DialogTitle>
        </DialogHeader>
        <div className="h-[300px] overflow-y-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.target}
              className="group flex items-center justify-between rounded-md py-2"
            >
              <div title={link.description} className="flex items-center gap-3">
                <img
                  src={link.src}
                  alt={link.alt}
                  style={{
                    marginRight: "6px",
                    height: "32px",
                    width: "32px",
                    aspectRatio: "32/32",
                  }}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {link.title}
                </span>
                {link.description && (
                  <i
                    className="i-mdi-information w-4 h-4 ml-2 text-gray-500 dark:text-gray-400"
                    title={link.description}
                  />
                )}
              </div>
              <i className="i-mdi-chevron-right h-5 w-5 text-gray-500 opacity-50 transition-opacity group-hover:opacity-100 dark:text-gray-400" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
