import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Col, Grid, Loading, Row, Table, Tooltip } from '@nextui-org/react';
import db from 'database/db';
import Order from 'models/order';
import User from 'models/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { moneyFormat, toJson } from 'utils/functions';
import AdminLeftPanelMenu from '../component/admin.left.panel.menu';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrderHistory = ({ orderList }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      router.push('/', undefined, { shallow: 'true' });
    }
    console.log('HERE ', orderList);
  }, []);

  return (
    <Grid.Container gap={1}>
      <Grid lg={3} md={3} xl={3} sm={3} xs={12}>
        <AdminLeftPanelMenu />
      </Grid>
      <Grid xl={9} lg={9} md={9} xs={12} sm={9}>
        {isLoading ? (
          <Grid.Container
            fluid="true"
            responsive="true"
            justify="center"
            css={{
              paddingTop: '2vh',
              '@xs': {
                paddingTop: '35vh',
              },
            }}
          >
            <Grid>
              <Loading type="default" size="xl" color={'error'} />
            </Grid>
          </Grid.Container>
        ) : (
          <Grid.Container
            fluid="true"
            responsive="true"
            justify="center"
            css={{
              paddingTop: '2vh',
              '@xs': {
                paddingTop: '1vh',
              },
            }}
          >
            <Table
              striped
              hoverable
              sticked
              bordered
              shadow={true}
              color={'success'}
              aria-label="Example pagination  table"
              containerCss={{
                width: '100%',
                color: '$accents9',
                backgroundColor: '$backgroundAlpha',
                border: '1px solid Red',
                '.nextui-c-bUbfzy': {
                  color: '$accents9',
                },
              }}
            >
              <Table.Header>
                <Table.Column align="center">CUSTOMER</Table.Column>
                <Table.Column align="center">EMAIL</Table.Column>
                <Table.Column align="center">ORDER TOTAL</Table.Column>
                <Table.Column align="center">STATUS</Table.Column>
                <Table.Column align="center">ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                {orderList.map((order) => (
                  <Table.Row key={order}>
                    <Table.Cell>{order.user.name}</Table.Cell>
                    <Table.Cell>{order.user.email}</Table.Cell>
                    <Table.Cell>{moneyFormat(order.totalPrice)}</Table.Cell>
                    <Table.Cell>
                      {!order.isDelivered && !order.isPaid
                        ? 'Pending'
                        : 'Delivered'}
                    </Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: 'flex' }}>
                          <Tooltip
                            content="Details"
                            rounded
                            color={'error'}
                            trigger="hover"
                          >
                            <IconButton
                              onClick={() => console.log('View user')}
                            >
                              <VisibilityIcon style={{ color: 'orange' }} />
                            </IconButton>
                          </Tooltip>
                        </Col>
                        <Col css={{ d: 'flex' }}>
                          <Tooltip
                            content="Edit user"
                            rounded
                            color={'warning'}
                          >
                            <IconButton
                              onClick={() => console.log('Edit user')}
                            >
                              <Edit style={{ color: 'blue' }} />
                            </IconButton>
                          </Tooltip>
                        </Col>
                        <Col css={{ d: 'flex' }}>
                          <Tooltip
                            content="Delete user"
                            color="error"
                            onClick={() => console.log('Delete user')}
                          >
                            <IconButton>
                              <Delete
                                size={20}
                                fill="#FF0080"
                                style={{ color: 'red' }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Pagination
                animated
                containerCss={{ color: 'black' }}
                css={{
                  color: 'Black',
                  '.nextui-c-cUthvm-gZRAkC-disabled-true': { color: 'black' },
                  '.nextui-c-cUthvm': {
                    backgroundColor: '$accents6',
                  },
                  '.nextui-c-fItrmj': { color: 'white' },
                }}
                color={'error'}
                noMargin
                size={'xl'}
                align="center"
                page={orderList.length}
                rowsPerPage={orderList.length > 10 ? orderList.length / 5 : 1}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Grid.Container>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default OrderHistory;

export const getServerSideProps = async () => {
  await db.connect();
  try {
    const orderList = await Order.find({})
      .populate({ path: 'orderItems', populate: 'product' })
      .populate({ path: 'user', model: User })
      .lean();
    await db.disconnect();
    return { props: { orderList: toJson(orderList) } };
  } catch (error) {
    await db.disconnect();
    return { props: { orderList: [] } };
  }
};
