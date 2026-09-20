import { prisma } from "@/lib/prisma";
import EventsManager from "@/components/admin/EventsManager";

export const dynamic = 'force-dynamic';

export default async function AdminEvents() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'desc'
    }
  });

  return (
    <EventsManager initialEvents={events} />
  );
}
