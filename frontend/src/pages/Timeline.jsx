// components/Timeline.jsx
export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>{item.name}</h3>
            <p>{item.institution} • {item.year}</p>
            <p className="achievement">{item.achievement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}