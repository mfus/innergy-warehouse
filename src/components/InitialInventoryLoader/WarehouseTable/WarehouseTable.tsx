import React from 'react';
import { Warehouse } from '../warehouse';
import "./styles.scss";

const WarehouseTable: React.FC<{ warehouse: Warehouse }> = ({ warehouse }) => {
    const rows = warehouse.materials.map(p =>
        <tr key={p.id}>
            <td>{p.id}:</td>
            <td>{p.count}</td>
        </tr>
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>{warehouse.name}</th>
                    <th>(total {warehouse.totalCount})</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default WarehouseTable;