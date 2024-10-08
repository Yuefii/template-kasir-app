import { supabase } from "@/common/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase.from('categories').select('*');
        return res.status(error ? 400 : 200).json(error ? error.message : { data: data });
    }

    if (req.method === 'POST') {
        const { name } = req.body;
        const { data, error } = await supabase.from('categories').insert([{ name }]);
        return res.status(error ? 400 : 201).json(error ? error.message : { data: data });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}