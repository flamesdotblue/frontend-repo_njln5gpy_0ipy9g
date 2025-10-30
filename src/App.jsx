import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Controls from './components/Controls';
import EarthquakeMap from './components/EarthquakeMap';
import QuakeList from './components/QuakeList';
import Stats from './components/Stats';

function App() {
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [minMag, setMinMag] = useState(2.5);
  const [onlySignificant, setOnlySignificant] = useState(false);

  useEffect(() => {
    async function fetchQuakes() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        if (!res.ok) throw new Error('Failed to fetch USGS data');
        const data = await res.json();
        const parsed = data.features.map((f) => ({
          id: f.id,
          mag: f.properties.mag ?? 0,
          place: f.properties.place ?? 'Unknown location',
          time: f.properties.time,
          url: f.properties.url,
          lng: f.geometry.coordinates[0],
          lat: f.geometry.coordinates[1],
          depth: f.geometry.coordinates[2],
        }));
        setQuakes(parsed);
      } catch (e) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchQuakes();
    const id = setInterval(fetchQuakes, 5 * 60 * 1000); // refresh every 5 minutes
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    return quakes.filter((q) => {
      if (onlySignificant && q.mag < 4.5) return false;
      return q.mag >= minMag;
    });
  }, [quakes, minMag, onlySignificant]);

  function handleFocus(q) {
    // no-op for now; interaction handled on map markers
    alert(`M ${q.mag.toFixed(1)} — ${q.place}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Hero />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Stats quakes={filtered} />
            {loading ? (
              <div className="flex items-center justify-center h-[60vh] bg-white rounded-2xl shadow">
                <div className="animate-spin h-8 w-8 border-4 border-rose-200 border-t-rose-600 rounded-full" />
              </div>
            ) : error ? (
              <div className="p-6 bg-white rounded-2xl shadow text-red-700">{error}</div>
            ) : (
              <EarthquakeMap quakes={filtered} />
            )}
          </div>
          <div className="space-y-6">
            <Controls
              minMag={minMag}
              setMinMag={setMinMag}
              onlySignificant={onlySignificant}
              setOnlySignificant={setOnlySignificant}
              count={filtered.length}
            />
            <QuakeList quakes={filtered} onFocus={handleFocus} />
          </div>
        </div>

        <footer className="text-center text-xs text-gray-500">
          Data source: USGS Earthquake Hazards Program — updated every few minutes.
        </footer>
      </div>
    </div>
  );
}

export default App;
