import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./Pages/register";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Register/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;