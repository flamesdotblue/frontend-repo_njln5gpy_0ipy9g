function Stats({ quakes }) {
  const count = quakes.length;
  const strongest = quakes.reduce((a, b) => (b.mag > (a?.mag ?? -Infinity) ? b : a), null);
  const avgMag = count ? (quakes.reduce((sum, q) => sum + q.mag, 0) / count).toFixed(2) : '—';

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="text-sm text-gray-500">Total (24h)</div>
        <div className="text-2xl font-bold">{count}</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="text-sm text-gray-500">Strongest</div>
        <div className="text-2xl font-bold">{strongest ? strongest.mag.toFixed(1) : '—'}</div>
        <div className="text-xs text-gray-600 truncate">{strongest?.place ?? ''}</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="text-sm text-gray-500">Average Mag</div>
        <div className="text-2xl font-bold">{avgMag}</div>
      </div>
    </div>
  );
}

export default Stats;
