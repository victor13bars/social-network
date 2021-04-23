import React, {ComponentType, Suspense} from "react";

export const withSuspense = (Component: ComponentType) => {
    return (props: any) => {
        return <Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props}/>
        </Suspense>
    }
};