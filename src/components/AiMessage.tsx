import smallLogo from "../assets/logo-small.svg";
import Markdown from "react-markdown";

export default function AiMessage({ message }: { message: string }) {
  return (
    <div className="flex">
      <img className="ml-4" src={smallLogo} alt="small-logo-icon" />
      <div className="bg-[#141718] mr-auto text-sm tracking-wider max-w-full w-fit px-4 py-3 mt-6 ml-4 rounded-lg ">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  );
}
