import { useEffect, useState } from "react";
import { MotionControls } from "./components/MotionControls";
import { MotionSimulation } from "./components/MotionSimulation";
import { DataDisplay } from "./components/DataDisplay";
import { MotionData, DataPoint } from "./types/motion";
import { Play, Pause, RotateCcw } from "lucide-react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [trackLength, setTrackLength] = useState(500);
  const [trackLengthInput, setTrackLengthInput] = useState(
    trackLength.toString(),
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
    setTrackLengthInput(trackLength.toString());
  }, [trackLength]);

  const toggleSimulation = () => {
    if (!hasFinished1 || !hasFinished2) {
      setIsRunning((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulator Gerak Lurus
          </h1>
          <p className="text-gray-600">
            Eksplorasi GLB dan GLBB dengan dua mobil bergerak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Panjang Track (m)
            </label>
            <input
              type="number"
              required
              min="0"
              disabled={isRunning}
              value={trackLengthInput}
              onChange={(e) => {
                const val = e.target.value;
                setTrackLengthInput(val);
                const parsed = parseFloat(val);
                if (!isNaN(parsed) && parsed >= 0) {
                  setTrackLength(parsed);
                } else if (val === "") {
                  setTrackLength(NaN);
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center ">
            <h2 className="text-xl font-semibold">Simulasi</h2>
            <div className="space-x-2 flex">
              <button
                onClick={toggleSimulation}
                className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                className="flex items-center px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 active:scale-95"
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
            trackLength={trackLength}
            onFinish={() => setHasFinished1(true)}
          />
          <MotionSimulation
            key={`mobil2-${resetTrigger}`}
            data={motionData2}
            isRunning={isRunning}
            onDataPoint={setCurrentData2}
            color="text-red-600"
            trackLength={trackLength}
            onFinish={() => setHasFinished2(true)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
