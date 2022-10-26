import Map from "../Map";

export default function Modal({ onClose, visible, comic }: any) {
    
    if (!visible) return null;

    return ( <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded">
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {comic.title}
                    </h3>
                    <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                        <span className="sr-only">Fechar</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {comic.description}
                    </p>
                    {<Map 
                        center={{
                            lat: -3.745, 
                            lng: -38.523}}

                        containerStyle={{
                            width: "100%",
                            height: "250px"
                        }}

                        options={{
                            disableDefaultUI: true
                        }}
                    />}
                    
                </div> 
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <a href="https://www.google.com/maps/place/Iguatemi+Bosque/@-3.7561223,-38.4944411,16z/data=!4m5!3m4!1s0x7c74963201865ff:0x2d77cda38272811f!8m2!3d-3.7560474!4d-38.4893449" target="noreferrer" className="pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar</a>
                </div>               
            </div>
        </div>
        </>)
}