"use client";

import GoogleMap from "../../components/google/map/Map";
import Circle from "../../components/google/map/Circle";
import useDrawCircle from "./useDrawCircle";
import Directions from "./directions";
import Markers from "./markers";

// Markers
const markers = [
  { id: 1, name: "A", lat: 50.1773063, lng: 3.2337914 },
  { id: 2, name: "B", lat: 49.848598, lng: 3.2864 },
  { id: 3, name: "C", lat: 49.849998, lng: 2.66667 },
];

/**
 * Example of
 * Google map use
 * as a component
 */
export default function Map() {
  // Circle draw example,
  // when CTRL + mousedown then move the mouse
  const { circleOptions, beginDrawCircle, drawCircle, endDrawCircle } =
    useDrawCircle();

  return (
    <GoogleMap
      apiKey=""
      options={{
        center: { lat: 50.1773063, lng: 3.2337914 },
        zoom: 9,
        fullscreenControl: false,
        disableDefaultUI: true,
      }}
      onMapMousedown={beginDrawCircle}
      onMapMousemove={drawCircle}
      onMapMouseup={endDrawCircle}
    >
      <Circle options={circleOptions} />
      <Markers markers={markers} />
      <Directions markers={markers} />
    </GoogleMap>
  );
}
