'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BeatForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try{
            let imageUrl = null;
            let audioUrl = null;

            if(imageFile) {
                const { data, error } = await supabase.storage
                    .from('beat-images')
                    .upload(`images/${Date.now()}-${imageFile.name}`,imageFile)

                if (error) throw error
                imageUrl = supabase.storage.from('beat-images').getPublicUrl(data.path).data.publicUrl;
            }

            if(audioFile) {
                const { data, error } = await supabase.storage
                    .from('beat-audio')
                    .upload(`audios/${Date.now()}-${audioFile.name}`, audioFile)

                    if (error) throw error;
                    audioUrl = supabase.storage.from('beat-audio').getPublicUrl(data.path).data.publicUrl;
            }

            const { error: insertError} = await supabase.from('beat_items').insert({
                title,
                price: parseFloat(price),
                image_url: imageUrl,
                audio_url: audioUrl,
            })

            if (insertError) throw insertError

            setMessage('Beat saved successfully.')
            setTitle('')
            setPrice('')
            setImageFile(null)
            setAudioFile(null)
        }
        catch(err: any){
            console.error(err);
            setMessage('Something went wrong.');
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
    
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
    
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
    
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
          />
    
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Save'}
          </button>
    
          {message && <p>{message}</p>}
        </form>
      )
}