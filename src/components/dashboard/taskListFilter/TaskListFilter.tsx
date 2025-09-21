import { TStatusType } from "@customtypes/index";
import { Form } from "react-bootstrap"


type TSelectFilterProps={
    statusFilter:TStatusType,
    setStatuFilter:(value:TStatusType)=> void;
}
const TaskListFilter = ({statusFilter,setStatuFilter}:TSelectFilterProps) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatuFilter(e.target.value as TStatusType);
  };

  return (
    <>
        <h5>Filter By Status</h5>
        <Form.Select
            value={statusFilter}
            onChange={onChangeHandler}
          >
            <option value="All">All </option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
        </Form.Select>
    </>

  )
}

export default TaskListFilter