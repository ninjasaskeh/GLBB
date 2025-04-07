import React, { useEffect, useState } from "react";
import { MotionData } from "../types/motion";

interface MotionControlsProps {
  data: MotionData;
  onChange: (data: Partial<MotionData>) => void;
  disabled?: boolean;
}

export const MotionControls: React.FC<MotionControlsProps> = ({
  data,
  onChange,
  disabled = false,
}) => {
  const [velocityInput, setVelocityInput] = useState(
    data.initialVelocity.toString(),
  );
  const [accelInput, setAccelInput] = useState(data.acceleration.toString());

  useEffect(() => {
    setVelocityInput(data.initialVelocity.toString());
  }, [data.initialVelocity]);

  useEffect(() => {
    setAccelInput(data.acceleration.toString());
  }, [data.acceleration]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{data.name}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Jenis Gerakan
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={data.type}
            onChange={(e) =>
              onChange({ type: e.target.value as "GLB" | "GLBB" })
            }
            disabled={disabled}
          >
            <option value="GLB">Gerak Lurus Beraturan (GLB)</option>
            <option value="GLBB">Gerak Lurus Berubah Beraturan (GLBB)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kecepatan Awal (v₀) m/s
          </label>
          <input
            required
            type="number"
            min="0"
            disabled={disabled}
            value={velocityInput}
            onChange={(e) => {
              const val = e.target.value;
              setVelocityInput(val);
              const parsed = parseFloat(val);
              if (!isNaN(parsed) && parsed >= 0) {
                onChange({ initialVelocity: parsed });
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {data.type === "GLBB" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Percepatan (a) m/s²
            </label>
            <input
              required
              type="number"
              min="0"
              disabled={disabled}
              value={accelInput}
              onChange={(e) => {
                const val = e.target.value;
                setAccelInput(val);
                const parsed = parseFloat(val);
                if (!isNaN(parsed) && parsed >= 0) {
                  onChange({ acceleration: parsed });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
