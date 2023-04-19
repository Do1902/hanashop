import React from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
function TableProducts({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        accessor: (row, index) => index + 1,
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
        Header: "Ảnh Sản Phẩm",
        accessor: "image",
        Cell: ({ value }) => (
          <img src={value} alt="" className="imageProduct" />
        ),
        disableSortBy: true,
      },
      {
        Header: "Tên Sản Phẩm",
        accessor: "name",
        Cell: ({ value, row }) => (
          <Link to={`/productdetail/${row.original.id}`}>{value}</Link>
        ),
        disableSortBy: true,
      },
      {
        Header: "Đơn Giá",
        accessor: "price",
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
        Header: "Số Lượng",
        accessor: "quantity",
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
        Header: "Tổng",
        accessor: "total",
        Cell: ({ row }) => priveVND(row.original.price * row.original.quantity),
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
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);
  const total = data.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  return (
    <div className="table-responsive table-detailorder">
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
        <tfoot className="table-borderless">
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()} className={column.id === "total" ? "fw-bold" : ""}>
                  {column.id === "total" ? priveVND(total) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default TableProducts;
