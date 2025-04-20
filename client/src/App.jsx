import "./App.css";
import { useState } from 'react';

function App() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([]);

  const sendCommand = async () => {
    const res = await fetch('http://localhost:3000/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    const data = await res.json();
    setLogs((logs) => [...logs, { input: command, output: data }]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-scroll">
        <textarea
          className="w-full h-24 p-2 border rounded"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={sendCommand}>
          Run Command
        </button>
        <div className="mt-4 space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="bg-white p-2 border rounded">
              <b>{log.input}</b>
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(log.output, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 bg-black">
        <iframe src="http://localhost:5800/vnc.html" className="w-full h-full border-none" title="Remote Browser" />
      </div>
    </div>
  );
}

export default App;
