import React from "react";

const Task = props => {
  return (
    <div>
      <p>
        {props.text} and it is {props.completed}
      </p>
    </div>
  );
};

export default Task;
