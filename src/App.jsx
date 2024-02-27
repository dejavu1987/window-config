import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gridWidth, setGridWidth] = useState(100);
  const [gridHeight, setGridHeight] = useState(100);
  const [gridColumns, setGridColumns] = useState(1);
  const [gridRows, setGridRows] = useState(1);
  const [gridGap, setGridGap] = useState(10);
  const [gridColumnTemplate, setGridColumnTemplate] = useState([]);
  const [gridRowTemplate, setGridRowTemplate] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    setGridColumnTemplate(new Array(parseInt(gridColumns)).fill(10));
    const areas = [];
    for (let i = 0; i < gridColumns; i++) {
      for (let j = 0; j < gridRows; j++) {
        areas.push(i + "-" + j);
      }
    }
    setAreas(areas);
  }, [gridColumns, gridRows]);
  useEffect(() => {
    setGridRowTemplate(new Array(parseInt(gridRows)).fill(10));
    const areas = [];
    for (let i = 0; i < gridColumns; i++) {
      for (let j = 0; j < gridRows; j++) {
        areas.push(i + "-" + j);
      }
    }
    setAreas(areas);
  }, [gridRows]);

  return (
    <div className="flex">
      <div className="sidebar w-96 bg-slate-200 p-4 h-screen">
        <h3>Window size</h3>
        <div className="form-control flex gap-2 items-baseline">
          <input
            type="number"
            id="grid-width"
            className="w-12"
            defaultValue={gridWidth}
            onChange={(e) => {
              setGridWidth(e.target.value);
            }}
          />
          <span>cm, </span>
          <input
            type="number"
            id="grid-height"
            className="w-12"
            defaultValue={gridHeight}
            onChange={(e) => {
              setGridHeight(e.target.value);
            }}
          />
          <span>cm</span>
        </div>

        <form>
          <h3>Window Columns</h3>
          <div className="form-control flex gap-2 items-baseline">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              id="grid-columns"
              className="w-full"
              defaultValue={gridColumns}
              onChange={(e) => {
                setGridColumns(e.target.value);
              }}
            />
            <input type="text" className="w-12" readOnly value={gridColumns} />
          </div>
          <h3>Window Rows</h3>
          <div className="form-control flex gap-2 items-baseline">
            <input
              type="range"
              className="w-full"
              min="1"
              max="10"
              step="1"
              id="grid-rows"
              defaultValue={gridRows}
              onChange={(e) => {
                setGridRows(e.target.value);
              }}
            />
            <input type="text" className="w-12" readOnly value={gridRows} />
          </div>
          <div className="form-control">
            <h3>Frame thickness</h3>
            <input
              type="range"
              className="w-full"
              min="10"
              max="20"
              step="1"
              id="grid-gap"
              defaultValue={gridGap}
              onChange={(e) => {
                setGridGap(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <h3>Window Column Config</h3>
            {new Array(parseInt(gridColumns)).fill("").map((item, index) => (
              <div className="flex" key={index}>
                <input
                  type="range"
                  className="w-full"
                  min="10"
                  max={gridWidth}
                  step="1"
                  defaultValue={gridColumnTemplate[index]}
                  onChange={(e) => {
                    gridColumnTemplate[index] = e.target.value;
                    setGridColumnTemplate([...gridColumnTemplate]);
                  }}
                />
                <input
                  type="number"
                  className="w-12"
                  readOnly
                  value={gridColumnTemplate[index]}
                />
                <span>cm</span>
              </div>
            ))}
          </div>
          {/* grid row template */}
          <div className="form-control">
            <h3>Grid Row Template</h3>
            {new Array(parseInt(gridRows)).fill("").map((item, index) => (
              <div className="flex" key={index}>
                <input
                  type="range"
                  className="w-full"
                  min="10"
                  max={gridHeight}
                  step="1"
                  defaultValue={gridRowTemplate[index]}
                  onChange={(e) => {
                    gridRowTemplate[index] = e.target.value;
                    setGridRowTemplate([...gridRowTemplate]);
                  }}
                />
                <input
                  type="number"
                  className="w-12"
                  readOnly
                  value={gridRowTemplate[index]}
                />
                <span>cm</span>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="main bg-slate-400 flex-grow">
        <div
          id="canvas"
          className="bg-slate-100 w-full h-screen mx-auto my-auto"
          style={{
            padding: `${gridGap}px`,
            width: `${(gridWidth / gridHeight) * 100}vh`,
          }}
        >
          <div
            className="grid h-full mx-auto my-auto"
            style={{
              gridTemplateColumns: gridColumnTemplate
                .map((x) => `${x}fr`)
                .join(" "),
              gridTemplateRows: gridRowTemplate.map((x) => `${x}fr`).join(" "),
              gridGap: `${gridGap}px`,
            }}
          >
            {areas.map((area, index) => (
              <div
                className="grid-item border border-slate-600"
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
