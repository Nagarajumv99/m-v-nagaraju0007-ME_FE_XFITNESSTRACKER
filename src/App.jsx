import { useState, useEffect } from "react";
import Header from "./components/Header";
import DataForm from "./components/DataForm";
import DataList from "./components/DataList";
// import { WeeklyTrends, OverallData } from "./components/Charts";
import WeeklyTrends from "./components/BarChart";
import OverallData from "./components/PieChart";
import { saveData, loadData } from "./utils/localStorage";
import "./styles.css";

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    setData(loadData());
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = {
      date: formData.get("date"),
      calorieIntake: Number(formData.get("calorieIntake")),
      calorieBurned: Number(formData.get("calorieBurned")),
      description: formData.get("description"),
    };

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = newEntry;
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, newEntry]);
    }

    setShowForm(false);
    e.target.reset();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  const filteredData = selectedDate
    ? data.filter((item) => item.date === selectedDate)
    : data;

  const totalCaloriesIntake = filteredData.reduce((sum, item) => sum + Number(item.calorieIntake || 0), 0);
  const totalCaloriesBurned = filteredData.reduce((sum, item) => sum + Number(item.calorieBurned || 0), 0);
  const netCalories = totalCaloriesIntake - totalCaloriesBurned;
  const availableDates = [...new Set(data.map((item) => item.date).filter(Boolean))].sort();
  const latestDate = availableDates[availableDates.length - 1] || "";

  return (
    <div className="app-container">
      <Header />

      <div className="cardWrapper">
        <div className="card">
          <h3>Update Today's Data</h3>
          <button onClick={() => setShowForm(true)}>+ Add data</button>
        </div>

        <div className="recharts-responsive-container">
          {filteredData && filteredData.length > 0 ? (
            <div className="charts-container">
              <WeeklyTrends data={filteredData} />
            </div>
          ) : <p className="empty-state">No data available for this date.</p>}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <DataForm
              onSubmit={handleSubmit}
              initialData={editIndex !== null ? data[editIndex] : null}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      )}

      {/* Recent Health Statistics */}
      <div className="transactionsWrapper">
        <div className="habitListWrapper">
          <h2>Recent Health Statistics</h2>
          {filteredData && filteredData.length > 0 ? (<DataList data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />) : <p className="empty-state">No data available for this date.</p>}
          
        </div>
        <div className="recharts-responsive-container">
          <OverallData data={filteredData} />
        </div>
      </div>

    </div>
  );
}

export default App;
