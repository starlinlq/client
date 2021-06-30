import { observer } from "mobx-react-lite";
import Loader from "react-loader-spinner";

function Loading() {
  return (
    <div className="loader">
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={100000} //3 secs
      />
    </div>
  );
}

export default observer(Loading);
