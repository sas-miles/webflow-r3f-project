import { useEffect } from "react";
import { getProject } from "@theatre/core";
import { useNavigationStore } from "~/features/zustandStore/navigationStore";

const AnimationControls = () => {
  const project = getProject("Demo Project");
  const mainSheet = project.sheet("Main");
  const {
    currentScreen,
    setCurrentScreen,
    targetScreen,
    isSetup,
    setIsSetup,
    setIsAnimating,
  } = useNavigationStore();

  useEffect(() => {
    const transitions: Record<string, [number, number]> = {
      Intro: [0, 0],
      Main: [0, 5],
      School: [6, 12],
      Apartment: [13, 19],
      Office: [20, 26],
    };
    project.ready.then(() => {
      if (currentScreen === targetScreen) return;
      if (isSetup && currentScreen === "Intro") {
        return;
      }
      setIsSetup(true);

      const reverse = targetScreen === "Main" && currentScreen !== "Intro";
      const transition = transitions[reverse ? currentScreen : targetScreen];
      if (!transition) {
        return;
      }
      setIsAnimating(true);
      mainSheet.sequence
        .play({
          range: transition as [number, number],
          direction: reverse ? "reverse" : "normal",
          rate: reverse ? 2 : 1,
        })
        .then(() => {
          setCurrentScreen(targetScreen);
          setIsAnimating(false);
        });
    });
  }, [targetScreen]);

  return null;
};

export default AnimationControls;
