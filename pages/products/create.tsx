import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page"

const CreateProductPage : Page = () => {
    return <>
        <h1>Create Product</h1>
        <p>Fill in the form below to create a new product.</p>
    </>
}

CreateProductPage.layout = WithDefaultLayout;
export default CreateProductPage;