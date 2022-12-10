function HeaderComponent() {


    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div><a href="http://localhost:3000/tasks/all" className='navbar-brand'>Менеджер заявок</a></div>
                    <div><a href="http://localhost:3000/info" className='nav-item navbar-brand'>Справка</a></div>
                </nav>
            </header>
        </div>
    );

}

export default HeaderComponent;