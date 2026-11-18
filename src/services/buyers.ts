import pb from '@/lib/pocketbase/client'

export interface Buyer {
  id?: string
  name: string
  email: string
  purchase_date?: string
  amount?: number
  currency?: string
  created?: string
  updated?: string
}

export const buyersService = {
  async createBuyer(data: {
    name: string
    email: string
    amount?: number
    currency?: string
  }): Promise<Buyer> {
    const record = await pb.collection('buyers').create<Buyer>({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      purchase_date: new Date().toISOString(),
      amount: data.amount ?? 6.9,
      currency: data.currency ?? 'USD',
    })
    return record
  },

  async listRecentBuyers(limit = 10): Promise<Buyer[]> {
    return await pb
      .collection('buyers')
      .getList<Buyer>(1, limit, {
        sort: '-created',
      })
      .then((res) => res.items)
  },
}
