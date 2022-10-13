import React from "react";

export interface DisplayTableProps {
  data: { label: string; value: string }[];
}
export const DisplayTable: React.FC<DisplayTableProps> = ({ data }) => {
    return (
        <>
            {data.map(({ label, value }) => (
                <div style={{ display: "flex" }}>
                    <strong style={{ width: "10rem", textAlign: "right" }}>
                        {label}:
                    </strong>
                    <div style={{ flex: 1, marginLeft: "1rem" }}>{value}</div>
                </div>
            ))}
        </>
    );
};
