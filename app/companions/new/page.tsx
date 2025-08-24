import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');

  const canCreateCommpanion = await newCompanionPermissions();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCommpanion
        ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>

          <CompanionForm />
        </article>
        )
        : (
          <article className="companion-limit">
            <Image src="/images/limit.svg" alt="companion limit reached" width={360} height={230} />
            <div className="cta-badge">upgrade your plan</div>
            <h1>You've Reached Your Limit</h1>
            <p>yo're reach your companion limit, upgrade to create more companion and access premium features</p>
            <Link href="/subscription" className="btn-primary w-fit justify-center">upgrade my plan</Link>
          </article>
        )
      }
    </main>
  )
}

export default NewCompanion