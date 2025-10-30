function QuakeList({ quakes, onFocus }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-[60vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3">Recent earthquakes</h3>
      <ul className="space-y-3">
        {quakes.map((q) => (
          <li
            key={q.id}
            className="p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50/40 transition cursor-pointer"
            onClick={() => onFocus(q)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{new Date(q.time).toLocaleString()}</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">M {q.mag.toFixed(1)}</span>
            </div>
            <div className="mt-1 font-medium text-gray-800 leading-snug">{q.place}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuakeList;
