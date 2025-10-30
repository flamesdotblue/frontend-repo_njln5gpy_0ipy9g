import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function magnitudeColor(mag) {
  if (mag >= 6) return '#7f1d1d';
  if (mag >= 5) return '#b91c1c';
  if (mag >= 4) return '#dc2626';
  if (mag >= 3) return '#ef4444';
  if (mag >= 2) return '#f87171';
  return '#fecaca';
}

function EarthquakeMap({ quakes }) {
  const center = [20, 0];

  return (
    <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow">
      <MapContainer center={center} zoom={2} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {quakes.map((q) => (
          <CircleMarker
            key={q.id}
            center={[q.lat, q.lng]}
            radius={Math.max(3, q.mag * 2)}
            pathOptions={{ color: magnitudeColor(q.mag), fillColor: magnitudeColor(q.mag), fillOpacity: 0.6 }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">M {q.mag.toFixed(1)} — {q.place}</div>
                <div className="text-xs text-gray-600">Depth: {q.depth} km</div>
                <div className="text-xs text-gray-600">{new Date(q.time).toLocaleString()}</div>
                <a
                  className="text-xs text-red-600 underline"
                  href={q.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  USGS details
                </a>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EarthquakeMap;
