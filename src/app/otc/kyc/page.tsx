import {Suspense} from "react"
import KycForm from "@/components/Otc/KycForm";

export default function Page() {
  return (
    <Suspense>
      <KycForm />
    </Suspense>
  );
}
