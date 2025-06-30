import { AsteroidData } from '../../../types/apiTypes';
import Info from '../info';

export const SelectedAsteroid = ({ data }: { data: AsteroidData }) => {
  return (
    <div className="p-4 break-all overflow-auto">
      <h3 className="mb-4 font-semibold">Detailed information</h3>
      <div className="flex justify-center items-center gap-x-4">
        <img className="h-20 w-24" src="/asteroid.png" />
        <div className='hidden lg:block'>
          <div>
            <p className="font-thin">Asteroid id</p>
            <p className="font-bold text-lg">{data?.id}</p>
          </div>
          <div className="mt-4">
            <p className="font-thin">Asteroid name</p>
            <p className="font-bold text-lg">{data?.name}</p>
          </div>
        </div>
      </div>
      <div className='lg:hidden'>
        <div>
          <p className="font-thin">Asteroid id</p>
          <p className="font-bold text-xl">{data?.id}</p>
        </div>
        <div className="">
          <p className="font-thin">Asteroid name</p>
          <p className="font-bold text-xl">{data?.name}</p>
        </div>
      </div>
      {data?.isHazardous ? (
        <div className="flex justify-center items-center gap-x-3 font-thin italic mt-4">
          <p className="h-3 w-3 rounded-full bg-red-400" />
          <p>This asteroid is hazardous to our planet!</p>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-x-3 font-thin italic mt-4">
          <p className="h-3 w-3 rounded-full bg-teal-400" />
          <p>This asteroid is harmless!</p>
        </div>
      )}
      <Info
        eyebrowText="How big is it?"
        value={data?.estimatedDiameter}
        uom="kms"
      />
      <Info
        eyebrowText="How fast is it moving?"
        value={data?.relativeVelocity}
        uom="kms/sec"
      />
      <Info
        eyebrowText="How close will it get to earth?"
        value={data?.missDistance}
        uom="kms"
      />
      <Info
        eyebrowText="When is it going to approach us?"
        value={data?.approachDate}
      />
      <div>
        <p className="font-thin text-sm mt-4">
          For more info please visit this link:
        </p>
        <a className="font-semibold text-blue-500 underline" href={data?.url}>
          {data?.url}
        </a>
      </div>
    </div>
  );
};
