export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b">
        <h1 className="text-xl font-semibold">Wellness London</h1>
        <nav className="space-x-6 text-sm">
          <a href="#">Saunas</a>
          <a href="#">Cold Plunge</a>
          <a href="#">Cryotherapy</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Discover the best wellness spaces in London
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Saunas, cold plunges, cryotherapy and recovery studios — curated for quality.
        </p>
      </section>

      {/* Listings */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {["Arc Community", "Othership London", "Rebase Recovery"].map((name) => (
          <div
            key={name}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Premium wellness experience in London
            </p>
            <button className="text-sm font-medium underline">
              View Details →
            </button>
          </div>
        ))}
      </section>

    </main>
  );
}