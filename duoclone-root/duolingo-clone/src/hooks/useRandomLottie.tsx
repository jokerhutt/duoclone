import { useEffect, useState } from "react";

export function useRandomLottie(possibleAnimations: string[]) {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * possibleAnimations.length);
    const file = possibleAnimations[random];

    fetch(file)
      .then((res) => res.json())
      .then(setAnimationData);
  }, [possibleAnimations]);

  return animationData;
}
