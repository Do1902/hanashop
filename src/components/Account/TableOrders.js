import React from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
function Table({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Mã Hóa Đơn",
        accessor: "id",
        Cell: ({ value }) => <Link to={`/vieworder/${value}`}>{value}</Link>,
        disableSortBy: true,
      },
      {
        Header: "Người Nhận",
        accessor: "name",
        disableSortBy: true,
      },
      {
        Header: "Số Điện Thoại",
        accessor: "sdt",
        disableSortBy: true,
      },
      {
        Header: "Địa Chỉ",
        accessor: "address",
        disableSortBy: true,
      },
      {
        Header: "Tổng Tiền",
        accessor: "total",
        Cell: ({ value }) => priveVND(value),
        sortDescFirst: true,
        sortType: (rowA, rowB, columnId, desc) => {
          const a = rowA.values[columnId];
          const b = rowB.values[columnId];
          if (a === b) {
            return 0;
          }
          return a > b ? 1 : -1;
        },
        sortHeader: ({ column }) => (
          <div>
            <span>{column.render("Header")}</span>
            {column.isSorted ? (
              column.isSortedDesc ? (
                <span>desc</span>
              ) : (
                <span>asc</span>
              )
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        Header: "Thời Gian",
        accessor: "time",
        disableSortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  return (
    <div className="table-responsive">
      <table
        {...getTableProps()}
        className="table table-hover text-center table-bordered"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >
                  {column.render("Header")}&nbsp;
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className="fa-solid fa-sort-down fa-bounce"></i>
                    ) : (
                      <i className="fa-solid fa-sort-up fa-bounce"></i>
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
