import { useEffect } from 'react'
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
import image5 from '../images/image5.png'
import image6 from '../images/image6.png'

function InfoComponent() {

    useEffect(() => {
        handleClick();
    }, [])

    async function handleClick() {
    }

    return (
        <div>
            <h1>Справочная информация</h1>
            <div className="d-flex flex-container fs-3 p-2">
                <div className="d-flex flex-column p-2">
                    <div className="d-flex flex-row fs-6 px-2">
                        При входе на главную страницу приложения открывается перечень всех имеющихся заявок, для создания новой заявки, необходимо нажать кнопку "Новая заявка".
                    </div>
                    <img className="p-2" src={image1} style={{ width: "650px" }} alt="Полный список задач"></img>
                    <div className="d-flex flex-row fs-6 px-2">
                        Задачи можно отфильтровать по номеру, теме и статусу, нажав на соответствующий заголовок таблицы.
                    </div>
                    <img className="p-2" src={image2} style={{ width: "650px" }} alt="Возможность сортировки"></img>
                    <div className="d-flex flex-row fs-6 px-2">
                        Каждую задачу можно открыть для просмотра деталей или удалить, нажав соответствующую кнопку в строке.
                    </div>
                    <img className="p-2" src={image3} style={{ width: "650px" }} alt="Задача из списка"></img>
                    <div className="d-flex flex-row fs-6 px-2">
                        Для перехода в окно просмотра и редактирования заявки нажмите кнопку «Открыть».
                    </div>
                    <img className="p-2" src={image4} style={{ width: "650px" }} alt="Окно просмотра и редактирования с заявки"></img>
                    <div className="d-flex flex-row fs-6 px-2">
                        Заявку монжо отредактировать, изменив её тему, описание, статус или тип. Изменение статуса и типа вопроса производится посредством выбора позиции в выпадающем списке.
                        Сохранить заявку или отменить изменения можно, нажав на соответствующие кнопки.
                    </div>
                    <img className="p-2" src={image5} style={{ width: "650px" }} alt="Выпадающие меню для выбора"></img>
                    <div className="d-flex flex-row fs-6 px-2">
                        При нажатии кнопки «Новая заявка» открывается окно создания заявки. Необходимо заполнить все необходимые поля: тему, тип и описание, иначе нажать кнопка «Сохранить» будет неактивна. Статус заявке по умолчанию присваивается «Новая».
                    </div>
                    <img className="p-2" src={image6} style={{ width: "650px", marginBottom: 50 }} alt="Окно создания заявки"></img>
                </div>
            </div>
        </div>
    );
}

export default InfoComponent;
