import { CheckCircleFilled, DeleteFilled, EditFilled, FireFilled } from "@ant-design/icons";
import { CompleteButton, DeleteButton, EditButton } from "../styles/BoxContainer";
import { ActionsHeader, ButtonDiv, TableContainer, TaskHeader } from "../styles/TableContainer";
import { TableDataProps } from "../types/TableDataProps";
import { Space, Table, Tooltip } from "antd";
import { Task } from "../types/task"

export function TableData({ tasks, handleChangeStatusTask, handleEditTask, handleDeleteTask }: TableDataProps) {
    const columns = [
        {
            title: <TaskHeader>Tasks</TaskHeader>,
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Task) => (
                <div style={{ textDecoration: record.status === 'complete' ? 'line-through' : 'none' }}>{text}</div>
            ),
            width: '60%',
        },
        {
            title: <ActionsHeader>Actions</ActionsHeader>,
            dataIndex: '',
            key: 'actions',
            render: (record: Task) => (<>
                <ButtonDiv>
                    <Space size="middle" className="ant-space ant-space-align-right"> {/* Aplicando classes do Ant Design */}
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
                </ButtonDiv>
            </>
            ),
            width: '40%',
        },
    ];

    const reversedTasks = [...tasks].reverse();
    const dataSourceWithKeys = reversedTasks.map(task => ({ ...task, key: task.id }));

    return (
        <TableContainer>
            <Table
                dataSource={dataSourceWithKeys}
                columns={columns}
                pagination={{ pageSize: 8 }}
            />

        </TableContainer>

    );
}
