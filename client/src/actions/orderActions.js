import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from '../slices/orderSlice';
import axios from 'axios';

export const createOrder = order => async (dispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/order/new`, order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest())
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async (dispatch) => {
    try {
        dispatch(adminOrdersRequest())
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/orders`)
        dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest())
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/admin/order/${id}`)
        dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}

export const cancelOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URL}/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}