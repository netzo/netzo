import { Button } from "netzo/ui/components/ui/button.tsx";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
}
