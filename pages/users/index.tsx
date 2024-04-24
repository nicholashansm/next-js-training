import { WithDefaultLayout } from "@/components/DefautLayout";
import { AppSettings } from "@/functions/AppSettings";
import { Page } from "@/types/Page";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

/**
 * Define the DummyJSON user endpoint's response JSON structure.
 */
interface DummyJsonUserApi {
    users: UserData[]
}

/**
 * Define the DummyJSON user data list structure. 
 */
interface UserData {
    id: number,
    firstName: string,
    lastName: string,
    image: string,
    birthDate: string,
}

/**
 * Define the user index page component's props.
 */
interface UserIndexPageProps {
    users: UserData[],
    
    // For demonstrating the AppSettings API.
    myEnv: string,
}

const UserIndexPage: Page<UserIndexPageProps> = ({users, myEnv}) => {
    /**
     * Define the current page number.
     */
    const [page] = useState(1);

    /**
     * Define how many data rows to show per page.
     */
    const pageRows = 10;
    // Reference: https://ant.design/components/modal.
    // const [modal, contextHolder] = Modal.useModal();

    // If we want to fetch the data from the client side, we could use useEffect.
    // Read more: https://devtrium.com/posts/async-functions-useeffect.
    // const [users, setUsers] = useState<UserData[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetch('https://dummyjson.com/users');
    //         const userData = (await data.json()) as DummyJsonUserApi;
    //         const users = userData.users;

    //         setUsers(users);
    //     }

    //     try {
    //         fetchData();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);

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
        
        {/* For demonstrating the AppSettings API. */}
        <span>My Env: {myEnv}</span>

        {/* {contextHolder} */}
    </>
}

// This gets called on every request.
// Reference: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering.
export async function getServerSideProps() {
    // Fetch data from external API.
    const res = await fetch(`https://dummyjson.com/users`);
    const userData = (await res.json()) as DummyJsonUserApi;
    const users = userData.users;

    // Demonstrate the AppSettings API.
    const myEnv = AppSettings.current.myEnv;

    // Pass data to the page via props.
    return { props: { users, myEnv } }
}

UserIndexPage.layout = WithDefaultLayout;
export default UserIndexPage;