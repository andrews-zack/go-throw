import MapSnip from "./MapSnip"

function Hole() {

    return(
        <div className="d-flexflex-column justify-content-center">
            <h3>Shilito Park</h3>
            <div className="container">
                <div className="row text-center">
                    <div className="col">Hole 2</div>
                    <div className="col">279ft</div>
                    <div className="col">Par 3</div>
                </div>
            </div>
            <MapSnip />
            <div className="container">
                <div className="row">
                    <div className="col-8">Zack Andrews</div>
                    <div className="col-4">
                        <input type="score" className="form-control" placeholder="Score"/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-info">Previous Hole</button>
                    </div>
                    <div className="col justify-content-center">
                        <button className="btn btn-outline-info">Next Hole</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hole