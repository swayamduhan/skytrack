'use client'

import { Provider } from "jotai"

export function JotaiProvider({ children } : { children : any}){
    return (
        <Provider>
            {children}
        </Provider>
    )
}