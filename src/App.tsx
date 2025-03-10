import { useRoutes } from "react-router-dom";
import routes from "./routes/routes"; // Importing the centralized routes

const App: React.FC = () => {
  return useRoutes(routes); // Renders the appropriate route
};

export default App;
