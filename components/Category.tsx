
export default  function Category( {categories}: any) {
  return (
    <div className="flex flex-row gap-5">
      {categories.map((c: any) => (
        <button
          key={c._id}
          className="flex justify-between hover:cursor-pointer items-center w-full px-4 py-2 bg-white text-sm text-gray-700 rounded-full shadow-sm hover:bg-gray-100 z-10"
        >
          <div className="font-semibold text-xs">{c.title}</div>
        </button>
      ))}
    </div>
  );
}
