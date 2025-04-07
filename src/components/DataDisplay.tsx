import React from "react";
import { DataPoint } from "../types/motion";

interface DataDisplayProps {
  data: DataPoint;
  name: string;
  color: string;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  name,
  color,
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${color}`}>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Waktu</p>
          <p className="text-lg font-medium">{data.time.toFixed(2)} s</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Jarak</p>
          <p className="text-lg font-medium">{data.position.toFixed(2)} m</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Kecepatan</p>
          <p className="text-lg font-medium">{data.velocity.toFixed(2)} m/s</p>
        </div>
      </div>
    </div>
  );
};
