import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div>
            <h1>Нет доступа</h1>
            <br />
            <p>У вас нет доступа к данной странице</p>
            <div className="flex-grow">
                <button className="btn btn-layout" onClick={goBack}>Назад</button>
            </div>
        </div>
    )
}

export default Unauthorized;