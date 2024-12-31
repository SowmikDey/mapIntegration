import '../index.css'
import { Link } from 'react-router-dom';

const Modal = ({handleManualSearch,handleEnableLocation}) => {
 

  return (<div className="absolute h-full w-full bg-[#a2aab9]">
    <div className="flex flex-col relative mt-[80%] min-[460px]:mt-[10%] md:mt-[20%] lg:mx-[350px] lg:rounded-md lg:p-12 lg:mt-[13%] bg-white py-12 px-2">
      <h2 className="font-bold text-center">Location Permission is off</h2>
      <p className="text-slate-500 font-sm text-center">
        We need your location to find the nearest store & provide you a seamless delivery experience
      </p>
      <Link
      to="/Map"
        className="text-center bg-red-600 rounded-md p-2 mt-2 font-bold text-slate-100 mx-2 cursor-pointer"
        onClick={handleEnableLocation}
      >
        Enable Location
      </Link>
      <Link to="/ManualLocation"
        className="text-red-600 font-semibold border-[1px] border-black mt-4 text-center mx-2 rounded-md p-1 cursor-pointer"
        onClick={handleManualSearch}
      >
        🔍Search your location Manually
      </Link>
    </div>
  </div>
  )
};
    


export default Modal;
