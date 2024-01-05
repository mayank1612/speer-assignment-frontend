import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../assets/constants";
import { strictFetch } from "../utils/strictFetch";
import DetailCard from "../components/DetailCard";
import { CircularProgress } from "@mui/material";

const Details = () => {
  const [callDetails, setCallDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();

  const handleRedirect = () => {
    navigate(`/`, { replace: false });
  };

  async function fetchCallDetails() {
    const queryData = await strictFetch(`${BASE_URL}/activities/${param.id}`);
    setCallDetails(queryData);
    setLoading(false);

    return queryData;
  }

  useEffect(() => {
    fetchCallDetails();
  }, []);

  return (
    <div id="details-wrapper">
      <div id="subHeader" className="flex  bg-white">
        <div
          onClick={handleRedirect}
          className="flex items-center py-2 px-5 border-solid rounded-br-full w-2/5 h-[48px] shadow-lg font-bold text-gray-600 cursor-pointer"
        >
          <ArrowBackIosIcon sx={{ width: "20px" }} />
          <div className="mb-[1px]"> Details </div>
        </div>
      </div>
      {loading ? (
        <div className="flex h-36 bg-gray-100 justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <DetailCard callDetails={callDetails} />
      )}
    </div>
  );
};

export default Details;
