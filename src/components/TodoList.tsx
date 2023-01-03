import { useQuery, useMutation } from "@apollo/client";
import { tasksQuery, taskInsert, taskUpdate } from "../graphql/query";
import { OrderByDirection, TasksQueryQuery } from "../graphql/__generated__/graphql";

export const TodoList = () => {
  const {
    loading,
    data: queryData,
    refetch: refetchTasks,
  } = useQuery<TasksQueryQuery>(tasksQuery, {
    variables: {
      orderBy: [
        {
          created_at: OrderByDirection.DescNullsFirst,
        },
      ],
    },
  });

  const [insertTask, { loading: mutationLoading }] = useMutation(taskInsert);

  const [updateTask, { loading: updateLoading }] = useMutation(taskUpdate);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formElement = event.currentTarget;
    event.preventDefault();
    const { title } = Object.fromEntries(new FormData(event.currentTarget));
    if (typeof title !== "string") return;
    if (!title) return;
    await insertTask({
      variables: {
        objects: [{ title }],
      },
      onCompleted: () => refetchTasks(),
    });
    formElement.reset();
  };

  const toggleTaskStatus = async (taskId: string, updatedStatus: boolean) => {
    await updateTask({
      variables: {
        set: {
          is_completed: updatedStatus,
        },
        filter: {
          id: {
            eq: taskId,
          },
        },
      },
      onCompleted: () => refetchTasks(),
    });
  };

  if (loading) {
    return <div>Loading</div>;
  }

  const tasks = queryData?.tasksCollection?.edges ?? [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow min-h-0 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.node.id} className="text-lg p-1 flex">
            <div className="flex-grow">{task.node.title}</div>
            <button className="px-2" onClick={() => toggleTaskStatus(task.node.id, !task.node.is_completed)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${task.node.is_completed ? "stroke-green-500" : "stroke-gray-500"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <form className="flex items-center p-1" onSubmit={onSubmit}>
        <input
          className="border-green-300 border bg-transparent rounded py-1 px-2 flex-grow mr-2"
          type="title"
          name="title"
          placeholder="New Task"
        />
        <button
          type="submit"
          disabled={mutationLoading}
          className="py-1 px-4 text-lg bg-green-400 rounded text-black disabled:bg-gray-500"
        >
          {mutationLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};
