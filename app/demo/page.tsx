import { redirect } from "next/navigation";
import DemoExperience from "@/components/DemoExperience";

interface DemoPageProps {
  searchParams: Promise<{ assistantId?: string; practiceName?: string }>;
}

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const params = await searchParams;
  const { assistantId, practiceName } = params;

  if (!assistantId || !practiceName) {
    redirect("/");
  }

  return (
    <main className="fixed inset-0 z-0 flex flex-col overflow-hidden">
      <DemoExperience
        assistantId={assistantId}
        practiceName={decodeURIComponent(practiceName)}
      />
    </main>
  );
}
