// adapted from https://stackoverflow.com/a/74202858
import type { ComponentChildren, JSX } from "preact";

export type FormFetchProps = JSX.IntrinsicElements["form"] & {
  id: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  action: string;
  children?: ComponentChildren;
};

/**
 * An isomorphic form component that overrides the default submit (GET/POST)
 * with an HTTP Request using fetch to allow for GET/POST/PUT/PATCH/DELETE
 *
 * @example POST /datastore/users
 * <FormFetch id="users.post" action="/datastore/users" method="post">
 *
 * @example PATCH /datastore/users/:id
 * <FormFetch id="users.patch" action={`/datastore/users/${user.id}`} method="patch">
 *
 * @example DELETE /datastore/users/:id
 * <FormFetch id="users.delete" action={`/datastore/users/${user.id}`} method="delete">
 *
 * @param {string} props.id - The id of the form
 * @param {string} props.action - The URL to send the form data to
 * @param {string} props.method - The HTTP method to use (GET/POST/PUT/PATCH/DELETE)
 * @returns {JSX.Element} - The form component
 */
export const FormFetch = ({
  id,
  action,
  method = "post",
  ...props
}: FormFetchProps) => {
  return (
    <>
      <form id={id} method={method} action={action} {...props}>
        {props.children}
      </form>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const form = document.getElementById("${id}");
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
              const response = await fetch("${action}", {
                method: "${method.toUpperCase()}",
                body: JSON.stringify(Object.fromEntries(formData))
              });
              const data = await response.json();
              globalThis.location.reload();
            } catch (error) {
              console.error(error);
            }
          });
        `,
        }}
      />
    </>
  );
};
