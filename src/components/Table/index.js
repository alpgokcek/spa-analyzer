import React, {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Input } from 'reactstrap';
import './table.scss';

const ResponsiveTable = ({ columns, data, page, onTableChange, totalSize, sizePerPage }) => {
  
  return (
  <div>
    <div>
      <div>
        <p>Toplam <b>{totalSize}</b> kayıt bulundu.</p>
      </div>
      <BootstrapTable
        remote
        striped
        hover
        keyField="id"
        data={ data }
        columns={ columns }
        onTableChange={ onTableChange }
        bordered={ false }
        headerClasses="bs-table__header-border"
      />
    </div>
  </div>
  )
}
ResponsiveTable.defaultProps = {
  sizePerPage: 10
}
export default ResponsiveTable;