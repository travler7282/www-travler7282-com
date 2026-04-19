import React, { useState, useEffect } from 'react';
import './App.css';

// Define the 6-servo joint state
interface ArmState {
  baseRotate: number;
  shoulderBend: number;
  elbowBend: number;
  wristBend: number;
  gripperRotate: number;
  gripperClaw: number; // 0 = Open, 100 = Closed
}

interface ControlSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

const App: React.FC = () => {
  const [joints, setJoints] = useState<ArmState>({
    baseRotate: 90,
    shoulderBend: 90,
    elbowBend: 90,
    wristBend: 90,
    gripperRotate: 90,
    gripperClaw: 20,
  });

  const [status, setStatus] = useState<string>("System Online");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Mock function to simulate sending commands to hardware
  const handleUpdate = (joint: keyof ArmState, value: number) => {
    setJoints(prev => ({ ...prev, [joint]: value }));
    setIsSyncing(true);
    setStatus(`Moving ${joint.replace(/([A-Z])/g, ' $1').toLowerCase()} to ${value}...`);
  };

  // Reset to home position
  const homeArm = () => {
    setJoints({
      baseRotate: 90,
      shoulderBend: 90,
      elbowBend: 90,
      wristBend: 90,
      gripperRotate: 90,
      gripperClaw: 0
    });
    setStatus("Homing sequence initiated...");
  };

  // Clear syncing indicator after a short delay
  useEffect(() => {
    if (isSyncing) {
      const timeout = setTimeout(() => setIsSyncing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSyncing]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="app-title">RoboArm Controller</h1>
          <div className="status-row">
            <div className={`status-dot ${isSyncing ? 'status-dot-busy' : 'status-dot-ready'}`} />
            <span className="status-text">LAB_ARM_01: {isSyncing ? 'BUSY' : 'READY'}</span>
          </div>
        </div>
        <button onClick={homeArm} className="home-button">Home Arm</button>
      </header>

      <main className="app-layout">
        {/* Left Side: Camera Feed */}
        <section className="camera-section">
          <div className="camera-frame">
            <div className="camera-overlay">
              <div className="live-tag"><span className="pulse" /> LIVE FEED</div>
              <div className="timestamp">{new Date().toLocaleTimeString()}</div>
            </div>
            {/* Simulation of a Camera View */}
            <div className="camera-mock">
              <div className="crosshair" />
              <p className="mock-text">NO VIDEO SIGNAL - SIMULATING VIEW</p>
            </div>
          </div>
          <div className="terminal">
            <span className="terminal-prefix">{'>'}</span> {status}
          </div>
        </section>

        {/* Right Side: Remote Controls */}
        <aside className="control-panel">
          <h2 className="panel-title">Manual Control</h2>

          <div className="control-group">
            <h3 className="group-label">Base Control</h3>
            <ControlSlider label="Rotation" value={joints.baseRotate} onChange={(v: number) => handleUpdate('baseRotate', v)} />
          </div>

          <div className="control-group">
            <h3 className="group-label">Arm Linkage</h3>
            <ControlSlider label="Shoulder" value={joints.shoulderBend} onChange={(v: number) => handleUpdate('shoulderBend', v)} />
            <ControlSlider label="Elbow" value={joints.elbowBend} onChange={(v: number) => handleUpdate('elbowBend', v)} />
            <ControlSlider label="Wrist" value={joints.wristBend} onChange={(v: number) => handleUpdate('wristBend', v)} />
          </div>

          <div className="control-group">
            <h3 className="group-label">End Effector</h3>
            <ControlSlider label="Grip Rotate" value={joints.gripperRotate} onChange={(v: number) => handleUpdate('gripperRotate', v)} />
            <ControlSlider label="Gripper Claw" value={joints.gripperClaw} max={100} unit="%" onChange={(v: number) => handleUpdate('gripperClaw', v)} />
          </div>
        </aside>
      </main>
    </div>
  );
};

// Reusable Control Component
const ControlSlider: React.FC<ControlSliderProps> = ({ label, value, onChange, min = 0, max = 180, unit = "°" }) => {
  const inputId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
  <div className="slider-row">
    <div className="slider-header">
      <label className="slider-label" htmlFor={inputId}>{label}</label>
      <span className="value-readout">{value}{unit}</span>
    </div>
    <input
      id={inputId}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="slider-input"
      title={`${label} control`}
      aria-label={label}
    />
  </div>
  );
};

export default App;