import { get, set } from '@/api/session/store';

export async function GET(request, { params }) {
    let cart = await get('cart')
    if (!cart) {
        cart = await set('cart', [])
    }
  return Response.json(cart)
}


export async function POST(request, response) {
  let cart = await get('cart')
  const payload = await request.json()
  if (payload?.id) {
    cart.push(payload.id)
    await set('cart', cart)
  }

return Response.json(cart)
}