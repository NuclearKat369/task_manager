import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../features/store';
import { selectCurrentToken, selectCurrentFirstName } from '../features/auth/authSlice';

const ManagementComponent = () => {

    const user = useAppSelector(selectCurrentFirstName);
    //useAppSelector(selectCurrentUser);

    const token = useAppSelector(selectCurrentToken);

    const navigate = useNavigate();

    console.log("USER AND TOKEN IN MANAGEMENT", user, token);
    const content = (
        <div>
            <h1>Администрирование</h1>
            <div className="btn-group py-2" role="group">
                <button type="button" className="btn btn-layout" onClick={() => navigate("workload")}>Загруженность</button>
                <button type="button" className="btn btn-layout" onClick={() => navigate("all-employees")}>Все сотрудники</button>
            </div>
            <Outlet />
        </div>
    )

    return content;
}

export default ManagementComponent;