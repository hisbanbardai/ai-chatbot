import heroImg from "../assets/hero-image.jpg";

export default function Hero() {
  return (
    <img
      className="w-full object-cover h-full"
      src={heroImg}
      alt="hero-image"
    />
  );
}
