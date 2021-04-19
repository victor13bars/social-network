import React from 'react';
import styles from "./Paginator.module.css"

type PaginatorPropsType = {
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

let Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? styles.selectedPage : ""}
                         onClick={(event) => {
                             props.onPageChanged(p)
                         }}>{p}</span>
        })}
    </div>
}
export default Paginator;