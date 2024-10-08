import { supabase } from "@/common/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('orders')
            .select('*, products(id, name, price)')
            .order('id', { ascending: false });

        return res.status(error ? 400 : 200).json(error ? error.message : { data: data });
    }

    if (req.method === 'POST') {
        const { product_id, quantity } = req.body;
        const { data, error } = await supabase.from('orders').insert([{ product_id, quantity }]);
        return res.status(error ? 400 : 201).json(error ? error.message : data);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}