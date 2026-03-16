import { useEffect, useState } from 'react';

export default function useCountUp(end, duration = 2000, start = 0, active = true) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, active]);

  return value;
}
