export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Universidade Estadual do Maranhão
        </span>

        <h1 className="mt-5 text-5xl font-bold tracking-tight text-white">
          Portal NUGEO
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-300">
          Núcleo Geoambiental da Universidade Estadual do Maranhão
        </p>

        <button
          type="button"
          className="mt-8 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-500"
        >
          Conheça o NUGEO
        </button>
      </div>
    </main>
  );
}