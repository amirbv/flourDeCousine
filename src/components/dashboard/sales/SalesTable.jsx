import React, { useCallback, useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Card, CardContent, Typography } from '@material-ui/core';


import { getSalesList } from '../../../utils/request';

export default function SalesTable({ user }) {
  const [sales, setSales] = useState([]);

  const getSales = useCallback(async () => {
    try {
      const { data } = await getSalesList(user.token);
      console.log(data);
      if (data) {
        setSales(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getSales();
  }, [getSales]);


  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Todas las ventas</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Correo del cliente</TableCell>
              <TableCell>Nombre del cliente</TableCell>
              <TableCell>Id de transacción</TableCell>
              <TableCell>Fecha de transacción</TableCell>
              <TableCell>Costo</TableCell>
            </TableRow>
          </TableHead>
          {
            sales.length > 0 && (
              <TableBody>
                {
                  sales.map((sale, index) => (
                    <TableRow key={sale._id}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>{sale.books?.title || 'not available or deleted'}</TableCell>
                      <TableCell>{sale.users.email}</TableCell>
                      <TableCell>{sale.users.name} {sale.users.lastname}</TableCell>
                      <TableCell>#######</TableCell>
                      <TableCell>{sale.created_at}</TableCell>
                      <TableCell>{sale.price}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }
        </Table>
        {
          sales.length === 0 && <Typography align="center" style={{marginTop: '20px'}}>No se han podido cargar las ventas</Typography>
        }
      </CardContent>
    </Card>
  )
}
