export default function UserMessage({ message }: { message: string }) {
  return (
    <p className="bg-[#6466E9] ml-auto text-sm tracking-wider max-w-full w-fit px-4 py-3 mt-6 mr-6 rounded-lg">
      {message}
    </p>
  );
}
