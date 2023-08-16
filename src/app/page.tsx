import Image from 'next/image'
import Timeline from '@/components/Timeline';


async function getActs() {
  const res = await fetch('https://lowlands.nl/api/pages/find/?html_path=%2Facts%2F');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const {acts} = await res.json() || {};
  const formattedActs = (acts || []).reduce((acc, {value: act, id}) => [...acc, { title: act?.title, category: act?.category?.id, id, heroImage: act?.heroImage, startDate: act?.dates?.at(0)?.startDate, endDate: act?.dates?.at(0)?.endDate }], []);
  const filteredActs = formattedActs.filter(act => act?.category === 1);
  console.log(filteredActs);
  return filteredActs.sort((a, b) => new Date(a?.startDate) - new Date(b?.startDate));
}


export default async function Home() {
  const acts = await getActs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-5">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Timeline items={acts} />
      </div>
    </main>
  )
}
