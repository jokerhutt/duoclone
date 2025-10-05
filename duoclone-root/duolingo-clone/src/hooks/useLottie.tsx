import { useEffect, useState } from "react";

export function useLottie(animationPath: string) {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return animationData;

}
