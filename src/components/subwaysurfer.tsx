interface SubwaysurfersProps {
  toggleSubwaysurfers: boolean;
}

export default function Subwaysurfers({ toggleSubwaysurfers }: SubwaysurfersProps) {
  if (!toggleSubwaysurfers) {
    return null;
  }
  return (
    <div className="relative w-[153px] h-[340px] overflow-hidden rounded-lg">
      <iframe
        src="https://www.youtube.com/embed/zZ7AimPACzc?autoplay=1&mute=1&loop=1&playlist=zZ7AimPACzc"
        allow="autoplay;"
        className="w-full h-full"
      />
    </div>
  );
}
