import { useEffect, useState } from "react";
import { MotionControls } from "./components/MotionControls";
import { MotionSimulation } from "./components/MotionSimulation";
import { DataDisplay } from "./components/DataDisplay";
import { MotionData, DataPoint } from "./types/motion";
import { Play, Pause, RotateCcw } from "lucide-react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const [trackLength1, setTrackLength1] = useState(500);
  const [trackLengthInput1, setTrackLengthInput1] = useState(
    trackLength1.toString()
  );
  const [trackLength2, setTrackLength2] = useState(500);
  const [trackLengthInput2, setTrackLengthInput2] = useState(
    trackLength2.toString()
  );

  const [hasFinished1, setHasFinished1] = useState(false);
  const [hasFinished2, setHasFinished2] = useState(false);

  const [currentData1, setCurrentData1] = useState<DataPoint>({
    time: 0,
    position: 0,
    velocity: 0,
  });

  const [currentData2, setCurrentData2] = useState<DataPoint>({
    time: 0,
    position: 0,
    velocity: 0,
  });

  const [motionData1, setMotionData1] = useState<MotionData>({
    id: "1",
    name: "Mobil 1",
    type: "GLB",
    initialVelocity: 10,
    acceleration: 0,
    time: 0,
    position: 0,
    currentVelocity: 0,
  });

  const [motionData2, setMotionData2] = useState<MotionData>({
    id: "2",
    name: "Mobil 2",
    type: "GLBB",
    initialVelocity: 5,
    acceleration: 4,
    time: 0,
    position: 0,
    currentVelocity: 0,
  });

  const handleMotionChange1 = (changes: Partial<MotionData>) => {
    setMotionData1((prev) => ({ ...prev, ...changes }));
  };

  const handleMotionChange2 = (changes: Partial<MotionData>) => {
    setMotionData2((prev) => ({ ...prev, ...changes }));
  };

  const handleReset = () => {
    setIsRunning(false);
    setResetTrigger((prev) => prev + 1);
    setHasFinished1(false);
    setHasFinished2(false);

    setCurrentData1({ time: 0, position: 0, velocity: 0 });
    setCurrentData2({ time: 0, position: 0, velocity: 0 });
  };

  useEffect(() => {
    setTrackLengthInput1(trackLength1.toString());
  }, [trackLength1]);

  useEffect(() => {
    setTrackLengthInput2(trackLength2.toString());
  }, [trackLength2]);

  const toggleSimulation = () => {
    if (!hasFinished1 || !hasFinished2) {
      setIsRunning((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Simulator Gerak Lurus
          </h1>
          <p className="text-gray-600">
            Eksplorasi GLB dan GLBB dengan dua mobil bergerak.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MotionControls
            data={motionData1}
            onChange={handleMotionChange1}
            disabled={isRunning}
          />
          <MotionControls
            data={motionData2}
            onChange={handleMotionChange2}
            disabled={isRunning}
          />
        </div>

        <div className="p-6 space-y-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Panjang Lintasan {motionData1.name} (m)
              </label>
              <input
                type="number"
                required
                min="0"
                disabled={isRunning}
                value={trackLengthInput1}
                onChange={(e) => {
                  const val = e.target.value;
                  setTrackLengthInput1(val);
                  const parsed = parseFloat(val);
                  if (!isNaN(parsed) && parsed >= 0) {
                    setTrackLength1(parsed);
                  } else if (val === "") {
                    setTrackLength1(NaN);
                  }
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Panjang Lintasan {motionData2.name} (m)
              </label>
              <input
                type="number"
                required
                min="0"
                disabled={isRunning}
                value={trackLengthInput2}
                onChange={(e) => {
                  const val = e.target.value;
                  setTrackLengthInput2(val);
                  const parsed = parseFloat(val);
                  if (!isNaN(parsed) && parsed >= 0) {
                    setTrackLength2(parsed);
                  } else if (val === "") {
                    setTrackLength2(NaN);
                  }
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Simulasi</h2>
            <div className="flex space-x-2">
              <button
                onClick={toggleSimulation}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                disabled={hasFinished1 && hasFinished2}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Jeda
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Mulai
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 active:scale-95"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </button>
            </div>
          </div>

          <MotionSimulation
            key={`mobil1-${resetTrigger}`}
            data={motionData1}
            isRunning={isRunning}
            onDataPoint={setCurrentData1}
            color="text-blue-600"
            trackLength={trackLength1}
            onFinish={() => setHasFinished1(true)}
          />
          <MotionSimulation
            key={`mobil2-${resetTrigger}`}
            data={motionData2}
            isRunning={isRunning}
            onDataPoint={setCurrentData2}
            color="text-red-600"
            trackLength={trackLength2}
            onFinish={() => setHasFinished2(true)}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DataDisplay
              data={currentData1}
              name={motionData1.name}
              color="border-blue-600"
            />
            <DataDisplay
              data={currentData2}
              name={motionData2.name}
              color="border-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
