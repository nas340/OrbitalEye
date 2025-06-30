import { BarLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, RingLoader, RotateLoader } from "react-spinners";

const Loading = () => {
  return ( <div>
    <FadeLoader 
      color="#ffffff"
      loading
    />
  </div> );
}
 
export default Loading;