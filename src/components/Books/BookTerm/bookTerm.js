import React from 'react';
import {Link} from 'react-router-dom';

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name + " " + props.term.author.surname}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"} style={{marginRight: '5px'}}
                    onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <a title={"Mark"} className={"btn btn-secondary"} style={{marginRight: '5px'}}
                    onClick={() => props.onMark(props.term.id)}>
                    Mark
                </a>
                <Link className={"btn btn-info ml-2"} style={{marginRight: '5px'}}
                    onClick={() => props.onEdit(props.term.id)}
                    to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}

export default bookTerm;