import { Spinner as MSpinner } from "@material-tailwind/react";
export default function Spinner() {
  return (
    <div className="flex items-end gap-8">
      <MSpinner className="h-9 w-9" />
    </div>
  );
}
