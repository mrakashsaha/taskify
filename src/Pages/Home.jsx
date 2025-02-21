import NavBar from "../components/NavBar";
import TaskDashboard from "../components/TaskDashboard";
import TaskBoard from "../components/TaskBoard";

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            {/* <TaskDashboard></TaskDashboard> */}
            <TaskBoard></TaskBoard>
        </div>
    );
};

export default Home;