import { useState, useEffect, useCallback } from 'react'

import api from '../../services/api';
import Modal from '../Modal';

interface Comics {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        extension: string,
        path: string
    };
    
}

export default function Cards() {

    const [comics, setComics] = useState<Comics[]>([]);

    const [cmc, setCmc] = useState({});

    const [openModal, setOpenModal] = useState(false);

    const onClose = () => {
        setOpenModal(false);
    }

    const getData = () => {
        
         api.get('/comics')
        .then((response) => {
            setComics(response.data.data.results);
        })
        .catch(err => console.log(err));
        
    }

    useEffect(() => {
        
        getData();

    }, []);
    
    const getMoreData = useCallback(async() => {

        const offset = comics.length;
        const response = await api.get('/comics', {
            params: {
                offset
            }
        });

        setComics([...comics, ...response.data.data.results])

    }, [comics]);

    if (comics.length === 0) return (
        <div className="bg-gray-100 h-[calc(100vh-168px)] overflow-auto">               
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-24">
                    <svg aria-hidden="true" role="status" className="inline mr-2 w-32 h-32 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#EF4444"/>
                    </svg>
                </div>
            </div>
        </div>
    )

    return (
        <>    
            <div className="bg-gray-100">               
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-24">
                        <h2 className="text-2xl font-bold text-gray-900">Comics Marvel</h2>
                        <div className="mt-6 space-y-12 md:grid md:grid-cols-3 md:space-y-0 md:space-x-4 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:space-y-0">
                            {comics.map((comic, index) => (
                            <div key={index} 
                                 className="group relative" 
                                 onClick={() => {
                                    setOpenModal(true);
                                    setCmc(comic);
                                 }
                            }>
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                {(() => {
                                if (comic.thumbnail.path.substring(44, 63) === "image_not_available") {
                                    return (
                                    <img
                                        src={comic.thumbnail.path+"."+comic.thumbnail.extension}
                                        className="h-full w-full object-cover object-left"
                                        alt=""
                                    />
                                    )
                                } else {
                                    return (
                                    <img
                                        src={comic.thumbnail.path+"."+comic.thumbnail.extension}
                                        className="h-full w-full object-cover object-center"
                                        alt=""
                                    />
                                    )
                                }
                                })()}
                                
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mb-10">
                                <button onClick={(e) => e.preventDefault()}>
                                    <span className="absolute inset-0" />
                                    {comic.title}                    
                                </button>
                                </h3>
                            </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button onClick={getMoreData} type="button" className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Mais quadrinhos...</button>  
                        </div>
                    </div>   
                </div>
                <Modal onClose={onClose} visible={openModal} comic={cmc}></Modal>
            </div>
        </>
    )
}