import "./Loading.css";

function Loading() {
  return (
    <div className="loading container-fluid">
      <div className="row h-100 justify-content-center align-items-center ">
        <div className="col d-flex justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading;