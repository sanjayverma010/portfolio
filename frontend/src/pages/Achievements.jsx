import PageTransition from "../components/PageTransition";

export default function Achievements() {
  return (
    <PageTransition>
      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Achievements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow-lg rounded-lg">🏅 Achievement 1</div>
          <div className="p-4 bg-white shadow-lg rounded-lg">🏅 Achievement 2</div>
        </div>
      </div>
    </PageTransition>
  );
}
