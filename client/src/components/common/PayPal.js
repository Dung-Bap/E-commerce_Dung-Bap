import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

// This value is from the props in the UI
const style = { layout: 'vertical' };

const ButtonWrapper = ({ showSpinner, currency, amount }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

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
                onApprove={(data, actions) => actions.order.capture().then(async response => console.log(response))}
            />
        </>
    );
};

export default function PayPal({ amount }) {
    return (
        <div style={{ maxWidth: '600px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper currency={'USD'} showSpinner={false} amount={amount} />
            </PayPalScriptProvider>
        </div>
    );
}
