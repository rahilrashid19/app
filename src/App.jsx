import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [jsonData, setJsonData] = useState("");

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  // Function to extract fields and generate Excel
  const generateExcel = () => {
    try {
      const data = JSON.parse(jsonData);
      const requiredFields = data.map((item) => ({
        "IP Address": item.ip_address,
        Name: "",
        Password: "",
        "Camera Name": item.name,
        "RTSP URL": item.url,
      }));

      const worksheet = XLSX.utils.json_to_sheet(requiredFields);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, "output.xlsx");

      // Clear the text area after generating Excel
      setJsonData("");
    } catch (error) {
      alert("Invalid JSON", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        JSON to Excel Exporter
      </h1>

      <textarea
        className="w-[80%] h-[80vh] p-4 bg-gray-800 text-gray-200 border border-gray-600 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your JSON here..."
        value={jsonData}
        onChange={handleJsonChange}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        onClick={generateExcel}
      >
        Generate Excel
      </button>
    </div>
  );
}

export default App;
