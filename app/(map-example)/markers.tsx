"use client";

import { useState } from "react";
import MapMarker from "../../components/google/map/Marker";
import InfoWindow from "../../components/google/map/InfoWindow";
import { Marker } from "./marker.type";

/**
 * Display markers and infowindow example
 * @param markers List of markers to display
 */
export default function Markers({ markers }: { markers: Marker[] }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [content, setContent] = useState("");

  return (
    <>
      {markers.map((marker: Marker) => (
        <MapMarker
          key={marker.id}
          options={{
            position: { lat: marker.lat, lng: marker.lng },
          }}
          onClick={(e, m) => {
            setSelectedMarker(m);
            setContent('<span style="color: black">' + marker.name + "</span>");
          }}
        />
      ))}

      <InfoWindow options={{ content }} marker={selectedMarker} />
    </>
  );
}
