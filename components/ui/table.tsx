import type { ReactNode } from "react";

export type Column = {
    id: string;
    header: string;
    mono?: boolean;
    sortable?: boolean;
    href?: string;
};

export function Table({ columns, rows }: { columns: Column[]; rows: Array<Record<string, ReactNode> & { id: string }> }) {
    return (
        <div className="table-wrap">
            <table className="data">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id}>
                                {column.sortable && column.href ? (
                                    <a className="sort" href={column.href}>{column.header}</a>
                                ) : column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td key={column.id} className={column.mono ? "mono" : undefined}>
                                    {row[column.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
