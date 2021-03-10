import React from 'react'
import { useTable,useSortBy,  useFilters, useGlobalFilter,useAsyncDebounce,useGroupBy, useExpanded,useRowSelect  } from 'react-table'
import {matchSorter} from 'match-sorter'
import { useSelector } from "react-redux";


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  


function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

//////////////////
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest}/>
      </>
    )
  }
)




function Table({ columns, data ,onselect,onselectall}) {
    
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds },
  } = useTable({
    columns,
    data,
  },
  useFilters, // useFilters!
  useGlobalFilter, // useGlobalFilter!  
  useGroupBy,
  // useGroupBy would be pretty useless without useExpanded ;)  
  useSortBy,
  useExpanded,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      // Let's make a column for selection
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ])
  }  
  )



  React.useEffect(() => {
      onselect(
        data.filter(
        (x,i)=> selectedRowIds[i]
      ),
      selectedRowIds
      )
  },[onselect,selectedRowIds,data]) // <-- here put the parameter to listen

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '🛑 ' : '👊 '}
                    </span>
                  ) : null}                
                
                {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>              
              </th>
            ))}
          </tr>
          
        ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>        
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} >
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                  </td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function LocationTable(props) {
  const { entities } = useSelector((state) => state.locations);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Locations',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Address',
            accessor: 'address',
          },
          {
            Header: 'Category',
            accessor: 'category',
          //   Cell: ({ row: { original } }) => (
          //     <span
          //     style={{
          //      whiteSpace: 'pre-wrap',
          //     }}
          //  >
          //    {original.category.join(", ")}
          //  </span>
          // ),            
          },          
        ],
      },
    ],
    []
  )


  return (
    <Table columns={columns} data={entities} onselect={props.onselect} onselectall={props.onselect}/>
  )
}

export default LocationTable


