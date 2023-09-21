import React, { useRef, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [todos, setTodos] = useState([]);
  const nameRef = useRef(null);
  const statusRef = useRef(null);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todos) => [
      ...todos,
      { todoName: nameRef.current.value, todoStatus: statusRef.current.value },
    ]);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                ref={nameRef}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                ref={statusRef}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                [
                  ...todos.filter((todo) => todo.todoStatus === "active"),
                  ...todos.filter((todo) => todo.todoStatus === "completed"),
                  ...todos.filter((todo) => {
                    if (
                      todo.todoStatus === "active" ||
                      todo.todoStatus === "completed"
                    ) {
                      return;
                    } else {
                      return true;
                    }
                  }),
                ].map((todo, index) => {
                  if (show === "all" || todo.todoStatus === show) {
                    return (
                      <tr key={index}>
                        <td>{todo.todoName}</td>
                        <td>{todo.todoStatus}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
