import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
  // noStore();
  const cabins = await getCabins();

  if (!cabins) return null;

  let filteredCabin;

  if (filter === "all") filteredCabin = cabins;
  if (filter === "small")
    filteredCabin = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    filteredCabin = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    filteredCabin = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabin.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
