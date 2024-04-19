import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DummyJsonUserApi {
    users: UserData[]
}

interface UserData {
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string,
}

const UserIndexPage: Page = () => {
    /**
     * Define the current page number.
     */
    const [page] = useState(1);

    /**
     * Define how many data rows to show per page.
     */
    const pageRows = 10;

    const [users, setUsers] = useState<UserData[]>([]);

    // Reference: https://ant.design/components/modal.
    // const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://dummyjson.com/users');
            const userData = (await data.json()) as DummyJsonUserApi;
            const users = userData.users;

            setUsers(users);
        }

        try {
            fetchData();
        } catch (error) {
            console.error(error);
        }
    });

    const userColumns: ColumnsType<UserData> = [
        {
            title: 'No.', dataIndex: 'rowNumber',
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        {
            title: 'Profile Picture', dataIndex: 'image',
            render: (value) => <img src={value} alt="Profile Picture" className="w-10 h-10 rounded-full" />
        },
        {
            title: 'Full Name', dataIndex: 'fullName',
            render: (__value, user) => <span>{`${user.firstName} ${user.lastName}`}</span>
        },
        { title: 'Birthday', dataIndex: 'birthDate' },
        // {
        //     title: 'Action',
        //     dataIndex: 'id',
        //     render: (__value, user) => <Button className="bg-red-500" onClick={() => onClickDeleteProduct(user)}>
        //         <FontAwesomeIcon className="text-white" icon={faTrash} />
        //     </Button>
        // }
    ]

    return <>
        <h1>Users</h1>

        <p>Welcome to the user page!</p>
        <Link href="/user/create">Click here to create an user</Link>

        <Table rowKey="id"
            dataSource={users}
            columns={userColumns}></Table>

        {/* {contextHolder} */}
    </>
}

UserIndexPage.layout = WithDefaultLayout;
export default UserIndexPage;