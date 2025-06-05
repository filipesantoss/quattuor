import { Rewind } from "%/@screen/(game)/(menu)/rewind";
import { Learn } from "%/@screen/(start)/learn";

export function Menu() {
  return (
    <div className="grid place-content-center bg-secondary p-2 rounded-sm grid-flow-col gap-8">
      <Rewind />
      <Learn />
    </div>
  );
}
