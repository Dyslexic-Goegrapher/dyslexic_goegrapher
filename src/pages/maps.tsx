import maplibregl from "maplibre-gl";
import { useRef, useEffect } from "react";

export default function Maps() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/globe.json",
        center: [0, 0],
        zoom: 2,
      });
    }
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);
  return (
    <>
      <div ref={mapContainer} style={{ height: "100vh" }}></div>
    </>
  );
}
