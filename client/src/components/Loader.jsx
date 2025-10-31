export default function Loader({ text = "Loading..." }) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 border-b-2 mb-2"></div>
        <p className="text-blue-600 font-semibold">{text}</p>
      </div>
    );
  }
  