const Info = ({
  eyebrowText,
  value,
  uom
}: {
  eyebrowText: string;
  value: number | string;
  uom?: string;
}) => {
  return (
    <div>
      <p className="font-thin text-sm mt-4">{eyebrowText}</p>
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold">{value} {uom}</h4>
    </div>
  );
};

export default Info;
