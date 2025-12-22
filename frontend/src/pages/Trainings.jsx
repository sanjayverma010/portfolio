import Timeline from '../components/Timeline';

export default function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data));
  }, []);

  return (
    <section>
      <h1>Training & Experience</h1>
      <Timeline items={trainings} />
    </section>
  );
}