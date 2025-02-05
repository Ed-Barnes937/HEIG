import Image from "next/image";

export function Background() {
  return (
    <Image
      src={`/HEIGBackground.jpeg`}
      alt={"App background"}
      className="100vw"
      fill
      quality={100}
    />
  );
}
