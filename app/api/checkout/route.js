import { createPaymentLink } from '@/api/checkout'

const locationId = 'LEMX422MEBE0T'

const checkoutOptions = {
    allowTipping: false,
    redirectUrl: 'http://localhost:3000/return',
    merchantSupportEmail: 'info@fctcvt.org',
    askForShippingAddress: false,
    acceptedPaymentMethods: {
        applePay: true,
        googlePay: true
    },
    enableCoupon: true,
    enableLoyalty: false
}

export async function POST(request) {
    const res = await request.json()
    const shows = res.lineItems

    const lineItems = []
    shows.forEach((show) => {
        lineItems.push({
            name: 'whatever',
            quantity: '1',
            itemType: 'ITEM',
            basePriceMoney: {
                amount: 500,
                currency: 'USD'
            }
        })
    })

    const paymentLinkResponse = await createPaymentLink(lineItems)

    return Response.json({"url": paymentLinkResponse.paymentLink.longUrl })
}