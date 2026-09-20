import { FaPencilAlt, FaTimes } from "react-icons/fa";

function DataList({ data, onEdit, onDelete }) {
  return (
    <div>
      <h2>Recent Health Statistics</h2>
      <div className="list">
        {data.map((item, index) => (
          <div key={index}>
            <div className="cardInfo">
              <h5>{item.description}</h5>
              <p>Calories Intake = {item.calorieIntake} Calories Burned = {item.calorieBurned}</p>  
            </div>
            <div className="cardInner">
              <p>{item.date}</p>
              <button className="delete-btn" onClick={() => onDelete(index)}><FaTimes /></button>
              <button className="edit-btn" onClick={() => onEdit(index)}><FaPencilAlt /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataList;
