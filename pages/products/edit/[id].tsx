import { WithDefaultLayout } from "@/components/DefautLayout";
import productListAtom from "@/data/Products";
import { CreateOrEditProductFormType, CreateOrEditProductFormSchema } from "@/schemas/CreateOrEditProductSchema";
import { Page } from "@/types/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const EditProductPage: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [products, setProducts] = useAtom(productListAtom);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm<CreateOrEditProductFormType>({
        resolver: zodResolver(CreateOrEditProductFormSchema),
        defaultValues: products.find(product => product.id === id),
        mode: 'onChange'
    });


    /**
     * Handle the form submission event.
     * @param e 
     * @returns 
     */
    function onFormSubmit(formData: CreateOrEditProductFormType) {
        // ID should not be empty, but whenever we have a nullable property,
        // we should always check if it is null or not first.
        // When validating the form data, including ID and we already using form validation library
        // such as React Hook Form, ideally we should configure the ID validation on the same level.
        // Doing ID validation manually like this just for fast demonstration.
        if (formData.id === null) {
            // The ideal way to handle this usually tell the user that the ID is not found using alert box.
            return;
        }

        // Always treat all state as immutable, so we need a way to avoid mutate the products object directly.
        // In most cases, we should just reiterate the array data and manipulate the data we want during the iteration.
        const newProductList = products.map(product => {
            if (product.id === formData.id) {
                return {
                    ...product,
                    name: formData.name,
                    price: formData.price
                }
            }

            return product;
        })

        setProducts(newProductList);

        setIsAlertVisible(true);
    }

    return (
        <>
            <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <h1>Editing Product</h1>
                        <p><Link href={'/products'}>Or click here to go back to Products page.</Link></p>
                    </Col>
                </Row>

                {isAlertVisible &&
                    <Row>
                        <Col span={24}>
                            <Alert
                                message="Product has been updated successfully!"
                                type="success"
                                closable
                                onClose={() => setIsAlertVisible(false)}
                            />
                        </Col>
                    </Row>
                }

                <Form onFinish={handleSubmit(onFormSubmit)}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}>
                    <Form.Item label="Product Name"
                        name='name'>
                        <Controller name="name"
                            control={control}
                            render={({ field }) => <Input id="name"
                                placeholder="Product Name" {...field} />} />
                    </Form.Item>
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                    <Form.Item label="Product Price"
                        name='price'>
                        <Controller name="price"
                            control={control}
                            render={({ field }) => <InputNumber id="price"
                                defaultValue={0} {...field} />} />
                    </Form.Item>
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}

                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Space>

        </>
    );
}

EditProductPage.layout = WithDefaultLayout;
export default EditProductPage;