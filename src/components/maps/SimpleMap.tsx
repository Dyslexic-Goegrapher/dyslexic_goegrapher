import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

export default function SimpleMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [4.03909528, 50.94109001],
      zoom: 5,
    });

    map.current.on("load", async () => {
      const ogcFeaturesUrl =
        "https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ogc/features/v1";
      const collection = "lu:lu_wet_bk_el_pub";
      const heritageUrl = new URL(
        `${ogcFeaturesUrl}/collections/${collection}/items`,
      );
      heritageUrl.searchParams.append("f", "application/geo+json");

      const response = await fetch(heritageUrl);
      const data = await response.json();

      map.current!.addSource("heritage", {
        type: "geojson",
        data,
      });

      map.current!.addLayer({
        id: "heritage-fill",
        type: "fill",
        source: "heritage",
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.4,
        },
      });

      map.current!.addLayer({
        id: "heritage-outline",
        type: "line",
        source: "heritage",
        paint: {
          "line-color": "#055",
          "line-width": 1,
        },
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
}
