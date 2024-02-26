import { CheckCircleFilled, DeleteFilled, EditFilled, FireFilled } from "@ant-design/icons";
import { CompleteButton, DeleteButton, EditButton } from "../styles/BoxContainer";
import { TableContainer } from "../styles/TableContainer";
import { TableDataProps } from "../types/TableDataProps";
import { Space, Table, Tooltip } from "antd";
import { Task } from "../types/task"

export function TableData({ tasks, handleChangeStatusTask, handleEditTask, handleDeleteTask }: TableDataProps) {
    const columns = [
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Task) => (
                <div style={{ textDecoration: record.status === 'complete' ? 'line-through' : 'none' }}>{text}</div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (record: Task) => (<>

                <Space size="middle">
                    <Tooltip title={record.status === 'open' ? 'task complete?' : 'remake?'}>
                        <CompleteButton status={record.status} onClick={() => handleChangeStatusTask(record.id, record.status)}>
                            {record.status === 'open' ? <CheckCircleFilled /> : <FireFilled />}
                        </CompleteButton>
                    </Tooltip>

                    <Tooltip title="edit task?">
                        <EditButton onClick={() => handleEditTask(record.id, record.title, record.status)}>
                            <EditFilled />
                        </EditButton>
                    </Tooltip>

                    <Tooltip title="delete task?">
                        <DeleteButton onClick={() => handleDeleteTask(record.id)}>
                            <DeleteFilled />
                        </DeleteButton>
                    </Tooltip>
                </Space>
            </>
            ),
        },
    ];

    const dataSourceWithKeys = tasks.map(task => ({ ...task, key: task.id }));

    return (
        <TableContainer>
            <Table
                dataSource={dataSourceWithKeys}
                columns={columns} />

        </TableContainer>

    );
}
