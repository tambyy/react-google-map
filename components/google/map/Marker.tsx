"use client";

import MapComponent from "./MapComponent";

/**
 * Map Marker
 * @param options Google Map Marker options
 * @param events events listeners
 */
const Marker = ({ options, ...events }) => {
  return <MapComponent component="Marker" options={options} events={events} />;
};

export default Marker;
