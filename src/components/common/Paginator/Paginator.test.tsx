import React from 'react';
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

const callback = () => {
    console.log("111111111")
}

describe("Paginator Component tests", () => {
    test("pages count is 11 but be showed only 10", () => {
        const component = create(<Paginator pageSize={1} totalItemsCount={11} currentPage={1} portionSize={10}
                                            onPageChanged={callback}/>)
        const root = component.root;
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(10)
    })

    test("if pages count is more then 10 button Next should be present", () => {
        const component = create(<Paginator pageSize={1} totalItemsCount={11} currentPage={1} portionSize={10}
                                            onPageChanged={callback}/>)
        const root = component.root;
        let button = root.findAllByType("button")
        expect(button.length).toBe(1)
    })
})
