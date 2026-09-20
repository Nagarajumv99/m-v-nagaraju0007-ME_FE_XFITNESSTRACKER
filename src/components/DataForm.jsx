import { FaTimes } from "react-icons/fa";

function DataForm({ onSubmit, initialData, setShowForm }) {
  return (
    <form onSubmit={onSubmit} className="data-form">
      <div className="form-header">
        <h2>
          {initialData
            ? "Let's see what you want to change!"
            : "How Much Net Calories did you take Today?"}
        </h2>
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" name="date" required defaultValue={initialData?.date || ""} />
      </div>
      <div>
        <label htmlFor="calorieIntake">Calorie Intake:</label>
        <input id="calorieIntake" type="number" name="calorieIntake" placeholder="Enter Today's Calorie Intake" required defaultValue={initialData?.calorieIntake ?? ""} />
      </div>
      <div>
        <label htmlFor="calorieBurned">Calorie Burned:</label>
        <input id="calorieBurned" type="number" name="calorieBurned" placeholder="Enter Today's Calorie Burned" required defaultValue={initialData?.calorieBurned ?? ""} />
      </div>
      <div>
        <label htmlFor="description">Short Description:</label>
        <input id="description" type="text" name="description" placeholder="Enter a short description" required defaultValue={initialData?.description || ""} />
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
          Close
        </button>
      </div>
    </form>
  );
}

export default DataForm;
