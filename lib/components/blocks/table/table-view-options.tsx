import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";
import { cn } from "../../utils.ts";
import type { Table } from "./table.tsx";

export function TableViewOptions<TData>({
  className,
  table,
}: JSX.IntrinsicElements["button"] & { table: Table<TData> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <i className={cn("i-mdi-tune-variant h-4 w-4", className)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[50vh] overflow-y-auto">
        {
          /* <DropdownMenuLabel>
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */
        }
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  const toggleColumn = (column) => {
                    column.toggleVisibility(!!value);
                    if (column.columns) column.columns.forEach(toggleColumn);
                  };
                  toggleColumn(column);
                }}
              >
                {column.columnDef?.title || column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
