
type CardProps = {
  title: string;
  value: string;
  subtext: string;
};
// forced to learn typescript now :(


export default function Card({ title, value, subtext }: CardProps) {
  return (
    <div className="card border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-between">
      <div className="title text-sm font-semibold">{title}</div>
      <div className="value text-2xl font-bold">{value}</div>
      <div className="subtext text-sm">{subtext}</div>
    </div>
  );
}
