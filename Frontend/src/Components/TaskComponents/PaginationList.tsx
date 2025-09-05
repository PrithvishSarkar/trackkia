import { Pagination, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux-toolkit/reduxStore.js";
import fetchTasksList from "../../helperFunctions/fetchTasks.js";

const PaginationList = ({ taskListLength }: { taskListLength: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalTasks, totalPages, pageNumber } = useSelector(
    (state: RootState) => state.taskList
  );
  /*
  totalPages --> Number of Pagination Items.
  pageNumber --> Pagination Active Link.
  */
  const paginationItems = [];
  for (let index = 1; index <= totalPages; index++) paginationItems.push(index);

  return (
    <Container
      fluid
      className="d-md-flex align-items-center justify-content-between gap-2 py-3"
    >
      <Pagination
        size="lg"
        className={totalPages <= 1 ? "d-none" : "m-0 flex-grow-1"}
      >
        {paginationItems.map((page, index) => (
          <Pagination.Item
            key={index}
            active={page === pageNumber}
            onClick={() => fetchTasksList(page, dispatch)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
      <div className="fw-semibold fst-italic fs-5 text-secondary">
        Showing{" "}
        <span className="text-success">
          {6 * pageNumber - 5} -{" "}
          {Math.min(6 * pageNumber, 6 * pageNumber - 6 + taskListLength)}
        </span>{" "}
        out of <span className="text-success">{totalTasks}</span> tasks
      </div>
    </Container>
  );
};

export default PaginationList;
