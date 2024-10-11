import { supabase } from '@/common/libs/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { items, total } = req.body
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ items, total }])

    return res.status(error ? 400 : 201).json(error ? error.message : data)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
