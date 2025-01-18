import { createContext, useReducer, ReactNode } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

type ProjectsAction =
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: number };

interface ProjectsContextType {
  projects: Project[];
  dispatch: React.Dispatch<ProjectsAction>;
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Prosthetic Hand Project",
    description: "3D printed prosthetic hands for children in need",
    image:
      "https://images.unsplash.com/photo-1576615278693-f8e095e37e01?auto=format&fit=crop&w=500",
  },
  {
    id: 2,
    title: "Campus Innovation Hub",
    description: "Creating a makerspace for engineering students",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=500",
  },
  {
    id: 3,
    title: "Sustainable Housing",
    description: "3D printed sustainable housing solutions",
    image:
      "https://images.unsplash.com/photo-1638444571685-e1ef9b9316c8?auto=format&fit=crop&w=500",
  },
];

function projectsReducer(state: Project[], action: ProjectsAction): Project[] {
  switch (action.type) {
    case "ADD_PROJECT":
      return [...state, action.payload];
    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.payload);
    default:
      return state;
  }
}

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, dispatch] = useReducer(projectsReducer, initialProjects);
  return (
    <ProjectsContext.Provider value={{ projects, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
}
