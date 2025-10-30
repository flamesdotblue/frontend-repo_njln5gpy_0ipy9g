import { Slider } from '@radix-ui/themes';

function Controls({ minMag, setMinMag, onlySignificant, setOnlySignificant, count }) {
  return (
    <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <span className="text-sm text-gray-500">{count} earthquakes</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum magnitude: {minMag.toFixed(1)}</label>
        <input
          type="range"
          min={0}
          max={7}
          step={0.1}
          value={minMag}
          onChange={(e) => setMinMag(parseFloat(e.target.value))}
          className="w-full accent-red-600"
        />
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span>0.0</span>
          <div className="flex-1 h-px bg-gray-200" />
          <span>7.0</span>
        </div>
      </div>

      <label className="inline-flex items-center gap-2 select-none">
        <input
          type="checkbox"
          checked={onlySignificant}
          onChange={(e) => setOnlySignificant(e.target.checked)}
          className="h-4 w-4 accent-red-600"
        />
        <span className="text-sm text-gray-700">Show only significant (M ≥ 4.5)</span>
      </label>
    </div>
  );
}

export default Controls;
