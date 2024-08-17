import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Image
        className="animate-spin"
        alt="img"
        width={80}
        height={80}
        src={"/galaxy.svg"}
      />
    </div>
  );
};

export default Loading;
