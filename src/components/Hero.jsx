import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden rounded-2xl shadow-lg">
      <Spline
        scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Earthquake Visualizer
        </h1>
        <p className="mt-3 max-w-2xl text-white/90 text-sm sm:text-base">
          Explore real-time seismic activity worldwide. Spin and explore the 3D globe, then dive into the interactive map below.
        </p>
      </div>
    </section>
  );
}

export default Hero;
