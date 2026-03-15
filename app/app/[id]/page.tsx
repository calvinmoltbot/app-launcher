import { notFound } from "next/navigation";
import { getStaticApps } from "@/data/apps";
import { AppDetail } from "@/components/app-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getStaticApps().map((app) => ({ id: app.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const app = getStaticApps().find((a) => a.id === id);
  if (!app) return { title: "Not Found" };
  return {
    title: `${app.name} — warmwetcircles`,
    description: app.description,
  };
}

export default async function AppDetailPage({ params }: Props) {
  const { id } = await params;
  const app = getStaticApps().find((a) => a.id === id);
  if (!app) notFound();

  return <AppDetail app={app} />;
}
