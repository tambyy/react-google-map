"use client";

import MapComponent from "./MapComponent";

/**
 * Map Polygon
 * @param options Google Map Polygon options
 * @param events events listeners
 */
const Polygon = ({ options, ...events }) => {
  return <MapComponent component="Polygon" options={options} events={events} />;
};

export default Polygon;
