import {createContext, ReactNode, useReducer} from "react";

export interface Project {
    id: number;
    title: string;
    short_desc: string;
    long_desc: string;
    images: string[];
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
        short_desc: "3D printed prosthetic hands for children in need",
        long_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius nunc eu viverra lobortis. Proin condimentum leo hendrerit quam pharetra posuere id in diam. Nunc placerat ullamcorper metus sit amet lacinia. Donec ac commodo nunc. Donec auctor vehicula pulvinar. In et porttitor dui. Morbi id odio a turpis accumsan vehicula. Aliquam diam eros, ullamcorper congue hendrerit quis, rutrum porta nisi. Sed finibus lorem id blandit malesuada. Ut at ex in purus dignissim vestibulum. Pellentesque in dictum nibh. Etiam tempor sapien et vehicula semper. Vivamus ac diam neque. In eu magna a nunc mattis rutrum. Aenean aliquam pulvinar dui, vitae vehicula mauris ornare quis. Donec nec ultricies massa, sed dignissim est. Vivamus placerat, libero quis interdum tempus, nisi nisl finibus dui, sed rhoncus risus nunc eu turpis. Aenean sed velit ultrices, scelerisque tortor vel, tincidunt mi. Nulla sed nisi commodo, pulvinar nibh facilisis, accumsan eros.",
        images:
            ["https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnV0dXJlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1737024251796-dd751b4d9365%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D424%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fwordmark.png%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM3Nzc0MDQyfA%26ixlib%3Drb-4.0.3&blend-w=1&auto=format&fit=crop&q=60"
            ],
    },
    {
        id: 2,
        title: "Campus Innovation Hub",
        short_desc: "Creating a makerspace for engineering students",
        long_desc: "Maecenas vel pulvinar lorem, a tincidunt tellus. Praesent tortor enim, consequat vel lorem eget, varius placerat ipsum. Etiam tincidunt tincidunt consequat. Vivamus non tempor lectus, quis fermentum ante. Donec rutrum quis turpis nec tempus. Duis gravida arcu ipsum, at egestas lacus fringilla efficitur. In arcu velit, iaculis sit amet dapibus in, placerat ut ipsum. Vivamus quis ex a elit efficitur sollicitudin sed et turpis. Curabitur et interdum enim. Sed condimentum, ipsum vel euismod rutrum, nibh orci pulvinar lectus, id sagittis diam nulla at diam. Donec condimentum tristique egestas.",
        images:
            ["https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1508402476522-c77c2fa4479d?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            ],
    },
    {
        id: 3,
        title: "Sustainable Housing",
        short_desc: "3D printed sustainable housing solutions",
        long_desc: "porttitor, egestas tempor dolor. Maecenas congue maximus iaculis. Mauris dapibus tempus sodales. Sed pharetra gravida lacus sed sollicitudin. Pellentesque magna ligula, posuere a elit ac, venenatis molestie dolor. Duis egestas rutrum cursus. Donec tincidunt dignissim aliquet. Vivamus hendrerit massa consequat metus gravida dignissim. Ut efficitur tortor eget lobortis ultrices. Maecenas vel pulvinar lorem, a tincidunt tellus. Praesent tortor enim, consequat vel lorem eget, varius placerat ipsum. Etiam tincidunt tincidunt consequat. Vivamus non tempor lectus, quis fermentum ante. Donec rutrum quis turpis nec tempus. Duis gravida arcu ipsum, at egestas lacus fringilla efficitur. In arcu velit, iaculis sit amet dapibus in, placerat ut ipsum. Vivamus quis ex a elit efficitur sollicitudin sed et turpis. Curabitur et interdum enim. Sed condimentum, ipsum vel euismod rutrum, nibh orci pulvinar lectus, id sagittis diam nulla at diam. Donec condimentum tristique egestas. Sed sed metus semper lorem tincidunt porttitor. Sed non aliquam risus. In cursus nulla nisl. Pellentesque suscipit ligula sapien. Sed iaculis in purus ut bibendum. Aenean eros augue, pretium eget leo eu, ornare semper orci. Phasellus suscipit, magna in placerat dapibus, nibh nibh",
        images:
            ["https://images.unsplash.com/photo-1490730141103-6cac27aaab94?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
                "https://images.unsplash.com/photo-1480497490787-505ec076689f?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            ],
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

export function ProjectsProvider({children}: { children: ReactNode }) {
    const [projects, dispatch] = useReducer(projectsReducer, initialProjects);
    return (
        <ProjectsContext.Provider value={{projects, dispatch}}>
            {children}
        </ProjectsContext.Provider>
    );
}
