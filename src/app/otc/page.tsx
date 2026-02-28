import {Suspense} from "react"
import BuyForm from "@/components/Otc/BuyForm";

export default function Page() {
  return (
    <Suspense>
      <BuyForm />
    </Suspense>
  );
}
