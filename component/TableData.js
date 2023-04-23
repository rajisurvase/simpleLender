import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Moment from 'react-moment';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

function createData(borrowerName, lenderName, principalAmount, roi, status, interestAmount, totalAmount, duePaymentDate,purchaseDate) {
  return { borrowerName, lenderName, principalAmount, roi, status, interestAmount, totalAmount, duePaymentDate, purchaseDate };
}


export default function TableData({list}) {

    React.useEffect(()=>{
        list.map(item=>{
            return  createData(item?.borrowerName, item?.lenderName, item?.principalAmount, item?.roi,item?.status, item?.interestAmount,item?.totalAmount, item?.duePaymentDate, item?.purchaseDate )
        })
    },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Borrower Name </TableCell>
            <TableCell align="right">Lender Name</TableCell>
            <TableCell align="right">Principal Amount</TableCell>
            <TableCell align="right">ROI (%)</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Interest Amount</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell align="right">Due Payment Date</TableCell>
            <TableCell align="right">Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.borrowerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.borrowerName}
              </TableCell>
              <TableCell align="right">{row.lenderName}</TableCell>
              <TableCell align="right">{row.principalAmount}</TableCell>
              <TableCell align="right">{row.roi}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.interestAmount}</TableCell>
              <TableCell align="right">{row.totalAmount}</TableCell>
              <TableCell align="right"> <Moment format="YYYY/MM/DD">{row.duePaymentDate}</Moment> </TableCell>
              <TableCell align="right"> <Moment format="YYYY/MM/DD">{row.purchaseDate}</Moment> </TableCell>
              <TableCell align="right"> <IconButton><EditIcon /></IconButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}