import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "netzo/components/card.tsx";
import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Badge } from "netzo/components/badge.tsx";
import {
  I18N,
  type Interaction,
  interactionSchema,
} from "@/services/interactions.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = ({ options }: TableProps): TableProps["columns"] => [
  {
    id: "actions",
    cell: (props) => <TableRowActions {...props} options={options} />,
  },
  {
    accessorKey: "id",
    header: (props) => <TableColumnHeader {...props} title={I18N.id} />,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex items-center">
          <a
            href={`/invoices/${id}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {id}
          </a>
          <IconCopy value={id} tooltip="Copy ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: (props) => <TableColumnHeader {...props} title={I18N.type} />,
    cell: ({ row }) => {
      const { type } = row.original;
      const props = ({
        call: {
          icon: "mdi-phone",
          text: "Call",
          className: `bg-purple hover:bg-orange bg-opacity-80 text-white`,
        },
        email: {
          icon: "mdi-email",
          text: "Email",
          className: `bg-red hover:bg-red bg-opacity-80 text-white`,
        },
        meeting: {
          icon: "mdi-account-group",
          text: "Meeting",
          className: `bg-yellow hover:bg-yellow bg-opacity-80 text-white`,
        },
        "whatsapp-msg": {
          icon: "mdi-whatsapp",
          text: "WhatsApp",
          className: `bg-green hover:bg-green bg-opacity-80 text-white`,
        },
        "livechat-msg": {
          icon: "mdi-chat",
          text: "Livechat",
          className: `bg-green hover:bg-green bg-opacity-80 text-white`,
        },
        "facebook-msg": {
          icon: "mdi-facebook",
          text: "Facebook",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "instagram-msg": {
          icon: "mdi-instagram",
          text: "Instagram",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "linkedin-msg": {
          icon: "mdi-linkedin",
          text: "LinkedIn",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "twitter-msg": {
          icon: "mdi-twitter",
          text: "Twitter",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        other: {
          icon: "mdi-help",
          text: "Other",
          className: `bg-gray hover:bg-gray bg-opacity-80 text-white`,
        },
      } as any)?.[type];

      return props
        ? (
          <Badge variant="default" className={`${props.className}`}>
            <i className={`${props.icon} mr-1`} />
            {props.text}
          </Badge>
        )
        : null;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.createdAt} />,
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
      // return <input type="date" bind:value={createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.updatedAt} />,
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
      // return <input type="date" bind:value={updatedAt} />;
    },
  },
];

export function Table(
  props: Omit<TableProps<Interaction, unknown>, "columns">,
) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({
    ...props,
    columns,
    meta: {
      forms: {
        create: interactionSchema,
        update: interactionSchema,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Deals
            </CardTitle>
            <div className="w-4 h-4 mdi-tag text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14/28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+19.6%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <div className="w-4 h-4 mdi-currency-usd text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Sale Value
            </CardTitle>
            <div className="w-4 h-4 mdi-currency-usd-circle text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3230.85</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-5.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Interactions
            </CardTitle>
            <div className="w-4 h-4 mdi-history text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+53</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <TableToolbar {...props} table={table} />
      <div className="border rounded-md">
        <Grid {...props} columns={columns} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
