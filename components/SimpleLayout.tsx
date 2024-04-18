import { ReactElement } from "react"

const SimpleLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

    return <div style={{backgroundColor: 'green'}}>
        {children}
    </div>
}

export const WithSimpleLayout = (page: ReactElement) => <SimpleLayout>{page}</SimpleLayout>;