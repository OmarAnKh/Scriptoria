import './LoadingPage.css'
const LoadingPage = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col text-center">
                    <div className="bookshelf_wrapper">
                        <ul className="books_list">
                            <li className="book_item first" />
                            <li className="book_item second" />
                            <li className="book_item third" />
                            <li className="book_item fourth" />
                            <li className="book_item fifth" />
                            <li className="book_item sixth" />
                        </ul>
                        <div className="shelf" />
                    </div>
                </div>
                <p className="mt-5" style={{ fontsize: "calc(1.375rem + 1.5vw)", fontweight: "bold", display: "flex", justifycontent: "center" }}>Loading Page Please Wait...</p>
            </div>
        </div>

    )
}
export default LoadingPage;