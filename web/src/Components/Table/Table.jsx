import { Table as BsTable } from 'react-bootstrap';


export default function Table({ tHeads, data }) {
    return (
        data.length === 0 ?
        null:
        <BsTable striped bordered hover>
            <thead>
                <tr>
                    {
                        tHeads.map((head, index) => (
                            <th key={ index }>{ head }</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(student => (
                        <tr key={ student.id }>
                            <td>{ student.id }</td>
                            <td>{ student.name }</td>
                        </tr>
                    ))
                }
            </tbody>
        </BsTable>
    );
}