
import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

const ProjectsTable = ({ projects, onStatusChange }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Project Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <div>
            <p className="font-semibold">{row.original.name}</p>
            <p className="text-gray-500">
              {new Date(row.original.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              to{' '}
              {new Date(row.original.endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        ),
      },
      {
        Header: 'Reason',
        accessor: 'reason',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Division',
        accessor: 'division',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <span className="font-semibold">{row.original.status}</span>
        ),
      },
      {
        Header: '',
        id: 'actions',
        Cell: ({ row }) => (
          <div className="flex gap-4 ml-3 justify-around">
            <button
              className="px-5 text-white text-sm bg-blue-600 rounded-3xl py-1"
              onClick={() => onStatusChange(row.original._id, 'Running')}
            >
              Start
            </button>
            <button
              className="px-5 text-blue-500 text-sm rounded-3xl bg-white border border-blue-500"
              onClick={() => onStatusChange(row.original._id, 'Closed')}
            >
              Close
            </button>
            <button
              className="px-4 py-1 rounded-3xl text-blue-500 text-sm bg-white border border-blue-500"
              onClick={() => onStatusChange(row.original._id, 'Cancelled')}
            >
              Cancel
            </button>
          </div>
        ),
      },
    ],
    [onStatusChange]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: projects,
      initialState: { pageIndex: 0, pageSize: 7 },
    },
    usePagination
  );

  return (
    <div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-blue-100">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-[21px] py-[8px] text-left text-[13px] text-md text-gray-800 tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.original.project_id}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-[22px] py-[8px] whitespace-nowrap text-[15px] text-gray-900"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination mx-auto w-fit my-5">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<<  <'}
        </button>{' '}
        {pageOptions.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => gotoPage(pageNum)}
            className={`px-2 py-[2px] rounded-full ${
              pageNum === pageIndex ? 'bg-cyan-300 ' : ''
            }`}
          >
            {pageNum + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'> >>'}
        </button>{' '}
      </div>
    </div>
  );
};

export default ProjectsTable;
