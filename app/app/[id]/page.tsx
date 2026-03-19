import { notFound } from "next/navigation";
import { getStaticApps } from "@/data/apps";
import { getApps } from "@/lib/merge-apps";
import { AppDetail } from "@/components/app-detail";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getStaticApps().map((app) => ({ id: app.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const apps = await getApps();
  const app = apps.find((a) => a.id === id);
  if (!app) return { title: "Not Found" };
  return {
    title: `${app.name} — warmwetcircles`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: Props) {
  const { id } = await params;
  const apps = await getApps();
  const app = apps.find((a) => a.id === id);
  if (!app) notFound();

  return <AppDetail app={app} />;
}
