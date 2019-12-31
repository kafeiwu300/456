import { useState, useEffect } from "react";
import { IStory } from "../../components/Kanban/interfaces";
import { createContainer } from "unstated-next"
import { getStories } from "../../agent/storyAgent";

// const useKanban = (initialState: IStory[] = []) => {
//   const [store, dispatch] = useReducer(kanbanReducer, initialState);
//   return {
//     store, dispatch
//   }
// }

const useKanban = (iterationId?: string) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (iterationId) {
      setLoading(true);
      getStories(iterationId).then(res => setStories(res.body)).finally(() => setLoading(false));
    } else {
      setStories([]);
    }
  }, [iterationId]);

  return {stories, loading};
}

export default createContainer(useKanban);