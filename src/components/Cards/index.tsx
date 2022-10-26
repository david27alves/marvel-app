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
        <div className="bg-gray-100">               
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-24">
                    <h2 className="text-2xl font-bold text-gray-900">Retorne mais tarde...</h2>
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
                        <button onClick={getMoreData} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Mais quadrinhos...</button>
                    </div>
                    </div>
                    
                </div>
                <Modal onClose={onClose} visible={openModal} comic={cmc}></Modal>
            
                
            </div>
            
        </>
    )

}