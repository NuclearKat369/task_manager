function ContactsComponent() {

    return (
        <div>
            <h1>Контакты</h1>
            <div className="d-flex flex-container fs-3 p-2">
                <div className="d-flex flex-column p-2">
                    <div className="d-flex flex-row fs-5 p-1">
                        Контакты для обращений
                    </div>
                    <div className="d-flex flex-row fs-5">
                        <div className="d-flex flex-column col-4 p-1">
                            E-mail
                        </div>
                        <div className="d-flex flex-column p-1">
                            kateustimenko@yahoo.com
                        </div>
                    </div>
                    <div className="d-flex flex-row fs-5">
                        <div className="d-flex flex-column col-4 p-1">
                            Телефон
                        </div>
                        <div className="d-flex flex-column p-1">
                            8-999-123-45-67
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsComponent;
