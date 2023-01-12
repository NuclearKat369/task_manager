import Employees from './Employees'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../features/store'
import { selectCurrentUser, selectCurrentToken } from '../features/auth/authSlice'
import useRefreshToken from '../hooks/useRefreshToken'

const ManagementComponent = () => {

    const user = useAppSelector(selectCurrentUser);
    const token = useAppSelector(selectCurrentToken);

    const management = user ? `Welcome ${user}!` : "Welcome!"
    console.log("USER AND TOKEN IN MANAGEMENT",user, token)
    const content = (
        <div>
            <h1>Администрирование</h1>
            <br />
            <Employees />
            <br />
            <h1>{management}</h1>
            <div className="flex-grow">
                <Link to="/">Главная</Link>
                <Link to="/tasks/all">All Tasks?</Link>
            </div>
        </div>
    )

    return content;
}

export default ManagementComponent;