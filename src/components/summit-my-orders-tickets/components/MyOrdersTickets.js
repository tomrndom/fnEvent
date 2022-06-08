import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import classNames from 'classnames';
import { AjaxLoader } from "openstack-uicore-foundation/lib/components";
import { getUserOrders } from '../store/actions/order-actions';
import { getUserTickets } from '../store/actions/ticket-actions';
import { OrderList } from './OrderList/OrderList';
import { OrderListContextProvider } from './OrderList/OrderList.helpers';
import { TicketList } from './TicketList/TicketList';


export const MyOrdersTickets = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        orderState,
        ticketState,
        summitState
    } = useSelector(state => state || {});

    useEffect(() => {
        dispatch(getUserOrders(null, orderState.current_page, orderState.per_page));
        dispatch(getUserTickets(null, ticketState.current_page, ticketState.per_page));
    }, []);

    const isLoading = orderState.loading || ticketState.loading || summitState.loading;
    const hasOrders = orderState.memberOrders?.length > 0;
    const hasTickets = ticketState.memberTickets?.length > 0;

    return (
        <>
            <AjaxLoader show={isLoading} size={120} />

            {!isLoading && (!hasOrders && !hasTickets) && (
                <div className="orders-tickets-empty">
                    {t('orders-tickets.empty')}
                </div>
            )}

            <div className={classNames('my-orders-tickets', className)}>
                {hasOrders && (
                    <OrderListContextProvider>
                        <OrderList />
                    </OrderListContextProvider>
                )}

                {(hasOrders && hasTickets) && (
                    <hr className="orders-tickets-divider" />
                )}

                {hasTickets && (
                    <TicketList />
                )}
            </div>
        </>
    );
};