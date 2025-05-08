'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import H5AudioPlayer from 'react-h5-audio-player';

export default function BeatForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [audioPreview, setAudioPreview] = useState<string | null>(null);
    const [audioError, setAudioError] = useState('');

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

    const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        // ✅ Validering
        if (!file.type.startsWith('audio/')) {
          setAudioError('Only audiofiles allowed.');
          return;
        }

        if (file.size > 25 * 1024 * 1024){
            setAudioError('Max 25mb allowed, use mp3 files.');
            return;
        }
      
        setAudioFile(file);
        setAudioPreview(URL.createObjectURL(file));
        setAudioError('');
      };
      
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl); 
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col bg-black p-8 rounded-xl shadow-lg w-200 text-white items-center">

            <h1 className='mb-10 text-white text-3xl font-jacq'>Beat Upload</h1>
            <div className='flex flex-row w-full justify-evenly mb-10'>
                <input
                className='hidden'
                id='imageFile'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
                <label htmlFor='imageFile' className='w-60 h-60 border-dashed border-gray-400 border-3 rounded-xl flex flex-col items-center justify-center hover:border-primary hover:text-primary cursor-pointer'>
                    {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                    'Upload Cover'
                    )}
                </label>
            
                <input
                    className='hidden'
                    id='audioFile'
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                />
                <label htmlFor='audioFile' className='w-60 h-60 border-dashed border-gray-400 border-3 rounded-xl flex flex-col items-center justify-center hover:border-primary hover:text-primary cursor-pointer'>
                    {audioFile ? (
                        <>
                            <p className='mb-4'>{audioFile.name}</p>
                            <H5AudioPlayer
                            src={audioPreview || undefined}
                            showJumpControls={false}
                            customVolumeControls={[]}
                            customAdditionalControls={[]}
                            className="custom-player"
                            />
                        </>
                        ) : ('Upload Audio')}
                        {audioError && <p className="text-red-500 text-sm mt-2">{audioError}</p>}
                </label>
            </div>

            


            <input
                className='bg-white text-black rounded my-1'
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        
            <input
                className='bg-white text-black rounded my-1'
                type="number"
                placeholder="Price (SEK)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <button type="submit" disabled={loading} className='bg-green-500 w-20 h-8 rounded cursor-pointer mt-5'>
                {loading ? 'Loading...' : 'Save'}
            </button>
        
            {message && <p>{message}</p>}
        </form>
      )
}