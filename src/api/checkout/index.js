import client from '@/api/clients/square'

const locationId = 'LEMX422MEBE0T'

const checkoutOptions = {
    redirectUrl: 'http://localhost:3000/return',
    merchantSupportEmail: 'info@fctcvt.org',
    acceptedPaymentMethods: {
        applePay: true,
        googlePay: true
    },
    enableCoupon: true
}

/**
 * 
 * @param {import('square').OrderLineItem[]} items 
 */
const createPaymentLink = async (items) => {

    try {
        const response = await client.checkoutApi.createPaymentLink({
            order: {
                locationId: locationId,
                lineItems: items,
                state: 'DRAFT'
            },
            checkoutOptions: checkoutOptions
        });

        console.log(response.result);
        return response.result;
    } catch (error) {
        console.log(error);
    }
    
}

export { createPaymentLink }