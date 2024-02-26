import { Table, Tooltip } from "antd";
import { ButtonDiv, CompleteButton, DeleteButton, EditButton } from "../styles/BoxContainer";
import { TableDataProps } from "../types/TableDataProps"
import { Task } from "../types/task"
import { CheckCircleFilled, DeleteFilled, EditFilled, FireFilled } from "@ant-design/icons";
import { TableContainer } from "../styles/TableContainer";

export function TableData({ tasks, handleChangeStatusTask, handleEditTask, handleDeleteTask }: TableDataProps) {
    const columns = [
        { title: 'Task', dataIndex: 'title', key: 'title' },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (text: string, task: Task) => (
                <>
                    <ButtonDiv>
                        <Tooltip title={task.status === 'open' ? 'task complete?' : 'remake?'}>
                            <CompleteButton status={task.status} onClick={() => handleChangeStatusTask(task.id, task.status)}>
                                {task.status === 'open' ? <CheckCircleFilled /> : <FireFilled />}
                            </CompleteButton>
                        </Tooltip>

                        <Tooltip title="edit task?">
                            <EditButton onClick={() => handleEditTask(task.id, task.title, task.status)}>
                                <EditFilled />
                            </EditButton>
                        </Tooltip>

                        <Tooltip title="delete task?">
                            <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                                <DeleteFilled />
                            </DeleteButton>
                        </Tooltip>
                    </ButtonDiv>

                </>
            ),
        },

    ];

    const data: Task[] = [
        {
            id: 1,
            title: 'John Brown',
            status: 'open',

        },
        {
            id: 2,
            title: 'John Brown',
            status: 'open',
        },

    ];

    return (
        <TableContainer>
            <Table dataSource={data} columns={columns} />
        </TableContainer>

    );
}
