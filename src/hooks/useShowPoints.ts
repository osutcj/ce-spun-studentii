import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import ShowPointsService from '../services/showPoints.service';

const useShowPoints = () => {
  const [showPoints, setShowPoints] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchShowPoints = async () => {
      const showPointsData = await ShowPointsService.get();
      if (showPointsData.length === 0) {
        const id = await ShowPointsService.insert([false, false, false, false, false]);
        setShowPoints([false, false, false, false, false]);
      } else {
        setShowPoints(showPointsData[0].showPoints);
      }
    };

    fetchShowPoints();
  }, []);


  const updateShowPoints = async (newShowPoints: boolean[]) => {
    const showPointsData = await ShowPointsService.get();
    if (showPointsData.length === 0) {
      const id = await ShowPointsService.insert(newShowPoints);
      setShowPoints(newShowPoints);
    } else {
      await ShowPointsService.update(showPointsData[0].id, newShowPoints);
      setShowPoints(newShowPoints);
    }
  };

  const setAllTrue = async () => {
    const newShowPoints = [true, true, true, true, true];
    await updateShowPoints(newShowPoints);
  };

  return { showPoints, updateShowPoints, setAllTrue };
};

export default useShowPoints;