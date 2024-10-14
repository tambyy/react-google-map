"use client";

import MapComponent from "./MapComponent";

/**
 * Map Circle
 * @param options Google Map Circle options
 * @param events events listeners
 */
const Circle = ({ options, ...events }) => {
  return <MapComponent component="Circle" options={options} events={events} />;
};

export default Circle;
