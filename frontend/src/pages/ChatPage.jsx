const ChatPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={console.log('+')}
          >
            +
          </button>
        </div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          <li className="nav-item w-100">
            <button
              type="button"
              className="w-100 rounded-0 text-start btn bnt-secondary"
            >
              <span className="me-1">#</span>
              general
            </button>
          </li>
          <li className="nav-item w-100">
            <button
              type="button"
              className="w-100 rounded-0 text-start btn bnt-secondary"
            >
              <span className="me-1">#</span>
              random
            </button>
          </li>
          <li className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
              <button
                type="button"
                className="w-100 rounded-0 text-start text-truncate btn"
              >
                <span className="me-1">#</span>
                111
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ChatPage;
