import { supabase } from "@/common/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { category_id } = req.query;

        let query = supabase.from('products').select('*');

        if (category_id) {
            query = query.eq('category_id', category_id);
        }

        const { data, error } = await query;

        return res.status(error ? 400 : 200).json(error ? error.message : { data: data });
    }

    if (req.method === 'POST') {
        const { name, price, category_id } = req.body;
        const { data, error } = await supabase.from('products').insert([{ name, price, category_id }]);
        return res.status(error ? 400 : 201).json(error ? error.message : { data: data });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
