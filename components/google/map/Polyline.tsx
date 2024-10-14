"use client";

import MapComponent from "./MapComponent";

/**
 * Map Polyline
 * @param options Google Map Polyline options
 * @param events events listeners
 */
const Polyline = ({ options, ...events }) => {
  return (
    <MapComponent component="Polyline" options={options} events={events} />
  );
};

export default Polyline;
