import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                    <div className="col-sm-10 col-sm-offset-1 text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">404</h1>
                        </div>
                        <div className="contant_box_404">
                            <h3>Looks like you're lost</h3>
                            <p>the page you are looking for is not available!</p>
                            <button className="buttonLink_404">
                                <Link to='/'>Go to Main</Link>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage