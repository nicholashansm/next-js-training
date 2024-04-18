import { useRouter } from "next/router";

const EditProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Editing Product ID: {id}</h1>
        </div>
    );
}

export default EditProductPage;