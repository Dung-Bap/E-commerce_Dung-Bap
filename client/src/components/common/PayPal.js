import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { apiCreateOrder } from '../../apis';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';

// This value is from the props in the UI
const style = { layout: 'vertical' };

const ButtonWrapper = ({ showSpinner, currency, amount, payload, setIsSuccess }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    const createOrderById = async () => {
        const response = await apiCreateOrder({ ...payload, status: 'Succeeded' });
        setIsSuccess(true);
        if (response.success) {
            Swal.fire({
                title: 'Congratulation',
                text: 'Payment success, We will deliver your order within 2 hours, Thank you very much !!!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Oki',
            }).then(result => {
                if (result.isConfirmed) {
                    navigate(`/${path.HOME}`);
                }
            });
        } else Swal.fire('Opps!', response.message, 'error');
    };

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
                        })
                        .then(orderId => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async response => {
                        if (response.status === 'COMPLETED') {
                            createOrderById();
                        }
                    })
                }
            />
        </>
    );
};

export default function PayPal({ amount, payload, setIsSuccess }) {
    return (
        <div style={{ maxWidth: '600px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper
                    payload={payload}
                    currency={'USD'}
                    showSpinner={true}
                    amount={amount}
                    setIsSuccess={setIsSuccess}
                />
            </PayPalScriptProvider>
        </div>
    );
}
